import { getCountrys } from "@/services/countrys";

export default async function CountrysPage() {
  const countrys = await getCountrys();

  return (
    <main>
      <h1>Países</h1>
      <ul>
        {countrys.map((country) => (
          <li key={country.id}>
            {country.name} — {country.continent}
          </li>
        ))}
      </ul>
    </main>
  );
}
