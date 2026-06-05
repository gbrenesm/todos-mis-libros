import { getBooks } from "@/services/books";
import BookCard from "@/components/BookCard";

export default async function Home() {
  const books = await getBooks();
  const booksRead = books.filter((b) => b.status === "leído").length;
  const favorites = books.filter((b) => b.rating === "preferido").length;

  return (
    <main className="mx-auto px-8 py-12 md:px-16 lg:px-24">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Mi biblioteca</h1>
        <span className="text-sm text-muted">
          {booksRead} libros leídos
        </span>
      </header>

      <section className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-card-bg rounded-xl p-4">
          <p className="text-xs text-muted">Este año</p>
          <p className="text-2xl font-bold mt-1">
            {books.filter((b) => b.read_date?.some((d) => d.includes("2026"))).length}
          </p>
        </div>
        <div className="bg-card-bg rounded-xl p-4">
          <p className="text-xs text-muted">Favoritos</p>
          <p className="text-2xl font-bold mt-1">{favorites}</p>
        </div>
        <div className="bg-card-bg rounded-xl p-4">
          <p className="text-xs text-muted">Total</p>
          <p className="text-2xl font-bold mt-1">{books.length}</p>
        </div>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </section>
    </main>
  );
}
