import { getAuthors } from "@/services/authors";
import { getEditorials } from "@/services/editorials";
import BookForm from "@/components/BookForm";

export default async function NewBookPage() {
  const [authors, editorials] = await Promise.all([
    getAuthors(),
    getEditorials(),
  ]);

  return (
    <main className="max-w-3xl mx-auto px-8 py-12">
      <h1 className="text-2xl font-bold mb-8">Nuevo libro</h1>
      <BookForm editorials={editorials} authors={authors} />
    </main>
  );
}
