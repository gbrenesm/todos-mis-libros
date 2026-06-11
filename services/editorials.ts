import sql from "@/lib/db";

type Editorial = {
  id: string;
  name: string;
};

type EditorialWithCountry = {
  id: string;
  name: string;
  country: string;
  last_cover: string | null;
};

export async function getEditorials() {
  return await sql<Editorial[]>`
    SELECT id, name
    FROM editorials
    ORDER BY name
  `;
}

export async function getEditorialsWithCountry() {
  return await sql<EditorialWithCountry[]>`
    SELECT e.id, e.name, c.name AS country,
      (SELECT b.cover FROM books b WHERE b.editorial_id = e.id ORDER BY b.created_at DESC LIMIT 1) AS last_cover
    FROM editorials e
    LEFT JOIN countrys c ON e.country_id = c.id
    ORDER BY e.name
  `;
}

export async function getEditorialById(id: string) {
  const rows = await sql<EditorialWithCountry[]>`
    SELECT e.id, e.name, c.name AS country,
      (SELECT b.cover FROM books b WHERE b.editorial_id = e.id ORDER BY b.created_at DESC LIMIT 1) AS last_cover
    FROM editorials e
    LEFT JOIN countrys c ON e.country_id = c.id
    WHERE e.id = ${id}
  `;
  return rows[0] ?? null;
}

export async function createEditorial(name: string, country_id: number) {
  return await sql`
    INSERT INTO editorials (name, country_id)
    VALUES (${name}, ${country_id})
    RETURNING id
  `;
}
