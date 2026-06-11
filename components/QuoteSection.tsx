"use client";

import { useState } from "react";
import { createQuoteAction, updateQuoteAction } from "@/app/books/[id]/actions";
import type { Quote } from "@/types/quote";

type Props = {
  bookId: string;
  quotes: Quote[];
};

export default function QuoteSection({ bookId, quotes }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

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
                página(s)
              </label>
              <input
                type="text"
                id="pages"
                name="pages"
                placeholder="42"
                className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="libreta" className="text-sm text-muted">
                en libreta
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
        {quotes.map((q) =>
          editingId === q.id ? (
            <QuoteEditForm
              key={q.id}
              quote={q}
              bookId={bookId}
              onDone={() => setEditingId(null)}
            />
          ) : (
            <div
              key={q.id}
              className="p-5 rounded-lg text-white"
              style={{ backgroundColor: "#68B0AB" }}
            >
              <div className="flex justify-between items-start gap-4">
                <p className="font-handwritten text-base leading-relaxed flex-1">
                  "{q.quote}"
                </p>
                <button
                  type="button"
                  onClick={() => setEditingId(q.id)}
                  className="shrink-0 text-white/70 hover:text-white transition-colors"
                  aria-label="Editar cita"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </button>
              </div>
              <div className="flex gap-4 mt-3 text-xs text-white/70">
                {q.pages && <span>Página {q.pages}</span>}
                {q.libreta && <span>En libreta</span>}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

function QuoteEditForm({ quote, bookId, onDone }: { quote: Quote; bookId: string; onDone: () => void }) {
  return (
    <form
      action={async (formData) => {
        await updateQuoteAction(formData);
        onDone();
      }}
      className="p-5 bg-card-bg border border-accent/30 rounded-lg flex flex-col gap-3"
    >
      <input type="hidden" name="quote_id" value={quote.id} />
      <input type="hidden" name="book_id" value={bookId} />

      <textarea
        name="quote"
        defaultValue={quote.quote}
        required
        rows={3}
        className="bg-white border border-card-border rounded-lg px-4 py-2 text-sm resize-y"
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted">Página</label>
          <input
            type="text"
            name="pages"
            defaultValue={quote.pages || ""}
            className="bg-white border border-card-border rounded-lg px-4 py-2 text-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted">En libreta</label>
          <select
            name="libreta"
            defaultValue={String(quote.libreta)}
            className="bg-white border border-card-border rounded-lg px-4 pr-10 py-2 text-sm"
          >
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-accent text-white rounded-lg px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onDone}
          className="border border-card-border rounded-lg px-5 py-2 text-sm font-medium hover:opacity-70 transition-opacity"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
