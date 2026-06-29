"use client";

import { useState } from "react";
import Link from "next/link";
import type { Editorial } from "@/types/editorial";

type Props = {
  editorials: Editorial[];
};

export default function EditorialsList({ editorials }: Props) {
  const [search, setSearch] = useState("");

  const filtered = editorials.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="bg-card-bg border border-card-border rounded-xl p-6 mb-8 flex items-center gap-6">
        <div className="shrink-0">
          <p className="text-xs font-medium uppercase tracking-wide text-label">Total</p>
          <p className="text-3xl font-bold text-title mt-1">{editorials.length}</p>
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
            placeholder="Buscar editorial..."
            className="w-full bg-white border border-card-border rounded-xl pl-11 pr-5 py-3 text-sm"
          />
        </div>
      </div>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((e) => (
          <Link
            key={e.id}
            href={`/editorials/${e.id}`}
            className="bg-card-bg border border-card-border rounded-xl p-4 flex flex-col gap-3 hover:border-accent/40 transition-colors"
          >
            {e.last_cover ? (
              <img
                src={e.last_cover}
                alt={e.name}
                className="w-full aspect-3/4 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full aspect-3/4 bg-white border border-card-border rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 opacity-30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zM4 18V6h7v12H4zm9 0V6h7v12h-7z" />
                </svg>
              </div>
            )}
            <div>
              <h3 className="text-sm font-semibold text-title">{e.name}</h3>
              <p className="text-xs text-tag">{e.country}</p>
            </div>
          </Link>
        ))}
      </section>

      {filtered.length === 0 && (
        <p className="text-muted text-sm mt-4">No se encontraron editoriales.</p>
      )}
    </>
  );
}
