import { getAuthorsByCountryAndGender } from "@/services/authors";
import AuthorsMap from "@/components/AuthorsMap";

export default async function MapsPage() {
  const data = await getAuthorsByCountryAndGender();

  const womenByCountry = data
    .filter((d) => d.gender === "mujer")
    .map((d) => ({ country: d.country, countryEs: d.country_es, count: d.count }));

  const menByCountry = data
    .filter((d) => d.gender === "hombre")
    .map((d) => ({ country: d.country, countryEs: d.country_es, count: d.count }));

  return (
    <main className="mx-auto px-8 py-12 md:px-16 lg:px-24">
      <h1 className="text-2xl font-bold text-title mb-8">Mapas de autoras, autores y autorxs</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AuthorsMap
          data={womenByCountry}
          title="Autoras"
          color="#654597"
        />
        <AuthorsMap
          data={menByCountry}
          title="Autores"
          color="#E2711D"
        />
      </div>
    </main>
  );
}
