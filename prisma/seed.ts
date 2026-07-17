import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminClerkId = process.env.ADMIN_CLERK_ID || "admin-clerk-id";

  // Create or update a super admin user (safe to run multiple times)
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      clerkId: adminClerkId,
      firstName: "Super",
      lastName: "Admin",
      role: "SUPER_ADMIN",
      isActive: true,
    },
    create: {
      clerkId: adminClerkId,
      email: adminEmail,
      firstName: "Super",
      lastName: "Admin",
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });

  // Initial site settings
  await prisma.systemSettings.upsert({
    where: { key: "site" },
    update: { value: { title: "Travel Agency" } },
    create: { key: "site", value: { title: "Travel Agency" } },
  });

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
