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
    <div className="bg-card-bg border border-card-border rounded-xl overflow-hidden flex flex-col">
      <Link href={`/books/${book.id}`}>
        <div className="aspect-3/4">
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

      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <Link href={`/books/${book.id}`}>
          <h3 className="text-sm font-semibold leading-tight line-clamp-2 text-title hover:underline">
            {book.name}
          </h3>
        </Link>
        <p className="text-xs text-muted">
          <Link href={`/authors/${book.author_id}`} className="hover:underline">
            {book.author_name} {book.author_lastname}
          </Link>
        </p>

        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-[10px] font-medium bg-tag text-tag-text rounded-full px-2.5 py-0.5">
            {book.fiction ? "Ficción" : "No ficción"}
          </span>
          <span className="text-xs text-tag">
            {"★".repeat(stars)}
            {"☆".repeat(5 - stars)}
          </span>
        </div>
      </div>
    </div>
  );
}
