import sql from "@/lib/db";

type CountRow = { label: string; count: number };

export type ChartsSummary = {
  totalBooks: number;
  totalReadings: number;
  totalAuthors: number;
};

export async function getChartsSummary(): Promise<ChartsSummary> {
  const [[books], [readings], [authors]] = await Promise.all([
    sql<{ count: number }[]>`
      SELECT COUNT(*)::int AS count FROM books WHERE deleted_at IS NULL
    `,
    sql<{ count: number }[]>`
      SELECT COALESCE(SUM(reading_times), 0)::int AS count FROM books WHERE deleted_at IS NULL
    `,
    sql<{ count: number }[]>`
      SELECT COUNT(*)::int AS count FROM authors WHERE deleted_at IS NULL
    `,
  ]);
  return {
    totalBooks: books.count,
    totalReadings: readings.count,
    totalAuthors: authors.count,
  };
}

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

export async function getBooksByFormat() {
  return await sql<CountRow[]>`
    SELECT format AS label, COUNT(*)::int AS count
    FROM books
    WHERE deleted_at IS NULL
    GROUP BY format
    ORDER BY count DESC
  `;
}

export async function getBooksByType() {
  return await sql<CountRow[]>`
    SELECT book_type AS label, COUNT(*)::int AS count
    FROM books
    WHERE deleted_at IS NULL
    GROUP BY book_type
    ORDER BY count DESC
  `;
}

export async function getBooksByAuthorGender() {
  return await sql<CountRow[]>`
    SELECT a.gender AS label, COUNT(DISTINCT b.id)::int AS count
    FROM books b
    JOIN book_authors ba ON ba.book_id = b.id
    JOIN authors a ON ba.author_id = a.id
    WHERE b.deleted_at IS NULL
    GROUP BY a.gender
    ORDER BY count DESC
  `;
}

export async function getBooksByAuthor() {
  return await sql<CountRow[]>`
    SELECT CONCAT(a.name, ' ', COALESCE(a.lastname, '')) AS label, COUNT(DISTINCT b.id)::int AS count
    FROM books b
    JOIN book_authors ba ON ba.book_id = b.id
    JOIN authors a ON ba.author_id = a.id
    WHERE b.deleted_at IS NULL
    GROUP BY a.name, a.lastname
    ORDER BY count DESC
    LIMIT 10
  `;
}

export async function getBooksByFiction() {
  return await sql<CountRow[]>`
    SELECT CASE WHEN fiction THEN 'Ficción' ELSE 'No ficción' END AS label, COUNT(*)::int AS count
    FROM books
    WHERE deleted_at IS NULL
    GROUP BY fiction
    ORDER BY count DESC
  `;
}

export async function getBooksByDecade() {
  return await sql<CountRow[]>`
    SELECT (FLOOR(year / 10) * 10)::text || 's' AS label, COUNT(*)::int AS count
    FROM books
    WHERE deleted_at IS NULL AND year IS NOT NULL
    GROUP BY FLOOR(year / 10)
    ORDER BY FLOOR(year / 10)
  `;
}

export async function getBooksByEditorial() {
  return await sql<CountRow[]>`
    SELECT e.name AS label, COUNT(*)::int AS count
    FROM books b
    JOIN editorials e ON b.editorial_id = e.id
    WHERE b.deleted_at IS NULL
    GROUP BY e.name
    ORDER BY count DESC
    LIMIT 15
  `;
}
