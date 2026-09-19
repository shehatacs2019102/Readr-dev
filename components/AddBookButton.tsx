"use client";

import { useState } from "react";
import AddBookModal from "@/components/AddBookModal";

export default function AddBookButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-100"
      >
        + Add a book
      </button>
      {open && <AddBookModal onClose={() => setOpen(false)} />}
    </>
  );
}
