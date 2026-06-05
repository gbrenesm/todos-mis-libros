import { getCountrys } from "@/services/countrys";
import AuthorForm from "@/components/AuthorForm";

export default async function NewAuthorPage() {
  const countrys = await getCountrys();

  return (
    <main className="max-w-2xl mx-auto px-8 py-12">
      <h1 className="text-2xl font-bold mb-8">Nuevo autor</h1>
      <AuthorForm countrys={countrys} />
    </main>
  );
}
