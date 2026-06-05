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

export async function createAuthor(author: Omit<Author, "id">) {
  return await sql`
    INSERT INTO authors (name, lastname, birthday, death, gender, nobel_prize, photo, city, country_id)
    VALUES (${author.name}, ${author.lastname}, ${author.birthday}, ${author.death}, ${author.gender}, ${author.nobel_prize}, ${author.photo}, ${author.city}, ${author.country_id})
    RETURNING id
  `;
}
