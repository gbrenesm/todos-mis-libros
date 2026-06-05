import sql from "@/lib/db";

type Editorial = {
  id: string;
  name: string;
};

export async function getEditorials() {
  return await sql<Editorial[]>`
    SELECT id, name
    FROM editorials
    ORDER BY name
  `;
}

export async function createEditorial(name: string, country_id: number) {
  return await sql`
    INSERT INTO editorials (name, country_id)
    VALUES (${name}, ${country_id})
    RETURNING id
  `;
}
