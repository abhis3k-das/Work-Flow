import { SYSTEM_ROLES_DETAILS, SYSTEM_ROLES } from "../src/lib/constants/permission";
/**
 * prisma/seed.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedSystemRoles() {
  console.log("🌱 Seeding system roles...");

  for (const roleName of SYSTEM_ROLES) {
    const permissions = SYSTEM_ROLES_DETAILS[roleName];

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

    // Remove old permissions for this role
    await prisma.permission.deleteMany({
      where: { roleId: role.id },
    });

    // Insert updated permissions
    await prisma.permission.createMany({
      data: permissions.map((key) => ({
        key,
        roleId: role.id,
      })),
    });

    console.log(`✓ ${roleName} role synced (${permissions.length} permissions)`);
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
