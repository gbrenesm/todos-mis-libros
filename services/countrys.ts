import sql from "@/lib/db";
import type { Country } from "@/types/country";

export async function getCountrys() {
  return await sql<Country[]>`
    SELECT c.id, c.name, co.name AS continent
    FROM countrys c
    JOIN continents co ON c.continent_id = co.id
    ORDER BY c.name
  `;
}
