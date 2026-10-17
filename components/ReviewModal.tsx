"use client";

import { useEffect } from "react";
import ReviewSection from "@/components/ReviewSection";

type Review = {
  id: string;
  reviewer: string;
  rating: number;
  body: string;
  agrees: number;
};

type Book = {
  id: string;
  title: string;
  author: string;
  reviews?: Review[];
};

export default function ReviewModal({
  book,
  onClose,
}: {
  book: Book;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-surface p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-medium tracking-tight">{book.title}</h2>
            <p className="text-sm text-muted">{book.author}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md px-2 py-1 text-lg text-muted hover:bg-hover"
          >
            ×
          </button>
        </div>

        <ReviewSection
          bookId={book.id}
          initialReviews={book.reviews ?? []}
          title="Most agreed-upon reviews"
          limit={3}
        />

        <a
          href={`/books/${book.id}`}
          className="mt-4 inline-block text-sm font-medium text-link hover:underline"
        >
          See full page →
        </a>
      </div>
    </div>
  );
}
