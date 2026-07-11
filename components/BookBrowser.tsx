"use client";

import { useState } from "react";
import BookCard from "@/components/BookCard";
import ReviewModal from "@/components/ReviewModal";   // ← add

type Review = { id: string; reviewer: string; rating: number; body: string; agrees: number };

type Book = {
  id: string;
  title: string;
  author: string;
  rating: number;
  reviewCount: number;
  color: string;
  genre: string;
  reviews?: Review[];   // ← add
};

const genres = ["All", "Fiction", "Sci-fi", "Non-fiction", "Fantasy"];

export default function BookBrowser({ books }: { books: Book[] }) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState("reviews");
  const [selected, setSelected] = useState<Book | null>(null);   // ← add

  const filtered = books
    .filter((b) => {
      const matchesQuery =
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase());
      const matchesGenre = genre === "All" || b.genre === genre;
      return matchesQuery && matchesGenre;
    })
    .sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      return b.reviewCount - a.reviewCount;
    });

  return (
    <>
      <div className="mb-5 flex flex-wrap gap-2.5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or author"
          className="h-10 flex-1 rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-500"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-10 rounded-md border border-neutral-300 px-3 text-sm"
        >
          <option value="reviews">Most reviewed</option>
          <option value="rating">Highest rated</option>
        </select>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            className={
              genre === g
                ? "rounded-md bg-neutral-900 px-3.5 py-1.5 text-[13px] font-medium text-white"
                : "rounded-md border border-neutral-300 px-3.5 py-1.5 text-[13px] text-neutral-600 transition-colors hover:bg-neutral-100"
            }
          >
            {g}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {filtered.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={() => setSelected(book)}   // ← add
            />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-neutral-500">
          No books match your search.
        </p>
      )}

      {selected && (   // ← add: render modal when a book is selected
        <ReviewModal book={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}