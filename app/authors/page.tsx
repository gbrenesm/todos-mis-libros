import { getAuthors } from "@/services/authors";
import { getCountrys } from "@/services/countrys";
import AuthorsList from "@/components/AuthorsList";
import Link from "next/link";

export default async function AuthorsPage() {
  const [authors, countrys] = await Promise.all([getAuthors(), getCountrys()]);

  return (
    <main className="mx-auto px-8 py-12 md:px-16 lg:px-24">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-title">Autoras, autores y autorxs</h1>
        <Link
          href="/authors/new"
          className="bg-accent text-white rounded-lg px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          + Nuevo autor
        </Link>
      </header>

      <AuthorsList authors={authors} countrys={countrys} />
    </main>
  );
}
