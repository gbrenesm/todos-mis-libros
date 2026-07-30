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
      STRING_AGG(DISTINCT c.name, ', ') AS countries
    FROM authors a
    LEFT JOIN author_countries ac ON ac.author_id = a.id
    LEFT JOIN countrys c ON c.id = ac.country_id
    WHERE a.deleted_at IS NULL
    GROUP BY a.id
    ORDER BY a.name
  `;
}

export async function getAuthorById(id: string) {
  const rows = await sql<Author[]>`
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
      STRING_AGG(DISTINCT c.name, ', ') AS countries
    FROM authors a
    LEFT JOIN author_countries ac ON ac.author_id = a.id
    LEFT JOIN countrys c ON c.id = ac.country_id
    WHERE a.id = ${id} AND a.deleted_at IS NULL
    GROUP BY a.id
  `;
  return rows[0] ?? null;
}

export async function getAuthorCountryIds(authorId: string): Promise<number[]> {
  const rows = await sql<{ country_id: number }[]>`
    SELECT country_id FROM author_countries WHERE author_id = ${authorId}
  `;
  return rows.map((r) => r.country_id);
}

type AuthorsByCountry = {
  country: string;
  country_es: string;
  gender: string;
  count: number;
};

export async function getAuthorsByCountryAndGender() {
  return await sql<AuthorsByCountry[]>`
    SELECT
      c.name_en AS country,
      c.name AS country_es,
      a.gender,
      COUNT(DISTINCT a.id)::int AS count
    FROM authors a
    JOIN author_countries ac ON ac.author_id = a.id
    JOIN countrys c ON ac.country_id = c.id
    WHERE a.deleted_at IS NULL AND c.name_en IS NOT NULL
    GROUP BY c.name_en, c.name, a.gender
    ORDER BY c.name_en
  `;
}

type CreateAuthorInput = {
  name: string;
  lastname: string | null;
  birthday: number | null;
  death: number | null;
  gender: "mujer" | "hombre" | "no definido";
  nobel_prize: number | null;
  photo: string | null;
  city: string | null;
  country_ids: number[];
};

export async function createAuthor(author: CreateAuthorInput) {
  const [newAuthor] = await sql`
    INSERT INTO authors (name, lastname, birthday, death, gender, nobel_prize, photo, city)
    VALUES (${author.name}, ${author.lastname}, ${author.birthday}, ${author.death}, ${author.gender}, ${author.nobel_prize}, ${author.photo}, ${author.city})
    RETURNING id
  `;

  for (const countryId of author.country_ids) {
    await sql`
      INSERT INTO author_countries (author_id, country_id)
      VALUES (${newAuthor.id}, ${countryId})
    `;
  }

  return newAuthor;
}

type UpdateAuthorInput = {
  id: string;
  name: string;
  lastname: string | null;
  birthday: number | null;
  death: number | null;
  gender: "mujer" | "hombre" | "no definido";
  nobel_prize: number | null;
  photo: string | null;
  city: string | null;
  country_ids: number[];
};

export async function updateAuthor(author: UpdateAuthorInput) {
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
      updated_at = NOW()
    WHERE id = ${author.id}
  `;

  await sql`DELETE FROM author_countries WHERE author_id = ${author.id}`;
  for (const countryId of author.country_ids) {
    await sql`
      INSERT INTO author_countries (author_id, country_id)
      VALUES (${author.id}, ${countryId})
    `;
  }
}

export async function deleteAuthor(id: string) {
  await sql`
    UPDATE authors SET deleted_at = NOW() WHERE id = ${id}
  `;
}
