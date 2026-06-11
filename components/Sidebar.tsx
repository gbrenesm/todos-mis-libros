"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Libros" },
  { href: "/authors", label: "Autorxs" },
  { href: "/editorials", label: "Editoriales" },
  { href: "/maps", label: "Mapas" },
  { href: "/charts", label: "Gráficos" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="fixed top-0 left-0 z-40 h-full bg-muted text-white flex flex-col items-center py-4 w-12">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="hover:opacity-70 transition-opacity"
          aria-label="Menú"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-60 bg-muted text-white transform transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <span className="font-bold text-sm">Menú</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="hover:opacity-70 transition-opacity"
            aria-label="Cerrar menú"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
