"use client";

import { useState } from "react";
import { createStoryAction, updateStoryAction } from "@/app/books/[id]/actions";
import type { Story } from "@/types/story";

type Props = {
  bookId: string;
  storys: Story[];
};

export default function StorySection({ bookId, storys }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Cuentos / Relatos</h2>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="bg-accent text-white rounded-lg px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {showForm ? "Cancelar" : "Agregar cuento"}
        </button>
      </div>

      {showForm && (
        <form
          action={async (formData) => {
            await createStoryAction(formData);
            setShowForm(false);
          }}
          className="flex flex-col gap-4 mb-8 p-6 bg-card-bg border border-card-border rounded-lg"
        >
          <input type="hidden" name="book_id" value={bookId} />

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm text-muted">
              Nombre *
            </label>
            <input
              type="text"
              id="story-name"
              name="name"
              required
              className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-sm text-muted">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm resize-y"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="rating" className="text-sm text-muted">
              Calificación
            </label>
            <select
              id="story-rating"
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

          <button
            type="submit"
            className="mt-2 bg-accent text-white rounded-lg px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity self-start"
          >
            Guardar cuento
          </button>
        </form>
      )}

      {storys.length === 0 && !showForm && (
        <p className="text-muted text-sm">No hay cuentos aún.</p>
      )}

      <div className="flex flex-col gap-4">
        {storys.map((s) =>
          editingId === s.id ? (
            <StoryEditForm
              key={s.id}
              story={s}
              bookId={bookId}
              onDone={() => setEditingId(null)}
            />
          ) : (
            <div
              key={s.id}
              className="p-5 rounded-lg text-white"
              style={{ backgroundColor: "#8B5E83" }}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-base">{s.name}</h3>
                  {s.description && (
                    <p className="font-handwritten text-sm mt-2 leading-relaxed opacity-90">
                      {s.description}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setEditingId(s.id)}
                  className="shrink-0 text-white/70 hover:text-white transition-colors"
                  aria-label="Editar cuento"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </button>
              </div>
              <div className="mt-3 text-xs text-white/70">
                <span>{s.rating}</span>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

function StoryEditForm({ story, bookId, onDone }: { story: Story; bookId: string; onDone: () => void }) {
  return (
    <form
      action={async (formData) => {
        await updateStoryAction(formData);
        onDone();
      }}
      className="p-5 bg-card-bg border border-accent/30 rounded-lg flex flex-col gap-3"
    >
      <input type="hidden" name="story_id" value={story.id} />
      <input type="hidden" name="book_id" value={bookId} />

      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Nombre</label>
        <input
          type="text"
          name="name"
          defaultValue={story.name}
          required
          className="bg-white border border-card-border rounded-lg px-4 py-2 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Descripción</label>
        <textarea
          name="description"
          defaultValue={story.description || ""}
          rows={3}
          className="bg-white border border-card-border rounded-lg px-4 py-2 text-sm resize-y"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted">Calificación</label>
        <select
          name="rating"
          defaultValue={story.rating}
          className="bg-white border border-card-border rounded-lg px-4 pr-10 py-2 text-sm"
        >
          <option value="preferido">Preferido</option>
          <option value="muy bueno">Muy bueno</option>
          <option value="bueno">Bueno</option>
          <option value="más o menos">Más o menos</option>
          <option value="malo">Malo</option>
        </select>
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
