import { notFound } from "next/navigation";
import { getAuthorById } from "@/services/authors";
import { getBooksByAuthorId } from "@/services/books";
import BookCard from "@/components/BookCard";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AuthorDetailPage({ params }: Props) {
  const { id } = await params;
  const author = await getAuthorById(id);

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

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-handwritten">{fullName}</h1>

          <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm mt-2">
            <div>
              <span className="text-muted">País:</span>{" "}
              <span className="font-handwritten text-base">{author.country}</span>
            </div>
            {author.city && (
              <div>
                <span className="text-muted">Ciudad:</span>{" "}
                <span className="font-handwritten text-base">{author.city}</span>
              </div>
            )}
            {author.birthday && (
              <div>
                <span className="text-muted">Nacimiento:</span>{" "}
                <span className="font-handwritten text-base">{author.birthday}</span>
              </div>
            )}
            {author.death && (
              <div>
                <span className="text-muted">Muerte:</span>{" "}
                <span className="font-handwritten text-base">{author.death}</span>
              </div>
            )}
            <div>
              <span className="text-muted">Género:</span>{" "}
              <span className="font-handwritten text-base">{author.gender}</span>
            </div>
            {author.nobel_prize && (
              <div>
                <span className="text-muted">Nobel:</span>{" "}
                <span className="font-handwritten text-base">{author.nobel_prize}</span>
              </div>
            )}
          </div>
        </div>
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
