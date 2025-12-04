"use client";

import { useState } from "react";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

import { SystemRole } from "@/lib/constants/permission";
import RolesAndPermissionDrawer from "./roles-permission-drawer";
import CustomRoleForm from "@/features/users/roles/components/custom-roles-form";

export default function RolesAndPermission() {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<SystemRole | null>(null);

  const [showOnlyGranted, setShowOnlyGranted] = useState(false);

  const openRolePermissions = (role: SystemRole) => {
    setSelectedRole(role);
    setShowOnlyGranted(false);
    setOpen(true);
  };

  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Roles And Permission" subTitle="Configure roles and permissions for users." />
        <Button variant={"outline"} onClick={() => setShowForm(true)}>
          Add Role
        </Button>
      </div>

      <Card className="mt-4">
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
            {[
              { name: "Owner", users: 1 },
              { name: "Admin", users: 2 },
              { name: "Member", users: 16 },
              { name: "Viewer", users: 4 },
            ].map((role) => (
              <TableRow key={role.name}>
                <TableCell className="px-6 text-center">{role.name}</TableCell>
                <TableCell className="text-center">{role.users}</TableCell>
                <TableCell className="text-center">System</TableCell>
                <TableCell className="text-center">
                  <Button variant="outline" className="button-md-green" onClick={() => openRolePermissions(role.name as SystemRole)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <RolesAndPermissionDrawer props={{ open, selectedRole, setOpen, setShowOnlyGranted, showOnlyGranted }} />
        <CustomRoleForm open={showForm} setOpen={setShowForm} />
      </Card>
    </>
  );
}
