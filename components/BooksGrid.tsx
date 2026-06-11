"use client";

import { useState } from "react";
import type { Book } from "@/types/book";
import BookCard from "@/components/BookCard";

type Props = {
  books: Book[];
};

export default function BooksGrid({ books }: Props) {
  const [search, setSearch] = useState("");

  const filtered = books.filter((b) => {
    const term = search.toLowerCase();
    return (
      b.name.toLowerCase().includes(term) ||
      `${b.author_name} ${b.author_lastname ?? ""}`.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por título o autor..."
        className="w-full bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm mb-6"
      />

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
        {filtered.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </section>

      {filtered.length === 0 && (
        <p className="text-muted text-sm mt-4">No se encontraron libros.</p>
      )}
    </>
  );
}
