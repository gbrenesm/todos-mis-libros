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
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar editorial..."
        className="w-full bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((e) => (
          <Link
            key={e.id}
            href={`/editorials/${e.id}`}
            className="p-5 bg-card-bg border border-card-border rounded-lg flex items-center justify-between gap-4 hover:border-accent/40 transition-colors"
          >
            <div>
              <h3 className="font-semibold">{e.name}</h3>
              <p className="text-sm text-muted mt-1">{e.country}</p>
            </div>
            {e.last_cover ? (
              <img
                src={e.last_cover}
                alt={e.name}
                className="w-14 h-20 object-cover rounded shrink-0"
              />
            ) : (
              <div className="w-14 h-20 bg-card-border rounded shrink-0 flex items-center justify-center">
                <svg className="w-5 h-5 opacity-40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zM4 18V6h7v12H4zm9 0V6h7v12h-7z" />
                </svg>
              </div>
            )}
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-muted text-sm mt-4">No se encontraron editoriales.</p>
      )}
    </>
  );
}
