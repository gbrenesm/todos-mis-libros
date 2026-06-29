import sql from "@/lib/db";

type CountRow = { label: string; count: number };

export async function getBooksByReadYear() {
  return await sql<CountRow[]>`
    SELECT LEFT(unnest(read_date), 4) AS label, COUNT(*)::int AS count
    FROM books
    WHERE read_date IS NOT NULL AND array_length(read_date, 1) > 0
    GROUP BY label
    ORDER BY label
  `;
}

export async function getBooksByRating() {
  return await sql<CountRow[]>`
    SELECT rating AS label, COUNT(*)::int AS count
    FROM books
    GROUP BY rating
    ORDER BY count DESC
  `;
}

export async function getBooksByCountry() {
  return await sql<CountRow[]>`
    SELECT c.name AS label, COUNT(*)::int AS count
    FROM books b
    JOIN book_authors ba ON ba.book_id = b.id
    JOIN authors a ON ba.author_id = a.id
    JOIN author_countries ac ON ac.author_id = a.id
    JOIN countrys c ON ac.country_id = c.id
    GROUP BY c.name
    ORDER BY count DESC
    LIMIT 15
  `;
}

export async function getBooksByTag() {
  return await sql<CountRow[]>`
    SELECT t.name AS label, COUNT(*)::int AS count
    FROM tags_books tb
    JOIN tags t ON tb.tag_id = t.id
    GROUP BY t.name
    ORDER BY count DESC
    LIMIT 15
  `;
}

export async function getBooksByAuthorGender() {
  return await sql<CountRow[]>`
    SELECT a.gender AS label, COUNT(DISTINCT b.id)::int AS count
    FROM books b
    JOIN book_authors ba ON ba.book_id = b.id
    JOIN authors a ON ba.author_id = a.id
    GROUP BY a.gender
    ORDER BY count DESC
  `;
}

export async function getAuthorsByGender() {
  return await sql<CountRow[]>`
    SELECT a.gender AS label, COUNT(*)::int AS count
    FROM authors a
    WHERE a.deleted_at IS NULL
    GROUP BY a.gender
    ORDER BY count DESC
  `;
}
