
type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
};

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <p>{book.year}</p>
    </div>
  );
}