import { notFound } from "next/navigation";
import { getAuthorById } from "@/services/authors";
import { getBooksByAuthorId } from "@/services/books";
import { getCountrys } from "@/services/countrys";
import AuthorDetail from "@/components/AuthorDetail";
import BookCard from "@/components/BookCard";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AuthorDetailPage({ params }: Props) {
  const { id } = await params;
  const [author, countrys] = await Promise.all([
    getAuthorById(id),
    getCountrys(),
  ]);

  if (!author) notFound();

  const books = await getBooksByAuthorId(id);

  const fullName = `${author.name} ${author.lastname ?? ""}`.trim();

  return (
    <main className="px-8 py-12 md:px-16 lg:px-24 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10 mb-12">
        <div className="shrink-0">
          {author.photo ? (
            <img
              src={author.photo}
              alt={fullName}
              className="w-40 h-40 object-cover rounded-full border border-card-border"
            />
          ) : (
            <div className="w-40 h-40 bg-card-bg rounded-full border border-card-border flex items-center justify-center">
              <span className="text-muted text-sm">Sin foto</span>
            </div>
          )}
        </div>

        <AuthorDetail author={author} countrys={countrys} />
      </div>

      <section>
        <h2 className="text-xl font-bold mb-6">
          Libros ({books.length})
        </h2>

        {books.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-muted text-sm">No hay libros de este autor aún.</p>
        )}
      </section>
    </main>
  );
}
