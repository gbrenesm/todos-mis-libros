import Link from "next/link";
import { getEditorialsWithCountry } from "@/services/editorials";
import EditorialsList from "@/components/EditorialsList";

export default async function EditorialsPage() {
  const editorials = await getEditorialsWithCountry();

  return (
    <main className="px-8 py-12 md:px-16 lg:px-24">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Editoriales</h1>
        <Link
          href="/editorials/new"
          className="bg-accent text-white rounded-lg px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Nueva editorial
        </Link>
      </div>

      <EditorialsList editorials={editorials} />
    </main>
  );
}
