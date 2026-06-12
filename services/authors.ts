import sql from "@/lib/db";
import type { Author } from "@/types/author";

export async function getAuthors() {
  return await sql<Author[]>`
    SELECT
      a.id,
      a.name,
      a.lastname,
      a.birthday,
      a.death,
      a.gender,
      a.nobel_prize,
      a.photo,
      a.city,
      a.country_id
    FROM authors a
    ORDER BY a.name
  `;
}

type AuthorDetail = Author & { country: string };

export async function getAuthorById(id: string) {
  const rows = await sql<AuthorDetail[]>`
    SELECT
      a.id,
      a.name,
      a.lastname,
      a.birthday,
      a.death,
      a.gender,
      a.nobel_prize,
      a.photo,
      a.city,
      a.country_id,
      c.name AS country
    FROM authors a
    LEFT JOIN countrys c ON a.country_id = c.id
    WHERE a.id = ${id} AND a.deleted_at IS NULL
  `;
  return rows[0] ?? null;
}

type AuthorsByCountry = {
  country: string;
  gender: string;
  count: number;
};

export async function getAuthorsByCountryAndGender() {
  return await sql<AuthorsByCountry[]>`
    SELECT
      c.name_en AS country,
      a.gender,
      COUNT(*)::int AS count
    FROM authors a
    JOIN countrys c ON a.country_id = c.id
    WHERE a.deleted_at IS NULL AND c.name_en IS NOT NULL
    GROUP BY c.name_en, a.gender
    ORDER BY c.name_en
  `;
}

export async function createAuthor(author: Omit<Author, "id">) {
  return await sql`
    INSERT INTO authors (name, lastname, birthday, death, gender, nobel_prize, photo, city, country_id)
    VALUES (${author.name}, ${author.lastname}, ${author.birthday}, ${author.death}, ${author.gender}, ${author.nobel_prize}, ${author.photo}, ${author.city}, ${author.country_id})
    RETURNING id
  `;
}

export async function updateAuthor(author: Author) {
  await sql`
    UPDATE authors SET
      name = ${author.name},
      lastname = ${author.lastname},
      birthday = ${author.birthday},
      death = ${author.death},
      gender = ${author.gender},
      nobel_prize = ${author.nobel_prize},
      photo = ${author.photo},
      city = ${author.city},
      country_id = ${author.country_id},
      updated_at = NOW()
    WHERE id = ${author.id}
  `;
}
