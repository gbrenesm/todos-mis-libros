import { getAuthors } from "@/services/authors";
import { getEditorials } from "@/services/editorials";
import { getTags } from "@/services/tags";
import BookForm from "@/components/BookForm";

export default async function NewBookPage() {
  const [authors, editorials, tags] = await Promise.all([
    getAuthors(),
    getEditorials(),
    getTags(),
  ]);

  return (
    <main className="max-w-3xl mx-auto px-8 py-12">
      <h1 className="text-2xl font-bold mb-8">Nuevo libro</h1>
      <BookForm editorials={editorials} authors={authors} tags={tags} />
    </main>
  );
}
