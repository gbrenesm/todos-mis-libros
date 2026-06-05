"use client";

import { useState } from "react";
import { createBookAction } from "@/app/books/new/actions";

type Editorial = {
  id: string;
  name: string;
};

type Author = {
  id: string;
  name: string;
  lastname: string | null;
};

type BookFormProps = {
  editorials: Editorial[];
  authors: Author[];
};

export default function BookForm({ editorials, authors }: BookFormProps) {
  const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);
  const [authorSearch, setAuthorSearch] = useState("");

  const filteredAuthors = authors.filter((a) => {
    const fullName = `${a.name} ${a.lastname ?? ""}`.toLowerCase();
    return (
      fullName.includes(authorSearch.toLowerCase()) &&
      !selectedAuthors.some((s) => s.id === a.id)
    );
  });

  function addAuthor(author: Author) {
    setSelectedAuthors([...selectedAuthors, author]);
    setAuthorSearch("");
  }

  function removeAuthor(id: string) {
    setSelectedAuthors(selectedAuthors.filter((a) => a.id !== id));
  }

  return (
    <form action={createBookAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm text-muted">
          Título *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="year" className="text-sm text-muted">
            Año de publicación *
          </label>
          <input
            type="number"
            id="year"
            name="year"
            required
            className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="purchased_date" className="text-sm text-muted">
            Año de compra
          </label>
          <input
            type="number"
            id="purchased_date"
            name="purchased_date"
            className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="editorial_id" className="text-sm text-muted">
            Editorial *
          </label>
          <select
            id="editorial_id"
            name="editorial_id"
            required
            className="bg-card-bg border border-card-border rounded-lg px-5 pr-10 py-3 text-sm"
          >
            <option value="">Seleccionar</option>
            {editorials.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-muted">Autor(es) *</label>

          {selectedAuthors.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedAuthors.map((a) => (
                <span
                  key={a.id}
                  className="bg-accent text-white text-xs rounded-full px-3 py-1 flex items-center gap-1"
                >
                  {a.name} {a.lastname}
                  <button
                    type="button"
                    onClick={() => removeAuthor(a.id)}
                    className="ml-1 hover:opacity-70"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="relative">
            <input
              type="text"
              value={authorSearch}
              onChange={(e) => setAuthorSearch(e.target.value)}
              placeholder="Buscar autor..."
              className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm w-full"
            />
            {authorSearch && filteredAuthors.length > 0 && (
              <ul className="absolute z-10 top-full left-0 right-0 mt-1 bg-card-bg border border-card-border rounded-lg max-h-40 overflow-y-auto">
                {filteredAuthors.map((a) => (
                  <li key={a.id}>
                    <button
                      type="button"
                      onClick={() => addAuthor(a)}
                      className="w-full text-left px-5 py-2 text-sm hover:bg-accent hover:text-white transition-colors"
                    >
                      {a.name} {a.lastname}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedAuthors.map((a) => (
            <input key={a.id} type="hidden" name="author_ids" value={a.id} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="status" className="text-sm text-muted">
            Estado
          </label>
          <select
            id="status"
            name="status"
            defaultValue="por leer"
            className="bg-card-bg border border-card-border rounded-lg px-5 pr-10 py-3 text-sm"
          >
            <option value="por leer">Por leer</option>
            <option value="leyendo">Leyendo</option>
            <option value="leído">Leído</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="rating" className="text-sm text-muted">
            Calificación
          </label>
          <select
            id="rating"
            name="rating"
            defaultValue="bueno"
            className="bg-card-bg border border-card-border rounded-lg px-5 pr-10 py-3 text-sm"
          >
            <option value="preferido">Preferido</option>
            <option value="muy bueno">Muy bueno</option>
            <option value="bueno">Bueno</option>
            <option value="más o menos">Más o menos</option>
            <option value="malo">Malo</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="format" className="text-sm text-muted">
            Formato
          </label>
          <select
            id="format"
            name="format"
            defaultValue="físico"
            className="bg-card-bg border border-card-border rounded-lg px-5 pr-10 py-3 text-sm"
          >
            <option value="físico">Físico</option>
            <option value="digital">Digital</option>
            <option value="audiolibro">Audiolibro</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="reading_times" className="text-sm text-muted">
            Veces leído
          </label>
          <input
            type="number"
            id="reading_times"
            name="reading_times"
            defaultValue={0}
            min={0}
            className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="read_date" className="text-sm text-muted">
            Fechas de lectura
          </label>
          <input
            type="text"
            id="read_date"
            name="read_date"
            placeholder="2023-06, 2025-01"
            className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm"
          />
          <span className="text-xs text-muted">Separadas por coma</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="fiction" className="text-sm text-muted">
            Ficción
          </label>
          <select
            id="fiction"
            name="fiction"
            defaultValue="true"
            className="bg-card-bg border border-card-border rounded-lg px-5 pr-10 py-3 text-sm"
          >
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="in_library" className="text-sm text-muted">
            En biblioteca
          </label>
          <select
            id="in_library"
            name="in_library"
            defaultValue="true"
            className="bg-card-bg border border-card-border rounded-lg px-5 pr-10 py-3 text-sm"
          >
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="cover" className="text-sm text-muted">
          Portada (URL)
        </label>
        <input
          type="url"
          id="cover"
          name="cover"
          className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm"
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-accent text-white rounded-lg px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Guardar libro
      </button>
    </form>
  );
}
