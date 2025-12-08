"use client";

import { useState } from "react";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

import { SystemRole } from "@/lib/constants/permission";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import CustomRoleForm from "@/features/users/roles/components/custom-role-form";
import RolesAndPermissionDrawer from "./roles-permission-drawer";
import { RoleListWithCount } from "../lib/permission-roles-service";
import DeleteRoleButton from "./delete-role-button";
import CustomRolePermissionForm from "./custom-roles-permission-form";

export default function RolesList({ rolesList }: { rolesList: RoleListWithCount[] }) {
  const [openSystemRole, setOpenSystemRole] = useState(false);
  const [openCustomRole, setOpenCustomRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState<SystemRole | RoleListWithCount | null>(null);

  const openSystemRolePermissions = (role: SystemRole) => {
    setSelectedRole(role);
    setOpenSystemRole(true);
  };

  const openCustomRolePermission = (role: RoleListWithCount) => {
    setSelectedRole(role);
    setOpenCustomRole(true);
  };
  const [showCreateRoleForm, setshowCreateRoleForm] = useState(false);

  return (
    <Sheet open={showCreateRoleForm} onOpenChange={setshowCreateRoleForm}>
      <div className="flex justify-between">
        <PageTitle title="Roles And Permission" subTitle="Configure roles and permissions for users." />
        <SheetTrigger asChild>
          <Button variant={"outline"}>Add Role</Button>
        </SheetTrigger>
      </div>

      <Card className="mt-4 h-[500px] w-full overflow-y-scroll">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-[#aeaeae] dark:bg-[#3b3b3b]">
            <TableRow>
              <TableCell className="px-6 text-center">Roles</TableCell>
              <TableCell className="text-center">Users Assigned</TableCell>
              <TableCell className="text-center">Created By</TableCell>
              <TableCell className="text-center">Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rolesList.map((role) => (
              <TableRow key={role.name}>
                <TableCell className="px-6 text-center">{role.name}</TableCell>
                <TableCell className="text-center">{role._count.users}</TableCell>
                <TableCell className="text-center">{role.isSystem ? "System" : "Custom"}</TableCell>
                <TableCell className="flex items-center justify-center gap-4 text-center">
                  {role.isSystem ? (
                    <Button variant="outline" className="button-md-blue" onClick={() => openSystemRolePermissions(role.name as SystemRole)}>
                      View
                    </Button>
                  ) : (
                    <Button variant={"outline"} className="button-md-blue" onClick={() => openCustomRolePermission(role)}>
                      View
                    </Button>
                  )}
                  {!role.isSystem && <DeleteRoleButton id={role.id} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      {openSystemRole && (
        <RolesAndPermissionDrawer props={{ open: openSystemRole, setOpen: setOpenSystemRole, selectedRole: selectedRole as SystemRole }} />
      )}
      {openCustomRole && (
        <CustomRolePermissionForm props={{ open: openCustomRole, setOpen: setOpenCustomRole, role: selectedRole as RoleListWithCount }} />
      )}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Role</SheetTitle>
          <SheetDescription>Fill the details and create a custom role.</SheetDescription>
          <CustomRoleForm setOpen={setshowCreateRoleForm} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
