"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Author } from "@/types/author";
import type { Country } from "@/types/country";

type AuthorsListProps = {
  authors: Author[];
  countrys: Country[];
};

type SortOption = "name-asc" | "name-desc" | "birthday-asc" | "birthday-desc";

export default function AuthorsList({ authors, countrys }: AuthorsListProps) {
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");

  const filtered = useMemo(() => {
    let result = authors.filter((a) => {
      if (countryFilter) {
        const countryName = countrys.find((c) => c.id === Number(countryFilter))?.name;
        if (countryName && !a.countries?.includes(countryName)) return false;
      }
      if (genderFilter && a.gender !== genderFilter) return false;
      if (search) {
        const fullName = `${a.name} ${a.lastname ?? ""}`.toLowerCase();
        if (!fullName.includes(search.toLowerCase())) return false;
      }
      return true;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case "name-asc": return `${a.name} ${a.lastname ?? ""}`.localeCompare(`${b.name} ${b.lastname ?? ""}`);
        case "name-desc": return `${b.name} ${b.lastname ?? ""}`.localeCompare(`${a.name} ${a.lastname ?? ""}`);
        case "birthday-asc": return (a.birthday ?? 9999) - (b.birthday ?? 9999);
        case "birthday-desc": return (b.birthday ?? 0) - (a.birthday ?? 0);
        default: return 0;
      }
    });

    return result;
  }, [authors, countryFilter, genderFilter, search, sortBy, countrys]);

  return (
    <>
      <div className="bg-card-bg border border-card-border rounded-xl p-6 mb-6 flex items-center gap-6">
        <div className="shrink-0">
          <p className="text-xs font-medium uppercase tracking-wide text-label">Total</p>
          <p className="text-3xl font-bold text-title mt-1">{authors.length}</p>
        </div>
        <div className="relative flex-1">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar autor..."
            className="w-full bg-white border border-card-border rounded-xl pl-11 pr-5 py-3 text-sm"
          />
        </div>
      </div>

      <div className="bg-card-bg border border-card-border rounded-xl p-6 mb-8">
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-label">País</span>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="bg-white border border-card-border rounded-lg px-3 pr-8 py-1.5 text-xs text-value"
            >
              <option value="">Todos los países</option>
              {countrys.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-label">Género</span>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="bg-white border border-card-border rounded-lg px-3 pr-8 py-1.5 text-xs text-value"
            >
              <option value="">Todos los géneros</option>
              <option value="mujer">Mujer</option>
              <option value="hombre">Hombre</option>
              <option value="no definido">No definido</option>
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
              <option value="birthday-asc">Nacimiento ↑</option>
              <option value="birthday-desc">Nacimiento ↓</option>
            </select>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((author) => (
          <Link
            key={author.id}
            href={`/authors/${author.id}`}
            className="bg-card-bg border border-card-border rounded-xl p-4 flex flex-col gap-2 hover:border-accent/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              {author.photo ? (
                <img
                  src={author.photo}
                  alt={author.name}
                  className="w-10 h-10 rounded-full object-cover border border-card-border"
                />
              ) : (
                <div className="w-10 h-10 rounded-full border border-card-border bg-white flex items-center justify-center text-muted text-sm font-medium">
                  {author.name.charAt(0)}
                </div>
              )}
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-title leading-tight">
                  {author.name} {author.lastname}
                </h3>
                <p className="text-xs text-tag">
                  {author.countries}
                </p>
              </div>
            </div>

            <p className="text-xs text-muted mt-auto">
              {author.birthday && (
                <>
                  {author.birthday}
                  {author.death ? ` – ${author.death}` : ""}
                </>
              )}
            </p>
          </Link>
        ))}
      </section>

      {filtered.length === 0 && (
        <p className="text-muted text-sm mt-4">No se encontraron autores.</p>
      )}
    </>
  );
}
