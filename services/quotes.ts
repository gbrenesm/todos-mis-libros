import sql from "@/lib/db";
import type { Quote } from "@/types/quote";

export async function getQuotesByBookId(bookId: string) {
  return await sql<Quote[]>`
    SELECT id, quote, pages, libreta, book_id
    FROM quotes
    WHERE book_id = ${bookId} AND deleted_at IS NULL
    ORDER BY created_at DESC
  `;
}

export async function createQuote(bookId: string, quote: string, pages: string | null, libreta: boolean) {
  await sql`
    INSERT INTO quotes (book_id, quote, pages, libreta)
    VALUES (${bookId}, ${quote}, ${pages}, ${libreta})
  `;
}

export async function updateQuote(id: string, quote: string, pages: string | null, libreta: boolean) {
  await sql`
    UPDATE quotes SET
      quote = ${quote},
      pages = ${pages},
      libreta = ${libreta},
      updated_at = NOW()
    WHERE id = ${id}
  `;
}
