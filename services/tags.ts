import sql from "@/lib/db";

type Tag = {
  id: string;
  name: string;
};

export async function getTags() {
  return await sql<Tag[]>`
    SELECT id, name
    FROM tags
    ORDER BY name
  `;
}

export async function findOrCreateTag(name: string): Promise<string> {
  const existing = await sql`SELECT id FROM tags WHERE name = ${name}`;
  if (existing.length > 0) return existing[0].id;

  const [newTag] = await sql`
    INSERT INTO tags (name) VALUES (${name}) RETURNING id
  `;
  return newTag.id;
}
