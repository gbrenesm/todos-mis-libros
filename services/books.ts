import sql from "@/lib/db";
import type { Book } from "@/types/book";

export async function getBooks() {
  return await sql<Book[]>`
    SELECT
      b.id,
      b.name,
      b.year,
      b.status,
      b.rating,
      b.format,
      b.reading_times,
      b.purchased_date,
      b.fiction,
      b.in_library,
      b.cover,
      b.read_date,
      e.name AS editorial,
      a.name AS author_name,
      a.lastname AS author_lastname
    FROM books b
    LEFT JOIN editorials e ON b.editorial_id = e.id
    LEFT JOIN book_authors ba ON ba.book_id = b.id
    LEFT JOIN authors a ON ba.author_id = a.id
    ORDER BY b.name
  `;
}
