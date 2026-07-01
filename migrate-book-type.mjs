import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL);

async function migrate() {
  console.log("1. Adding book_type column...");
  await sql`ALTER TABLE books ADD COLUMN IF NOT EXISTS book_type TEXT DEFAULT 'ensayo'`;

  console.log("2. Setting book_type='cuentos' where has_stories=true...");
  await sql`UPDATE books SET book_type = 'cuentos' WHERE has_stories = true`;

  console.log("3. Setting book_type='novela' for books with tag 'Novela'...");
  await sql`
    UPDATE books SET book_type = 'novela'
    WHERE id IN (
      SELECT tb.book_id FROM tags_books tb
      JOIN tags t ON tb.tag_id = t.id
      WHERE t.name = 'Novela'
    ) AND book_type != 'cuentos'
  `;

  console.log("4. Removing 'Novela' tag from tags_books...");
  await sql`
    DELETE FROM tags_books WHERE tag_id IN (
      SELECT id FROM tags WHERE name = 'Novela'
    )
  `;

  console.log("5. Removing 'Novela' tag from tags table...");
  await sql`DELETE FROM tags WHERE name = 'Novela'`;

  console.log("6. Dropping has_stories column...");
  await sql`ALTER TABLE books DROP COLUMN IF EXISTS has_stories`;

  console.log("Done!");
  process.exit(0);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
