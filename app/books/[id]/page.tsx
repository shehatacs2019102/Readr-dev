import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ReviewSection from "@/components/ReviewSection";

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const book = await prisma.book.findUnique({
    where: { id },
    include: { reviews: true },
  });

  if (!book) notFound();

  const reviewCount = book.reviews.length;
  const rating =
    reviewCount > 0
      ? book.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
      : 0;

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-neutral-500 hover:text-neutral-900"
      >
        ← Back to books
      </Link>

      <div className="mb-8 flex gap-6">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={`Cover of ${book.title}`}
            className="aspect-[2/3] w-40 shrink-0 rounded-md object-cover"
          />
        ) : (
          <div className="flex aspect-[2/3] w-40 shrink-0 items-end rounded-md bg-neutral-200 p-3">
            <span className="text-[15px] font-medium leading-tight">
              {book.title}
            </span>
          </div>
        )}

        <div>
          <span className="mb-2 inline-block rounded-md border border-neutral-300 px-2.5 py-1 text-xs font-medium text-neutral-600">
            {book.genre}
          </span>
          <h1 className="text-2xl font-medium tracking-tight">{book.title}</h1>
          <p className="text-sm text-neutral-500">{book.author}</p>
          <div className="mt-2 flex items-center gap-1 text-sm">
            <span className="text-amber-500">★</span>
            {rating.toFixed(1)}
            <span className="text-neutral-400">· {reviewCount} reviews</span>
          </div>
          {book.description && (
            <p className="mt-4 text-sm text-neutral-600">{book.description}</p>
          )}
        </div>
      </div>

      <ReviewSection
        bookId={book.id}
        initialReviews={book.reviews}
        title="Reviews"
      />
    </main>
  );
}
