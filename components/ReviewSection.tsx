"use client";

import { useState } from "react";
import { addReview as saveReview } from "@/app/actions";

type Review = {
  id: string;
  reviewer: string;
  rating: number;
  body: string;
  agrees: number;
};

export default function ReviewSection({
  bookId,
  initialReviews,
  title,
  limit,
}: {
  bookId: string;
  initialReviews: Review[];
  title: string;
  limit?: number;
}) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");

  const sorted = [...reviews].sort((a, b) => b.agrees - a.agrees);
  const shown = limit ? sorted.slice(0, limit) : sorted;

  const stars = (r: number) => (
    <span className="text-[13px] text-amber-500">
      {"★".repeat(r)}
      <span className="text-neutral-300">{"★".repeat(5 - r)}</span>
    </span>
  );

  const addReview = async () => {
    if (!name.trim() || !body.trim()) return;

    const optimistic: Review = {
      id: `temp-${Date.now()}`,
      reviewer: name.trim(),
      rating,
      body: body.trim(),
      agrees: 0,
    };
    setReviews([optimistic, ...reviews]);
    setName("");
    setBody("");
    setRating(5);

    await saveReview({
      bookId,
      reviewer: optimistic.reviewer,
      rating: optimistic.rating,
      body: optimistic.body,
    });
  };

  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-neutral-700">{title}</h3>

      {shown.length > 0 ? (
        <ul className="space-y-3">
          {shown.map((r) => (
            <li key={r.id} className="rounded-lg border border-neutral-200 p-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">{r.reviewer}</span>
                {stars(r.rating)}
              </div>
              <p className="text-sm text-neutral-600">{r.body}</p>
              <p className="mt-2 text-xs text-neutral-400">
                {r.agrees} readers agreed
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-6 text-center text-sm text-neutral-500">
          No reviews yet — be the first.
        </p>
      )}

      <div className="mt-6 border-t border-neutral-200 pt-4">
        <h3 className="mb-3 text-sm font-medium text-neutral-700">
          Add your review
        </h3>
        <div className="space-y-2.5">
          <div className="flex gap-2.5">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="h-9 flex-1 rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-500"
            />
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="h-9 rounded-md border border-neutral-300 px-2 text-sm"
            >
              <option value={5}>★★★★★</option>
              <option value={4}>★★★★</option>
              <option value={3}>★★★</option>
              <option value={2}>★★</option>
              <option value={1}>★</option>
            </select>
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Share a short thought…"
            rows={3}
            className="w-full resize-none rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
          />
          <button
            onClick={addReview}
            disabled={!name.trim() || !body.trim()}
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Post review
          </button>
        </div>
      </div>
    </div>
  );
}
