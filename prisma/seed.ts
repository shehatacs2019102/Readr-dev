import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.book.createMany({
    data: [
      // Fiction
      { title: "The Midnight Library", author: "Matt Haig", description: "A library between life and death.", coverUrl: "https://covers.openlibrary.org/b/id/10313767-L.jpg", genre: "Fiction" },
      { title: "Where the Crawdads Sing", author: "Delia Owens", description: "A girl raised alone in the marshes of North Carolina becomes a murder suspect.", coverUrl: "https://covers.openlibrary.org/b/id/8362947-L.jpg", genre: "Fiction" },
      { title: "The Kite Runner", author: "Khaled Hosseini", description: "A story of friendship and redemption set against the backdrop of Afghanistan.", coverUrl: "https://covers.openlibrary.org/b/id/14846827-L.jpg", genre: "Fiction" },
      { title: "Normal People", author: "Sally Rooney", description: "Two Irish teenagers navigate love and class across the years.", coverUrl: "https://covers.openlibrary.org/b/id/8794265-L.jpg", genre: "Fiction" },

      // Sci-fi
      { title: "Project Hail Mary", author: "Andy Weir", description: "A lone astronaut must save humanity.", coverUrl: "https://covers.openlibrary.org/b/id/11200092-L.jpg", genre: "Sci-fi" },
      { title: "Klara and the Sun", author: "Kazuo Ishiguro", description: "An artificial friend observes the world.", coverUrl: "https://covers.openlibrary.org/b/id/10648686-L.jpg", genre: "Sci-fi" },
      { title: "Dune", author: "Frank Herbert", description: "Politics and prophecy on a desert planet.", coverUrl: "https://covers.openlibrary.org/b/id/11481354-L.jpg", genre: "Sci-fi" },
      { title: "The Martian", author: "Andy Weir", description: "An astronaut stranded on Mars fights to survive.", coverUrl: "https://covers.openlibrary.org/b/id/11447888-L.jpg", genre: "Sci-fi" },
      { title: "Neuromancer", author: "William Gibson", description: "A washed-up hacker takes one last job in a dystopian cyber future.", coverUrl: "https://covers.openlibrary.org/b/id/283860-L.jpg", genre: "Sci-fi" },

      // Fantasy
      { title: "Circe", author: "Madeline Miller", description: "The witch of Greek myth, reimagined.", coverUrl: "https://covers.openlibrary.org/b/id/8739376-L.jpg", genre: "Fantasy" },
      { title: "The Name of the Wind", author: "Patrick Rothfuss", description: "A legendary figure recounts his rise from orphan to arcanist.", coverUrl: "https://covers.openlibrary.org/b/id/11480483-L.jpg", genre: "Fantasy" },
      { title: "A Game of Thrones", author: "George R.R. Martin", description: "Noble families vie for control of the Iron Throne.", coverUrl: "https://covers.openlibrary.org/b/id/9269962-L.jpg", genre: "Fantasy" },
      { title: "The Hobbit", author: "J.R.R. Tolkien", description: "A reluctant hobbit joins a quest to reclaim a dwarven kingdom.", coverUrl: "https://covers.openlibrary.org/b/id/14627509-L.jpg", genre: "Fantasy" },

      // Non-fiction
      { title: "Sapiens", author: "Yuval Noah Harari", description: "A brief history of humankind, from foragers to the modern age.", coverUrl: "https://covers.openlibrary.org/b/id/8634250-L.jpg", genre: "Non-fiction" },
      { title: "Educated", author: "Tara Westover", description: "A memoir of a woman who leaves her survivalist family to pursue an education.", coverUrl: "https://covers.openlibrary.org/b/id/8314077-L.jpg", genre: "Non-fiction" },
      { title: "Atomic Habits", author: "James Clear", description: "A practical guide to building good habits and breaking bad ones.", coverUrl: "https://covers.openlibrary.org/b/id/12539702-L.jpg", genre: "Non-fiction" },
      { title: "Quiet", author: "Susan Cain", description: "The power of introverts in a world that can't stop talking.", coverUrl: "https://covers.openlibrary.org/b/id/7079753-L.jpg", genre: "Non-fiction" },
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
