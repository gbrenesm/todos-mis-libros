import type { Book } from "@/types/book";

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  console.log("Book", book)
  return (
    <div>
      <h2>{book.name}</h2>
      <p>{book.author_name} {book.author_lastname}</p>
      <p>{book.year}</p>
    </div>
  );
}