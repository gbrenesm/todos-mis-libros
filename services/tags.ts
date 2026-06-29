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

export async function updateBookTags(bookId: string, tagNames: string[]) {
  await sql`DELETE FROM tags_books WHERE book_id = ${bookId}`;

  for (const name of tagNames) {
    const tagId = await findOrCreateTag(name.trim());
    await sql`INSERT INTO tags_books (book_id, tag_id) VALUES (${bookId}, ${tagId})`;
  }
}
