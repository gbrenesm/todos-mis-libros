import sql from "@/lib/db";
import type { Story } from "@/types/story";

export async function getStorysByBookId(bookId: string) {
  return await sql<Story[]>`
    SELECT id, name, description, rating, book_id
    FROM storys
    WHERE book_id = ${bookId} AND deleted_at IS NULL
    ORDER BY created_at ASC
  `;
}

export async function createStory(bookId: string, name: string, description: string | null, rating: string) {
  await sql`
    INSERT INTO storys (book_id, name, description, rating)
    VALUES (${bookId}, ${name}, ${description}, ${rating})
  `;
}

export async function updateStory(id: string, name: string, description: string | null, rating: string) {
  await sql`
    UPDATE storys SET
      name = ${name},
      description = ${description},
      rating = ${rating},
      updated_at = NOW()
    WHERE id = ${id}
  `;
}
