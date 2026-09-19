"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { genres } from "@/lib/genres";

export async function addReview(data: {
  bookId: string;
  reviewer: string;
  rating: number;
  body: string;
}) {
  await prisma.review.create({
    data: {
      reviewer: data.reviewer,
      rating: data.rating,
      body: data.body,
      book: {
        connect: { id: data.bookId },
      },
    },
  });

  revalidatePath("/");
}
export type AddBookState = { error?: string; success?: boolean };

export async function addBook(
  _prev: AddBookState,
  formData: FormData
): Promise<AddBookState> {
  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const genre = String(formData.get("genre") ?? "").trim();
  const coverUrl = String(formData.get("coverUrl") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title || !author) {
    return { error: "Title and author are required." };
  }
  if (!(genres as readonly string[]).includes(genre)) {
    return { error: "Please pick a genre." };
  }
  if (coverUrl && !/^https?:\/\//i.test(coverUrl)) {
    return { error: "Cover URL must start with http:// or https://." };
  }

  await prisma.book.create({
    data: {
      title,
      author,
      genre,
      coverUrl: coverUrl || null,
      description: description || null,
    },
  });

  revalidatePath("/");
  return { success: true };
}
