"use client";

import { useState } from "react";
import { createQuoteAction } from "@/app/books/[id]/actions";
import type { Quote } from "@/types/quote";

type Props = {
  bookId: string;
  quotes: Quote[];
};

export default function QuoteSection({ bookId, quotes }: Props) {
  const [showForm, setShowForm] = useState(false);

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Citas</h2>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="bg-accent text-white rounded-lg px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {showForm ? "Cancelar" : "Agregar cita"}
        </button>
      </div>

      {showForm && (
        <form
          action={async (formData) => {
            await createQuoteAction(formData);
            setShowForm(false);
          }}
          className="flex flex-col gap-4 mb-8 p-6 bg-card-bg border border-card-border rounded-lg"
        >
          <input type="hidden" name="book_id" value={bookId} />

          <div className="flex flex-col gap-1">
            <label htmlFor="quote" className="text-sm text-muted">
              Cita *
            </label>
            <textarea
              id="quote"
              name="quote"
              required
              rows={4}
              className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm resize-y"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="pages" className="text-sm text-muted">
                Páginas
              </label>
              <input
                type="text"
                id="pages"
                name="pages"
                placeholder="p. 42"
                className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="libreta" className="text-sm text-muted">
                En libreta
              </label>
              <select
                id="libreta"
                name="libreta"
                defaultValue="false"
                className="bg-card-bg border border-card-border rounded-lg px-5 pr-10 py-3 text-sm"
              >
                <option value="false">No</option>
                <option value="true">Sí</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 bg-accent text-white rounded-lg px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity self-start"
          >
            Guardar cita
          </button>
        </form>
      )}

      {quotes.length === 0 && !showForm && (
        <p className="text-muted text-sm">No hay citas aún.</p>
      )}

      <div className="flex flex-col gap-4">
        {quotes.map((q) => (
          <div
            key={q.id}
            className="p-5 bg-card-bg border border-card-border rounded-lg"
          >
            <p className="italic leading-relaxed">"{q.quote}"</p>
            <div className="flex gap-4 mt-3 text-xs text-muted">
              {q.pages && <span>{q.pages}</span>}
              {q.libreta && <span>En libreta</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
