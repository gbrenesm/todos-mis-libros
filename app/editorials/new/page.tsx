import { getCountrys } from "@/services/countrys";
import EditorialForm from "@/components/EditorialForm";

export default async function NewEditorialPage() {
  const countrys = await getCountrys();

  return (
    <main className="max-w-2xl mx-auto px-8 py-12">
      <h1 className="text-2xl font-bold mb-8">Nueva editorial</h1>
      <EditorialForm countrys={countrys} />
    </main>
  );
}
