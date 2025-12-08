"use server";

import { prisma } from "@/server/db";
import type { InviteUserType } from "./invitation-validation";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { EmailTemplate } from "@/lib/emailTemplates/invite-template";
import bcrypt from "bcryptjs";

const APP_URL = process.env.APP_URL || "http://localhost:3000";

function generateInviteToken() {
  return crypto.randomUUID();
}

export async function getInvitationList(workspaceId: string) {
  if (!workspaceId) return [];

  const invitations = await prisma.invitation.findMany({
    where: { workspaceId },
    orderBy: { createdAt: "desc" }, // optional, but usually nice
  });

  return invitations;
}

export async function createInvitation(args: { invitedBy: string; data: InviteUserType }) {
  const { invitedBy, data } = args;

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("A user with this email already exists");
  }

  const existingInvite = await prisma.invitation.findFirst({
    where: {
      email: data.email,
      workspaceId: data.workspaceId,
      status: "pending",
    },
  });

  if (existingInvite) {
    throw new Error("An active invitation already exists for this email");
  }

  const token = generateInviteToken();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.invitation.create({
    data: {
      name: data.name,
      email: data.email,
      role: data.role,
      token,
      status: "pending",
      expiresAt,
      workspaceId: data.workspaceId,
      invitedBy,
    },
  });

  const resend = new Resend(process.env.RESEND_API_KEY);
  const acceptUrl = `${APP_URL}/users/accept-invite?token=${token}`;
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [data.email],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "John", url: acceptUrl }),
    });
  } catch (err: any) {
    console.log("Mail sent failed!!", err);
    throw new Error("Failed to send mail!");
  }
  revalidatePath("/users/invite", "page");

  return {
    success: true,
  };
}

export async function deleteInvitationService(id: string) {
  const exisitingInvite = await prisma.invitation.delete({
    where: { id: id },
  });

  if (!exisitingInvite) {
    throw new Error("Invitation not found");
  }

  revalidatePath("/users/invite", "page");
  return {
    success: true,
  };
}

export async function acceptInvitation({ token, password }: { token: string; password: string }) {
  const invitation = await prisma.invitation.findUnique({
    where: { token },
  });

  if (!invitation) {
    return { success: false, message: "Invalid or expired invite." };
  }

  if (invitation.status !== "PENDING") {
    return { success: false, message: "This invitation has already been used." };
  }

  if (!invitation.expiresAt || invitation.expiresAt < new Date()) {
    await prisma.invitation.update({
      where: { id: invitation.id },
      data: { status: "EXPIRED" },
    });
    return { success: false, message: "This invitation has expired." };
  }

  // hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // OPTIONAL: wrap in transaction if you want strict atomicity
  await prisma.user.create({
    data: {
      name: invitation.name,
      email: invitation.email,
      passwordHash,
      // if you have a workspaceUser relation, also create that here
    },
  });

  await prisma.invitation.update({
    where: { id: invitation.id },
    data: {
      status: "ACCEPTED",
    },
  });

  // you can either return and let client redirect, or redirect here
  return { success: true };
}
