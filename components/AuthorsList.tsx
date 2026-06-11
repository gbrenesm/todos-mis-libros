"use client";

import { useState } from "react";
import type { Author } from "@/types/author";

type Country = {
  id: number;
  name: string;
};

type AuthorsListProps = {
  authors: Author[];
  countrys: Country[];
  countryMap: Record<number, string>;
};

export default function AuthorsList({ authors, countrys, countryMap }: AuthorsListProps) {
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  const filtered = authors.filter((a) => {
    if (countryFilter && a.country_id !== Number(countryFilter)) return false;
    if (genderFilter && a.gender !== genderFilter) return false;
    if (search) {
      const fullName = `${a.name} ${a.lastname ?? ""}`.toLowerCase();
      if (!fullName.includes(search.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar autor..."
        className="w-full bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm mb-4"
      />

      <div className="flex gap-4 mb-6">
        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="bg-card-bg border border-card-border rounded-lg px-5 pr-10 py-3 text-sm"
        >
          <option value="">Todos los países</option>
          {countrys.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>

        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="bg-card-bg border border-card-border rounded-lg px-5 pr-10 py-3 text-sm"
        >
          <option value="">Todos los géneros</option>
          <option value="mujer">Mujer</option>
          <option value="hombre">Hombre</option>
          <option value="no definido">No definido</option>
        </select>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((author) => (
          <div
            key={author.id}
            className="bg-card-bg border border-card-border rounded-xl p-4 flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              {author.photo ? (
                <img
                  src={author.photo}
                  alt={author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold text-lg">
                  {author.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="text-sm font-semibold">
                  {author.name} {author.lastname}
                </h3>
                <p className="text-xs text-muted">
                  {countryMap[author.country_id]}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-muted mt-1">
              {author.birthday && (
                <span>
                  {author.birthday}
                  {author.death ? ` – ${author.death}` : ""}
                </span>
              )}
              {author.nobel_prize && <span>Nobel {author.nobel_prize}</span>}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
