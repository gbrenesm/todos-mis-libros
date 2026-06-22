import { getBooks } from "@/services/books";
import BooksGrid from "@/components/BooksGrid";

export default async function Home() {
  const books = await getBooks();
  const favorites = books.filter((b) => b.rating === "preferido").length;
  const thisYear = books.filter((b) => b.read_date?.some((d) => d.includes("2026"))).length;

  return (
    <main className="mx-auto px-8 py-12 md:px-16 lg:px-24">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-title">Mi biblioteca</h1>
        <a
          href="/books/new"
          className="bg-accent text-white rounded-lg px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          + Nuevo libro
        </a>
      </header>

      <section className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-card-bg border border-card-border rounded-xl p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-label">Este año</p>
          <p className="text-3xl font-bold text-title mt-2">{thisYear}</p>
        </div>
        <div className="bg-card-bg border border-card-border rounded-xl p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-label">Favoritos</p>
          <p className="text-3xl font-bold text-title mt-2">{favorites}</p>
        </div>
        <div className="bg-card-bg border border-card-border rounded-xl p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-label">Total</p>
          <p className="text-3xl font-bold text-title mt-2">{books.length}</p>
        </div>
      </section>

      <BooksGrid books={books} />
    </main>
  );
}
