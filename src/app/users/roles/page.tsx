import RolesList from "@/features/users/roles/components/roles-list";
import { getRolesList } from "@/features/users/roles/lib/permission-roles-service";

export default async function RolesPage() {
  const rolesList = await getRolesList();
  return <RolesList rolesList={rolesList} />;
}
