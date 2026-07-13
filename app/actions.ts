"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

  revalidatePath("/books");
}