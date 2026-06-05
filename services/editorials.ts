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
