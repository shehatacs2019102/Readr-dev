type Book = {
  id: string;
  title: string;
  author: string;
  rating: number;
  reviewCount: number;
  color: string;
};

export default function BookCard({
  book,
  onClick,
}: {
  book: Book;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="group w-full cursor-pointer text-left">
      <div
        className={`${book.color} mb-2.5 flex aspect-[2/3] items-end rounded-md p-3 transition-transform group-hover:-translate-y-1`}
      >
        <span className="text-[15px] font-medium leading-tight">
          {book.title}
        </span>
      </div>
      <p className="text-sm font-medium">{book.title}</p>
      <p className="mb-1.5 text-[13px] text-neutral-500">{book.author}</p>
      <div className="flex items-center gap-1 text-[13px]">
        <span className="text-amber-500">★</span>
        {book.rating.toFixed(1)}
        <span className="text-neutral-400">· {book.reviewCount}</span>
      </div>
    </button>
  );
}