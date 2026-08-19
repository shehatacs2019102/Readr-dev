import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.book.createMany({
    data: [
      { title: "The Midnight Library", author: "Matt Haig", description: "A library between life and death.", coverUrl: "https://covers.openlibrary.org/b/id/10313767-L.jpg" },
      { title: "Project Hail Mary", author: "Andy Weir", description: "A lone astronaut must save humanity.", coverUrl: "https://covers.openlibrary.org/b/id/11200092-L.jpg" },
      { title: "Klara and the Sun", author: "Kazuo Ishiguro", description: "An artificial friend observes the world.", coverUrl: "https://covers.openlibrary.org/b/id/10648686-L.jpg" },
      { title: "Circe", author: "Madeline Miller", description: "The witch of Greek myth, reimagined.", coverUrl: "https://covers.openlibrary.org/b/id/8739376-L.jpg" },
      { title: "Dune", author: "Frank Herbert", description: "Politics and prophecy on a desert planet.", coverUrl: "https://covers.openlibrary.org/b/id/11481354-L.jpg" },
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