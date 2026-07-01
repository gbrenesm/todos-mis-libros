"use client";

import { useState, useMemo } from "react";
import type { Book } from "@/types/book";
import BookCard from "@/components/BookCard";

type Props = {
  books: Book[];
  thisYear: number;
  favorites: number;
};

type SortOption = "name-asc" | "name-desc" | "read-desc" | "read-asc" | "rating";

const sortLabels: Record<SortOption, string> = {
  "name-asc": "Nombre A→Z",
  "name-desc": "Nombre Z→A",
  "read-desc": "Última lectura ↓",
  "read-asc": "Última lectura ↑",
  "rating": "Calificación",
};

const ratingOrder: Record<string, number> = {
  preferido: 5,
  "muy bueno": 4,
  bueno: 3,
  "más o menos": 2,
  malo: 1,
};

export default function BooksGrid({ books, thisYear, favorites }: Props) {
  const [search, setSearch] = useState("");
  const [fictionFilter, setFictionFilter] = useState("");
  const [bookTypeFilter, setBookTypeFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [editionFilter, setEditionFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");

  const readYears = [...new Set(
    books.flatMap((b) => b.read_date?.map((d) => d.slice(0, 4)) ?? [])
  )].sort().reverse();

  const editionYears = [...new Set(
    books.map((b) => String(b.year))
  )].sort().reverse();

  const allTags = [...new Set(
    books.flatMap((b) => b.tags?.split(", ") ?? [])
  )].sort();

  const filtered = useMemo(() => {
    let result = books.filter((b) => {
      if (fictionFilter === "ficcion" && !b.fiction) return false;
      if (fictionFilter === "no-ficcion" && b.fiction) return false;
      if (bookTypeFilter && b.book_type !== bookTypeFilter) return false;
      if (ratingFilter && b.rating !== ratingFilter) return false;
      if (yearFilter && !b.read_date?.some((d) => d.startsWith(yearFilter))) return false;
      if (editionFilter && String(b.year) !== editionFilter) return false;
      if (tagFilter && !b.tags?.split(", ").includes(tagFilter)) return false;
      const term = search.toLowerCase();
      return (
        b.name.toLowerCase().includes(term) ||
        (b.authors ?? "").toLowerCase().includes(term)
      );
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case "name-asc": return a.name.localeCompare(b.name);
        case "name-desc": return b.name.localeCompare(a.name);
        case "read-desc": {
          const aDate = a.read_date?.slice().sort().reverse()[0] ?? "";
          const bDate = b.read_date?.slice().sort().reverse()[0] ?? "";
          return bDate.localeCompare(aDate);
        }
        case "read-asc": {
          const aDate = a.read_date?.slice().sort()[0] ?? "9999";
          const bDate = b.read_date?.slice().sort()[0] ?? "9999";
          return aDate.localeCompare(bDate);
        }
        case "rating": return (ratingOrder[b.rating] ?? 0) - (ratingOrder[a.rating] ?? 0);
        default: return 0;
      }
    });

    return result;
  }, [books, fictionFilter, bookTypeFilter, ratingFilter, yearFilter, editionFilter, tagFilter, search, sortBy]);

  const hasActiveFilters = fictionFilter || bookTypeFilter || ratingFilter || yearFilter || editionFilter || tagFilter || sortBy !== "name-asc";

  function clearAll() {
    setFictionFilter("");
    setBookTypeFilter("");
    setRatingFilter("");
    setYearFilter("");
    setEditionFilter("");
    setTagFilter("");
    setSortBy("name-asc");
  }

  const activeFilters: { label: string; clear: () => void }[] = [];
  if (fictionFilter) activeFilters.push({ label: fictionFilter === "ficcion" ? "Ficción" : "No ficción", clear: () => setFictionFilter("") });
  if (bookTypeFilter) activeFilters.push({ label: bookTypeFilter, clear: () => setBookTypeFilter("") });
  if (yearFilter) activeFilters.push({ label: yearFilter, clear: () => setYearFilter("") });
  if (editionFilter) activeFilters.push({ label: `Ed. ${editionFilter}`, clear: () => setEditionFilter("") });
  if (ratingFilter) activeFilters.push({ label: ratingFilter, clear: () => setRatingFilter("") });
  if (tagFilter) activeFilters.push({ label: tagFilter, clear: () => setTagFilter("") });
  if (sortBy !== "name-asc") activeFilters.push({ label: sortLabels[sortBy], clear: () => setSortBy("name-asc") });

  const hasFilters = fictionFilter || bookTypeFilter || ratingFilter || yearFilter || editionFilter || tagFilter || search;

  return (
    <>
      <section className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-card-bg border border-card-border rounded-xl p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-label">Este año</p>
          <p className="text-3xl font-bold text-title mt-2">{thisYear}</p>
        </div>
        <div className="bg-card-bg border border-card-border rounded-xl p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-label">Favoritos</p>
          <p className="text-3xl font-bold text-title mt-2">{favorites}</p>
        </div>
        <div className="bg-card-bg border border-card-border rounded-xl p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-label">Total</p>
          <p className="text-3xl font-bold text-title mt-2">
            {hasFilters ? `${filtered.length} / ${books.length}` : books.length}
          </p>
        </div>
      </section>

      <div className="relative mb-6">
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

      <div className="bg-card-bg border border-card-border rounded-xl p-6 mb-8">
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-label">Categoría</span>
            <div className="flex">
              <button
                type="button"
                onClick={() => setFictionFilter(fictionFilter === "ficcion" ? "" : "ficcion")}
                className={`px-3 py-1.5 text-xs font-medium rounded-l-lg border border-card-border transition-colors ${fictionFilter === "ficcion" ? "bg-accent text-white border-accent" : "bg-white text-value"}`}
              >
                Ficción
              </button>
              <button
                type="button"
                onClick={() => setFictionFilter(fictionFilter === "no-ficcion" ? "" : "no-ficcion")}
                className={`px-3 py-1.5 text-xs font-medium rounded-r-lg border border-l-0 border-card-border transition-colors ${fictionFilter === "no-ficcion" ? "bg-accent text-white border-accent" : "bg-white text-value"}`}
              >
                No ficc.
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-label">Tipo</span>
            <select
              value={bookTypeFilter}
              onChange={(e) => setBookTypeFilter(e.target.value)}
              className="bg-white border border-card-border rounded-lg px-3 pr-8 py-1.5 text-xs text-value"
            >
              <option value="">Todos</option>
              <option value="novela">Novela</option>
              <option value="cuentos">Cuentos</option>
              <option value="ensayo">Ensayo</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-label">Año lectura</span>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="bg-white border border-card-border rounded-lg px-3 pr-8 py-1.5 text-xs text-value"
            >
              <option value="">Todos</option>
              {readYears.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-label">Primera edición</span>
            <select
              value={editionFilter}
              onChange={(e) => setEditionFilter(e.target.value)}
              className="bg-white border border-card-border rounded-lg px-3 pr-8 py-1.5 text-xs text-value"
            >
              <option value="">Todos</option>
              {editionYears.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-label">Calificación</span>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="bg-white border border-card-border rounded-lg px-3 pr-8 py-1.5 text-xs text-value"
            >
              <option value="">Todas</option>
              <option value="preferido">Preferido</option>
              <option value="muy bueno">Muy bueno</option>
              <option value="bueno">Bueno</option>
              <option value="más o menos">Más o menos</option>
              <option value="malo">Malo</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-label">Etiqueta</span>
            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="bg-white border border-card-border rounded-lg px-3 pr-8 py-1.5 text-xs text-value"
            >
              <option value="">Todas</option>
              {allTags.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-label">Ordenar por</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-white border border-card-border rounded-lg px-3 pr-8 py-1.5 text-xs text-value"
            >
              <option value="name-asc">Nombre A → Z</option>
              <option value="name-desc">Nombre Z → A</option>
              <option value="read-desc">Última lectura ↓</option>
              <option value="read-asc">Última lectura ↑</option>
              <option value="rating">Calificación</option>
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <>
            <hr className="border-card-border my-4" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-label">Activos:</span>
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map((f) => (
                    <span
                      key={f.label}
                      className="bg-accent text-white text-xs font-medium rounded-full px-3 py-1 flex items-center gap-1.5"
                    >
                      {f.label}
                      <button type="button" onClick={f.clear} className="hover:opacity-70">×</button>
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-tag underline hover:opacity-70"
              >
                Limpiar todo
              </button>
            </div>
          </>
        )}
      </div>

      <section className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-4">
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
