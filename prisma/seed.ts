import { SYSTEM_ROLES_DETAILS, SYSTEM_ROLES, PERMISSIONS, PermissionKey, SystemRole } from "../src/lib/constants/permission";
/**
 * prisma/seed.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedSystemRoles() {
  console.log("🌱 Seeding system roles...");

  const permissionIdsObject: Partial<Record<PermissionKey, string>> = {};
  console.log("**************************************************************");
  console.log("*************** Creating Permissions ************************");
  console.log();
  for (const permission of PERMISSIONS) {
    const data = await prisma.permission.upsert({
      where: { key: permission.key },
      update: { description: permission.description },
      create: {
        key: permission.key,
        description: permission.description,
      },
    });
    permissionIdsObject[permission.key] = data.id;
    console.log(`✓ [PERMISSION] : CREATED : ${permission.key}`);
  }

  console.log();
  console.log("*************** All Premission Created ***********************");
  console.log("**************************************************************");

  console.log();
  console.log();
  console.log();

  console.log("**************************************************************");
  console.log("******************* Creating Roles ***************************");
  console.log();
  const rolesIdsObject: Partial<Record<SystemRole, string>> = {};
  for (const roleName of SYSTEM_ROLES) {
    // Upsert main role (Owner, Admin, etc.)
    const role = await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: {
        name: roleName,
        isSystem: true,
        description: `${roleName} role`,
      },
    });

    rolesIdsObject[roleName] = role.id;
    console.log(`✓ [ROLE] : CREATED :${roleName}`);
  }
  console.log();
  console.log("******************** All Roles Created ***********************");
  console.log("**************************************************************");

  console.log();
  console.log();
  console.log();

  console.log("**************************************************************");
  console.log("************** Syncing Roles & Permissions *******************");
  console.log();

  const errors = [];
  for (const roleName of SYSTEM_ROLES) {
    for (const permission of SYSTEM_ROLES_DETAILS[roleName]) {
      const roleId = rolesIdsObject[roleName];
      if (!roleId) {
        errors.push(`${permission} for ${roleName} skipped ${roleId} not found`);
        continue;
      }

      const permissionId = permissionIdsObject[permission];
      if (!permissionId) {
        errors.push(`${permission} for ${roleName} skipped ${permissionId} not found`);
        continue;
      }

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: roleId,
            permissionId: permissionId,
          },
        },
        update: {},
        create: {
          roleId: roleId,
          permissionId: permissionId,
        },
      });
      console.log(`✓ [SYNCED] : ${permission} added for ${roleName}`);
    }
  }

  console.log();
  console.log("******************** Syncing Completed ***********************");
  console.log("**************************************************************");

  console.log();
  console.log();
  if (errors.length > 0) {
    console.log("***************ERRORS********************");
    for (const error in errors) {
      console.log(error);
    }
    console.log("****************************************");
  }
}

async function main() {
  await seedSystemRoles();

  console.log("--------------------------------------------------");
  console.log("🌱 RBAC seeding complete.");
  console.log("--------------------------------------------------");

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
