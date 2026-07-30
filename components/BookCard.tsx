import Link from "next/link";
import type { Book } from "@/types/book";

type BookCardProps = {
  book: Book;
};

const ratingStars: Record<string, number> = {
  "preferido": 5,
  "muy bueno": 4,
  "bueno": 3,
  "más o menos": 2,
  "malo": 1,
};

export default function BookCard({ book }: BookCardProps) {
  const stars = ratingStars[book.rating] ?? 3;

  return (
    <div className="bg-card-bg border border-card-border rounded-xl overflow-hidden flex flex-col min-w-32 max-w-56">
      <Link href={`/books/${book.id}`}>
        <div className="aspect-2/3">
          {book.cover ? (
            <img
              src={book.cover}
              alt={book.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-card-border flex items-center justify-center">
              <svg
                className="w-10 h-10 opacity-40"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zM4 18V6h7v12H4zm9 0V6h7v12h-7z" />
              </svg>
            </div>
          )}
        </div>
      </Link>

      <div className="p-1.5 lg:p-3 flex flex-col gap-0.5 lg:gap-1.5 flex-1">
        <Link href={`/books/${book.id}`}>
          <h3 className="text-[10px] lg:text-xs font-semibold leading-tight line-clamp-2 text-title hover:underline">
            {book.name}
          </h3>
        </Link>
        {book.author_id ? (
          <Link href={`/authors/${book.author_id}`} className="text-[9px] lg:text-[11px] text-muted line-clamp-1 hover:underline">
            {book.authors}
          </Link>
        ) : (
          <p className="text-[9px] lg:text-[11px] text-muted line-clamp-1">
            {book.authors}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-0.5">
          <span className="text-[7px] lg:text-[9px] font-medium bg-tag text-tag-text rounded-full px-1.5 lg:px-2 py-0.5">
            {book.fiction ? "Ficción" : "No ficción"}
          </span>
          <span className="text-[9px] lg:text-[11px] text-tag">
            {"★".repeat(stars)}
            {"☆".repeat(5 - stars)}
          </span>
        </div>
      </div>
    </div>
  );
}
