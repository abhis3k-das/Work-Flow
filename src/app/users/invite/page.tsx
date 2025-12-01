import InviteClient from "@/features/users/invite/components/Invitation";
import { getInvitationList } from "@/features/users/invite/lib/invitation-service";

export const revalidate = 300;

export default async function InvitePage() {
  const workspaceId = "Test-Workspace";

  const invitations = await getInvitationList(workspaceId);

  return <InviteClient workspaceId={workspaceId} initialInvites={invitations} />;
}
