import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.book.createMany({
    data: [
      { title: "The Midnight Library", author: "Matt Haig", description: "A library between life and death." },
      { title: "Project Hail Mary", author: "Andy Weir", description: "A lone astronaut must save humanity." },
      { title: "Klara and the Sun", author: "Kazuo Ishiguro", description: "An artificial friend observes the world." },
      { title: "Circe", author: "Madeline Miller", description: "The witch of Greek myth, reimagined." },
      { title: "Dune", author: "Frank Herbert", description: "Politics and prophecy on a desert planet." },
    ],
  });
  console.log("Seeded books ✓");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });