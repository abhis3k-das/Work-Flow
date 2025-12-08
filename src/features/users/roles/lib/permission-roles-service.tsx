"use server";

import { prisma } from "@/server/db";
import { CreateRoleType } from "./permission-roles-validation";
import { revalidatePath } from "next/cache";
import { PermissionKey } from "@/lib/constants/permission";
import { Role } from "@prisma/client";

export type RoleListWithCount = Role & {
  _count: { users: number };
  permissions: { id: string; description: string | null; key: PermissionKey }[];
};

export type RolesType = {
  id?: string;
  name?: string;
  description?: string;
};

export async function createCustomRole(args: CreateRoleType) {
  const { name, description } = args;
  const existingRole = await prisma.role.findUnique({
    where: { name: name },
  });
  if (existingRole) {
    throw new Error("Role with same name already exist.");
  }

  await prisma.role.create({
    data: {
      name: name,
      description: description,
    },
  });

  revalidatePath("/user/roles", "page");
  return {
    success: true,
  };
}

export async function getRolesList(): Promise<RoleListWithCount[]> {
  const rolesListRaw = await prisma.role.findMany({
    include: {
      _count: {
        select: { users: true },
      },
      permissions: {
        include: {
          permission: true,
        },
      },
    },
  });

  const rolesList = rolesListRaw.map((el) => ({
    ...el,
    permissions: el.permissions.map((rp) => ({
      id: rp.permission.id,
      key: rp.permission.key,
      description: rp.permission.description,
    })),
  }));

  return rolesList;
}

export async function deleteRole(id: string) {
  const exisitingRole = await prisma.role.delete({
    where: { id: id },
  });

  if (!exisitingRole) {
    throw new Error("Invitation not found");
  }

  revalidatePath("/users/roles", "page");
  return {
    success: true,
  };
}

export async function updatePermission(id: string, permissionList: PermissionKey[]) {
  const existingRole = await prisma.role.findUnique({
    where: { id: id },
    include: {
      permissions: true,
    },
  });

  if (!existingRole) {
    throw new Error("Role not found");
  }
  const permissions = await prisma.permission.findMany({
    where: {
      key: { in: permissionList },
    },
    select: { id: true, key: true },
  });

  const newPermissionIds = permissions.map((p) => p.id);
  await prisma.rolePermission.deleteMany({
    where: {
      roleId: id,
      permissionId: { notIn: newPermissionIds },
    },
  });
  const existingPermissionIds = new Set(existingRole.permissions.map((rp) => rp.permissionId));
  const toCreate = newPermissionIds.filter((id) => !existingPermissionIds.has(id));

  if (toCreate.length > 0) {
    await prisma.rolePermission.createMany({
      data: toCreate.map((permissionId) => ({
        roleId: id,
        permissionId,
      })),
      skipDuplicates: true,
    });
  }
  revalidatePath("users/roles");
}
