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

      <BooksGrid books={books} thisYear={thisYear} favorites={favorites} />
    </main>
  );
}
