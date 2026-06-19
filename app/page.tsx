import { getBooks } from "@/services/books";
import BooksGrid from "@/components/BooksGrid";

export default async function Home() {
  const books = await getBooks();
  const favorites = books.filter((b) => b.rating === "preferido").length;
  const yearBooks = books.filter((b) => b.read_date?.some((d) => d.includes("2026")))
  console.log(yearBooks)
  return (
    <main className="mx-auto px-8 py-12 md:px-16 lg:px-24">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Mi biblioteca</h1>
        <a
          href="/books/new"
          className="bg-accent text-white rounded-lg px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Nuevo libro
        </a>
      </header>

      <section className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
          <p className="text-xs text-muted">Este año</p>
          <p className="text-2xl font-bold mt-1">
            {books.filter((b) => b.read_date?.some((d) => d.includes("2026"))).length}
          </p>
        </div>
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
          <p className="text-xs text-muted">Favoritos</p>
          <p className="text-2xl font-bold mt-1">{favorites}</p>
        </div>
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
          <p className="text-xs text-muted">Total</p>
          <p className="text-2xl font-bold mt-1">{books.length}</p>
        </div>
      </section>

      <BooksGrid books={books} />
    </main>
  );
}
