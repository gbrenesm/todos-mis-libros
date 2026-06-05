import sql from "@/lib/db";

export async function getCountrys() {
  return await sql`
    SELECT c.id, c.name, co.name AS continent
    FROM countrys c
    JOIN continents co ON c.continent_id = co.id
    ORDER BY c.name
  `;
}
