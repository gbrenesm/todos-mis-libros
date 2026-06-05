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

const coverColors = [
  "bg-purple-200",
  "bg-green-200",
  "bg-amber-100",
  "bg-blue-200",
  "bg-pink-200",
  "bg-lime-100",
];

export default function BookCard({ book }: BookCardProps) {
  const stars = ratingStars[book.rating] ?? 3;
  const colorIndex = book.name.charCodeAt(0) % coverColors.length;
  const coverColor = coverColors[colorIndex];

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`${coverColor} rounded-xl aspect-2/3 flex items-center justify-center`}
      >
        {book.cover ? (
          <img
            src={book.cover}
            alt={book.name}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <svg
            className="w-10 h-10 opacity-60"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zM4 18V6h7v12H4zm9 0V6h7v12h-7z" />
          </svg>
        )}
      </div>

      <div>
        <h3 className="text-sm font-semibold leading-tight line-clamp-2">
          {book.name}
        </h3>
        <p className="text-xs text-[var(--muted)] mt-0.5">
          {book.author_name} {book.author_lastname}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[10px] border border-var(--card-border) rounded-full px-2 py-0.5">
          {book.fiction ? "Ficción" : "No ficción"}
        </span>
        <span className="text-xs text-amber-400">
          {"★".repeat(stars)}
          {"☆".repeat(5 - stars)}
        </span>
      </div>
    </div>
  );
}