const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const account1 = await prisma.account.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Cuenta 1",
      initial_balance: 10000,
      current_balance: 10000,
      is_active: true
    }
  });
  const account2 = await prisma.account.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Cuenta 2",
      initial_balance: 10000,
      current_balance: 10000,
      is_active: true
    }
  });

  console.log("Cuentas creadas exitosamente:", account1.name, "y", account2.name);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
