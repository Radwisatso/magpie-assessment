import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/hash";
const prisma = new PrismaClient();

async function main() {
  const magpie = await prisma.user.upsert({
    where: {
      email: "magpie@mail.com",
    },
    update: {},
    create: {
      email: "magpie@mail.com",
      password: await hashPassword("123456"),
      name: "Mag Pie",
      role: "ADMIN",
      members: {
        create: [
          {
            name: "Mag Pie",
            email: "magpie@mail.com",
            status: "ACTIVE",
            joinedDate: new Date(),
          },
        ],
      },
    },
  });

  const categories = await prisma.category.createMany({
    data: [
      {
        name: "ACTION",
      },
      {
        name: "EDUCATION",
      },
      {
        name: "HORROR",
      },
      {
        name: "ROMANCE",
      },
      {
        name: "SCIENCE",
      },
    ],
  });

  console.log({
    magpie,
    categories,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
