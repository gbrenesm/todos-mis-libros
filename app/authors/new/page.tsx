import { getCountrys } from "@/services/countrys";
import AuthorForm from "@/components/AuthorForm";

type Props = {
  searchParams: Promise<{ returnTo?: string }>;
};

export default async function NewAuthorPage({ searchParams }: Props) {
  const countrys = await getCountrys();
  const { returnTo } = await searchParams;

  return (
    <main className="max-w-2xl mx-auto px-8 py-12">
      <h1 className="text-2xl font-bold mb-8">Nuevo autor</h1>
      <AuthorForm countrys={countrys} returnTo={returnTo} />
    </main>
  );
}
