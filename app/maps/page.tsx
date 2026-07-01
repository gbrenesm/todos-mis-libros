import { getAuthorsByCountryAndGender } from "@/services/authors";
import { getBooksWithAuthorCountryAndGender } from "@/services/books";
import AuthorsMap from "@/components/AuthorsMap";

export default async function MapsPage() {
  const [data, booksData] = await Promise.all([
    getAuthorsByCountryAndGender(),
    getBooksWithAuthorCountryAndGender(),
  ]);

  const womenByCountry = data
    .filter((d) => d.gender === "mujer")
    .map((d) => ({ country: d.country, countryEs: d.country_es, count: d.count }));

  const menByCountry = data
    .filter((d) => d.gender === "hombre")
    .map((d) => ({ country: d.country, countryEs: d.country_es, count: d.count }));

  const womenBooks = booksData.filter((b) => b.author_gender === "mujer");
  const menBooks = booksData.filter((b) => b.author_gender === "hombre");

  return (
    <main className="mx-auto px-8 py-12 md:px-16 lg:px-24">
      <h1 className="text-2xl font-bold text-title mb-8">Mapas de autoras, autores y autorxs</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AuthorsMap
          data={womenByCountry}
          title="Autoras"
          color="#654597"
          books={womenBooks}
        />
        <AuthorsMap
          data={menByCountry}
          title="Autores"
          color="#E2711D"
          books={menBooks}
        />
      </div>
    </main>
  );
}
