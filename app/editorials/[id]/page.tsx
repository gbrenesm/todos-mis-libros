import { notFound } from "next/navigation";
import { getEditorialById } from "@/services/editorials";
import { getBooksByEditorialId } from "@/services/books";
import BookCard from "@/components/BookCard";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditorialDetailPage({ params }: Props) {
  const { id } = await params;
  const editorial = await getEditorialById(id);

  if (!editorial) notFound();

  const books = await getBooksByEditorialId(id);

  return (
    <main className="px-8 py-12 md:px-16 lg:px-24">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{editorial.name}</h1>
        <p className="text-sm text-muted mt-1">{editorial.country}</p>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-6">
          Libros ({books.length})
        </h2>

        {books.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-muted text-sm">No hay libros de esta editorial aún.</p>
        )}
      </section>
    </main>
  );
}
