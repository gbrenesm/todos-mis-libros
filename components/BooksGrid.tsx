"use client";

import { useState } from "react";
import type { Book } from "@/types/book";
import BookCard from "@/components/BookCard";

type Props = {
  books: Book[];
};

export default function BooksGrid({ books }: Props) {
  const [search, setSearch] = useState("");
  const [fictionFilter, setFictionFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  const readYears = [...new Set(
    books.flatMap((b) => b.read_date?.map((d) => d.slice(0, 4)) ?? [])
  )].sort().reverse();

  const allTags = [...new Set(
    books.flatMap((b) => b.tags?.split(", ") ?? [])
  )].sort();

  const filtered = books.filter((b) => {
    if (fictionFilter === "ficcion" && !b.fiction) return false;
    if (fictionFilter === "no-ficcion" && b.fiction) return false;
    if (ratingFilter && b.rating !== ratingFilter) return false;
    if (yearFilter && !b.read_date?.some((d) => d.startsWith(yearFilter))) return false;
    if (tagFilter && !b.tags?.split(", ").includes(tagFilter)) return false;
    const term = search.toLowerCase();
    return (
      b.name.toLowerCase().includes(term) ||
      `${b.author_name} ${b.author_lastname ?? ""}`.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <div className="relative mb-8">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por título o autor..."
          className="w-full bg-card-bg border border-card-border rounded-xl pl-11 pr-5 py-4 text-sm"
        />
      </div>

      <div className="flex gap-4 mb-6">
        <select
          value={fictionFilter}
          onChange={(e) => setFictionFilter(e.target.value)}
          className="bg-card-bg border border-card-border rounded-lg px-4 pr-10 py-2.5 text-sm text-label"
        >
          <option value="">Ficción / No ficción</option>
          <option value="ficcion">Ficción</option>
          <option value="no-ficcion">No ficción</option>
        </select>

        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="bg-card-bg border border-card-border rounded-lg px-4 pr-10 py-2.5 text-sm text-label"
        >
          <option value="">Todas las calificaciones</option>
          <option value="preferido">Preferido</option>
          <option value="muy bueno">Muy bueno</option>
          <option value="bueno">Bueno</option>
          <option value="más o menos">Más o menos</option>
          <option value="malo">Malo</option>
        </select>

        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="bg-card-bg border border-card-border rounded-lg px-4 pr-10 py-2.5 text-sm text-label"
        >
          <option value="">Año de lectura</option>
          {readYears.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className="bg-card-bg border border-card-border rounded-lg px-4 pr-10 py-2.5 text-sm text-label"
        >
          <option value="">Todas las etiquetas</option>
          {allTags.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
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
