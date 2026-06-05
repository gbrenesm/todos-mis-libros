import sql from "@/lib/db";
import type { Book } from "@/types/book";

type CreateBookInput = {
  name: string;
  year: number;
  status: string;
  rating: string;
  format: string;
  reading_times: number;
  purchased_date: number | null;
  fiction: boolean;
  in_library: boolean;
  cover: string | null;
  editorial_id: string;
  author_ids: string[];
  read_date: string[];
  tag_ids: string[];
};

export async function createBook(book: CreateBookInput) {
  const [newBook] = await sql`
    INSERT INTO books (name, year, status, rating, format, reading_times, purchased_date, fiction, in_library, cover, editorial_id, read_date)
    VALUES (${book.name}, ${book.year}, ${book.status}, ${book.rating}, ${book.format}, ${book.reading_times}, ${book.purchased_date}, ${book.fiction}, ${book.in_library}, ${book.cover}, ${book.editorial_id}, ${book.read_date})
    RETURNING id
  `;

  for (const authorId of book.author_ids) {
    await sql`
      INSERT INTO book_authors (book_id, author_id)
      VALUES (${newBook.id}, ${authorId})
    `;
  }

  for (const tagId of book.tag_ids) {
    await sql`
      INSERT INTO tags_books (book_id, tag_id)
      VALUES (${newBook.id}, ${tagId})
    `;
  }

  return newBook.id;
}

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
