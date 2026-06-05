import { getBooks } from '@/services/books'
import BookCard from "../components/BookCard";

export default async function Home() {
  const books = await getBooks()
  return (
    <main>
      <h1 className="font-sans text-5xl">Todos mis libros</h1>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </main>
  );
}
