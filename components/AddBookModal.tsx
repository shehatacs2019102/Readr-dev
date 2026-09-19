"use client";

import { useActionState, useEffect } from "react";
import { addBook, type AddBookState } from "@/app/actions";
import { genres } from "@/lib/genres";

const inputClass =
  "h-9 w-full rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-500";

export default function AddBookModal({ onClose }: { onClose: () => void }) {
  const [state, formAction, pending] = useActionState<AddBookState, FormData>(
    addBook,
    {}
  );

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

  // Close once the book has been saved; the page revalidates behind it.
  useEffect(() => {
    if (state.success) onClose();
  }, [state.success, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-xl font-medium tracking-tight">Add a book</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md px-2 py-1 text-lg text-neutral-500 hover:bg-neutral-100"
          >
            ×
          </button>
        </div>

        <form action={formAction} className="space-y-3">
          <div className="flex gap-2.5">
            <input
              name="title"
              type="text"
              required
              placeholder="Title"
              className={inputClass}
            />
            <input
              name="author"
              type="text"
              required
              placeholder="Author"
              className={inputClass}
            />
          </div>

          <select name="genre" defaultValue={genres[0]} className={inputClass}>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          <input
            name="coverUrl"
            type="url"
            placeholder="Cover image URL (optional)"
            className={inputClass}
          />

          <textarea
            name="description"
            rows={3}
            placeholder="Short description (optional)"
            className="w-full resize-none rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
          />

          {state.error && (
            <p className="text-sm text-red-600">{state.error}</p>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {pending ? "Adding…" : "Add book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
