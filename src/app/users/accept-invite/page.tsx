// src/app/users/accept-invite/page.tsx
import { prisma } from "@/server/db";
import { redirect } from "next/navigation";
import AcceptInviteForm from "@/features/users/invite/components/accept-invite-form";

type AcceptInvitePageProps = {
  // 👇 searchParams is a Promise now
  searchParams: Promise<{
    token?: string | string[];
  }>;
};

export default async function AcceptInvitePage({ searchParams }: AcceptInvitePageProps) {
  // 👇 unwrap the promise first
  const sp = await searchParams;

  const rawToken = sp.token;
  const token = typeof rawToken === "string" ? rawToken : Array.isArray(rawToken) ? rawToken[0] : undefined;

  console.log(token);
  if (!token) {
    // redirect("/invalid-invite");
  }

  const invitation = await prisma.invitation.findUnique({
    where: { token },
  });

  console.log(invitation);

  if (!invitation || invitation.status !== "pending") {
    // redirect("/invalid-invite");
  }

  if (!invitation || !invitation.expiresAt || invitation.expiresAt < new Date()) {
    // await prisma.invitation.update({
    //   where: { id: invitation.id },
    //   data: { status: "EXPIRED" },
    // });
    // redirect("/invite-expired");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* <AcceptInviteForm
        token={token}
        email={invitation.email}
        name={invitation.name}
      /> */}
    </div>
  );
}
