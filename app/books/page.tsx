import BookBrowser from "@/components/BookBrowser";
import { prisma } from "@/lib/prisma";

export default async function BooksPage() {
const dbBooks = await prisma.book.findMany({
  include: { reviews: true },
});
  // Map DB records into the shape BookBrowser expects
  const colors = [
    "bg-violet-200 text-violet-900",
    "bg-orange-200 text-orange-900",
    "bg-teal-200 text-teal-900",
    "bg-blue-200 text-blue-900",
    "bg-pink-200 text-pink-900",
    "bg-amber-200 text-amber-900",
  ];

const books = dbBooks.map((b, i) => {
  const reviewCount = b.reviews.length;
  const rating =
    reviewCount > 0
      ? b.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
      : 0;
  return {
    id: b.id,
    title: b.title,
    author: b.author,
    rating,
    reviewCount,
    color: colors[i % colors.length],
    genre: "Fiction",
    reviews: b.reviews.map((r) => ({
      id: r.id,
      reviewer: r.reviewer,
      rating: r.rating,
      body: r.body,
      agrees: r.agrees,
    })),
  };
});
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-medium tracking-tight">Browse books</h1>
          <p className="mt-1 text-sm text-neutral-500">{books.length} books</p>
        </div>
        <button className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-100">
          + Add a book
        </button>
      </div>

      <BookBrowser books={books} />
    </main>
  );
}