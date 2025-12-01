"use server";

import { prisma } from "@/server/db";
import type { InviteUserType } from "./invitation-validation";
import { revalidatePath } from "next/cache";

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

  revalidatePath("/users/invite", "page");

  return {
    success: true,
  };
}
