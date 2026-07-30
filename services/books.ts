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
  book_type: string;
  purchased_from: string | null;
  cover: string | null;
  editorial_id: string;
  author_ids: string[];
  read_date: string[];
  tag_ids: string[];
};

export async function createBook(book: CreateBookInput) {
  const [newBook] = await sql`
    INSERT INTO books (name, year, status, rating, format, reading_times, purchased_date, fiction, in_library, book_type, purchased_from, cover, editorial_id, read_date)
    VALUES (${book.name}, ${book.year}, ${book.status}, ${book.rating}, ${book.format}, ${book.reading_times}, ${book.purchased_date}, ${book.fiction}, ${book.in_library}, ${book.book_type}, ${book.purchased_from}, ${book.cover}, ${book.editorial_id}, ${book.read_date})
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

type BookDetail = {
  id: string;
  name: string;
  year: number;
  read_date: string[] | null;
  status: string;
  rating: string;
  format: string;
  reading_times: number;
  purchased_date: number | null;
  fiction: boolean;
  in_library: boolean;
  book_type: string;
  purchased_from: string | null;
  cover: string | null;
  editorial: string;
  authors: string;
  author_id: string | null;
  tags: string | null;
};

export async function getBookById(id: string) {
  const rows = await sql<BookDetail[]>`
    SELECT
      b.id,
      b.name,
      b.year,
      b.read_date,
      b.status,
      b.rating,
      b.format,
      b.reading_times,
      b.purchased_date,
      b.fiction,
      b.in_library,
      b.book_type,
      b.purchased_from,
      b.cover,
      e.name AS editorial,
      STRING_AGG(DISTINCT CONCAT(a.name, ' ', COALESCE(a.lastname, '')), ', ') AS authors,
      MIN(a.id::text) AS author_id,
      STRING_AGG(DISTINCT t.name, ', ') AS tags
    FROM books b
    LEFT JOIN editorials e ON b.editorial_id = e.id
    LEFT JOIN book_authors ba ON ba.book_id = b.id
    LEFT JOIN authors a ON ba.author_id = a.id
    LEFT JOIN tags_books tb ON tb.book_id = b.id
    LEFT JOIN tags t ON tb.tag_id = t.id
    WHERE b.id = ${id} AND b.deleted_at IS NULL
    GROUP BY b.id, e.name
  `;
  return rows[0] ?? null;
}

type UpdateBookInput = {
  id: string;
  name: string;
  year: number;
  status: string;
  rating: string;
  format: string;
  reading_times: number;
  purchased_date: number | null;
  fiction: boolean;
  in_library: boolean;
  book_type: string;
  purchased_from: string | null;
  cover: string | null;
  read_date: string[];
};

export async function updateBook(book: UpdateBookInput) {
  await sql`
    UPDATE books SET
      name = ${book.name},
      year = ${book.year},
      status = ${book.status},
      rating = ${book.rating},
      format = ${book.format},
      reading_times = ${book.reading_times},
      purchased_date = ${book.purchased_date},
      fiction = ${book.fiction},
      in_library = ${book.in_library},
      book_type = ${book.book_type},
      purchased_from = ${book.purchased_from},
      cover = ${book.cover},
      read_date = ${book.read_date},
      updated_at = NOW()
    WHERE id = ${book.id}
  `;
}

export async function deleteBook(id: string) {
  await sql`
    UPDATE books SET deleted_at = NOW() WHERE id = ${id}
  `;
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
      b.book_type,
      b.purchased_from,
      b.cover,
      b.read_date,
      e.name AS editorial,
      STRING_AGG(DISTINCT CONCAT(a.name, ' ', COALESCE(a.lastname, '')), ', ') AS authors,
      MIN(a.id::text) AS author_id,
      STRING_AGG(DISTINCT t.name, ', ') AS tags
    FROM books b
    LEFT JOIN editorials e ON b.editorial_id = e.id
    LEFT JOIN book_authors ba ON ba.book_id = b.id
    LEFT JOIN authors a ON ba.author_id = a.id
    LEFT JOIN tags_books tb ON tb.book_id = b.id
    LEFT JOIN tags t ON tb.tag_id = t.id
    WHERE b.deleted_at IS NULL
    GROUP BY b.id, e.name
    ORDER BY b.name
  `;
}

export async function getBooksByAuthorId(authorId: string) {
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
      b.book_type,
      b.purchased_from,
      b.cover,
      b.read_date,
      e.name AS editorial,
      STRING_AGG(DISTINCT CONCAT(a2.name, ' ', COALESCE(a2.lastname, '')), ', ') AS authors,
      STRING_AGG(DISTINCT t.name, ', ') AS tags
    FROM books b
    LEFT JOIN editorials e ON b.editorial_id = e.id
    LEFT JOIN book_authors ba ON ba.book_id = b.id
    LEFT JOIN book_authors ba2 ON ba2.book_id = b.id
    LEFT JOIN authors a2 ON ba2.author_id = a2.id
    LEFT JOIN tags_books tb ON tb.book_id = b.id
    LEFT JOIN tags t ON tb.tag_id = t.id
    WHERE ba.author_id = ${authorId} AND b.deleted_at IS NULL
    GROUP BY b.id, e.name
    ORDER BY b.name
  `;
}

export async function getBooksByEditorialId(editorialId: string) {
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
      b.book_type,
      b.purchased_from,
      b.cover,
      b.read_date,
      e.name AS editorial,
      STRING_AGG(DISTINCT CONCAT(a.name, ' ', COALESCE(a.lastname, '')), ', ') AS authors,
      STRING_AGG(DISTINCT t.name, ', ') AS tags
    FROM books b
    LEFT JOIN editorials e ON b.editorial_id = e.id
    LEFT JOIN book_authors ba ON ba.book_id = b.id
    LEFT JOIN authors a ON ba.author_id = a.id
    LEFT JOIN tags_books tb ON tb.book_id = b.id
    LEFT JOIN tags t ON tb.tag_id = t.id
    WHERE b.editorial_id = ${editorialId} AND b.deleted_at IS NULL
    GROUP BY b.id, e.name
    ORDER BY b.name
  `;
}

type BookWithCountryGender = Book & {
  country_en: string;
  author_gender: string;
};

export async function getBooksWithAuthorCountryAndGender() {
  return await sql<BookWithCountryGender[]>`
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
      b.book_type,
      b.purchased_from,
      b.cover,
      b.read_date,
      e.name AS editorial,
      STRING_AGG(DISTINCT CONCAT(a2.name, ' ', COALESCE(a2.lastname, '')), ', ') AS authors,
      STRING_AGG(DISTINCT t.name, ', ') AS tags,
      c.name_en AS country_en,
      a.gender AS author_gender
    FROM books b
    LEFT JOIN editorials e ON b.editorial_id = e.id
    LEFT JOIN book_authors ba ON ba.book_id = b.id
    LEFT JOIN authors a ON ba.author_id = a.id
    LEFT JOIN author_countries ac ON ac.author_id = a.id
    LEFT JOIN countrys c ON ac.country_id = c.id
    LEFT JOIN book_authors ba2 ON ba2.book_id = b.id
    LEFT JOIN authors a2 ON ba2.author_id = a2.id
    LEFT JOIN tags_books tb ON tb.book_id = b.id
    LEFT JOIN tags t ON tb.tag_id = t.id
    WHERE b.deleted_at IS NULL
    GROUP BY b.id, e.name, c.name_en, a.gender
    ORDER BY b.name
  `;
}
