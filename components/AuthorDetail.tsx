"use client";

import { useState } from "react";
import { updateAuthorAction, deleteAuthorAction } from "@/app/authors/[id]/actions";
import PencilIcon from "@/components/PencilIcon";
import type { Author } from "@/types/author";
import type { Country } from "@/types/country";

type Props = {
  author: Author;
  countrys: Country[];
  countryIds: number[];
};

export default function AuthorDetail({ author, countrys, countryIds }: Props) {
  const [editing, setEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<number[]>(countryIds);
  const fullName = `${author.name} ${author.lastname ?? ""}`.trim();

  if (editing) {
    return (
      <>
      <form
        action={async (formData) => {
          for (const cid of selectedCountries) {
            formData.append("country_ids", String(cid));
          }
          await updateAuthorAction(formData);
          setEditing(false);
        }}
        className="flex flex-col gap-4 flex-1 min-w-0"
      >
        <input type="hidden" name="id" value={author.id} />

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex gap-3 flex-1 min-w-0">
            <input
              type="text"
              name="name"
              defaultValue={author.name}
              required
              placeholder="Nombre"
              className="text-lg font-bold bg-card-bg border border-card-border rounded-lg px-4 py-2 flex-1 min-w-0"
            />
            <input
              type="text"
              name="lastname"
              defaultValue={author.lastname || ""}
              placeholder="Apellido"
              className="text-lg font-bold bg-card-bg border border-card-border rounded-lg px-4 py-2 flex-1 min-w-0"
            />
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              type="submit"
              className="bg-accent text-white rounded-lg px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="border border-card-border rounded-lg px-5 py-2 text-sm font-medium hover:opacity-70 transition-opacity"
            >
              Cancelar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm mt-2">
          <div className="col-span-2 flex flex-col gap-2">
            <label className="text-xs text-muted">Países</label>
            <div className="flex flex-wrap gap-2">
              {selectedCountries.map((cid) => {
                const country = countrys.find((c) => c.id === cid);
                return (
                  <span key={cid} className="bg-tag text-tag-text text-xs rounded-full px-3 py-1 flex items-center gap-1">
                    {country?.name}
                    <button
                      type="button"
                      onClick={() => setSelectedCountries(selectedCountries.filter((id) => id !== cid))}
                      className="ml-1 hover:opacity-70"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
            <select
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val && !selectedCountries.includes(val)) {
                  setSelectedCountries([...selectedCountries, val]);
                }
                e.target.value = "";
              }}
              className="bg-card-bg border border-card-border rounded-lg px-4 pr-10 py-2 text-sm"
            >
              <option value="">Agregar país...</option>
              {countrys
                .filter((c) => !selectedCountries.includes(c.id))
                .map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">Ciudad</label>
            <input
              type="text"
              name="city"
              defaultValue={author.city || ""}
              className="bg-card-bg border border-card-border rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">Nacimiento</label>
            <input
              type="number"
              name="birthday"
              defaultValue={author.birthday || ""}
              className="bg-card-bg border border-card-border rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">Muerte</label>
            <input
              type="number"
              name="death"
              defaultValue={author.death || ""}
              className="bg-card-bg border border-card-border rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">Género</label>
            <select
              name="gender"
              defaultValue={author.gender}
              className="bg-card-bg border border-card-border rounded-lg px-4 pr-10 py-2 text-sm"
            >
              <option value="mujer">Mujer</option>
              <option value="hombre">Hombre</option>
              <option value="no definido">No definido</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">Nobel</label>
            <input
              type="number"
              name="nobel_prize"
              defaultValue={author.nobel_prize || ""}
              className="bg-card-bg border border-card-border rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            <label className="text-xs text-muted">Foto (URL)</label>
            <input
              type="url"
              name="photo"
              defaultValue={author.photo || ""}
              className="bg-card-bg border border-card-border rounded-lg px-4 py-2 text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="text-sm text-red-600 font-medium hover:text-red-700 transition-colors"
          >
            Eliminar autor
          </button>
        </div>

      </form>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-lg">
            <h3 className="text-lg font-bold text-title mb-2">Eliminar autor</h3>
            <p className="text-sm text-muted mb-6">
              ¿Estás seguro de que deseas eliminar a <strong>{fullName}</strong>? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="border border-card-border rounded-lg px-5 py-2 text-sm font-medium hover:opacity-70 transition-opacity"
              >
                Cancelar
              </button>
              <form action={deleteAuthorAction}>
                <input type="hidden" name="id" value={author.id} />
                <button
                  type="submit"
                  className="bg-red-600 text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Eliminar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
    );
  }

  return (
    <div className="flex flex-col gap-3 flex-1">
      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-bold text-title">{fullName}</h1>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="bg-accent text-white rounded-md p-2 hover:opacity-90 transition-opacity"
          aria-label="Editar autor"
        >
          <PencilIcon size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm mt-2">
        <div>
          <span className="text-label text-xs font-medium tracking-wide uppercase">PAÍS</span>
          <p className="text-value text-sm">{author.countries}</p>
        </div>
        {author.city && (
          <div>
            <span className="text-label text-xs font-medium tracking-wide uppercase">CIUDAD</span>
            <p className="text-value text-sm">{author.city}</p>
          </div>
        )}
        {author.birthday && (
          <div>
            <span className="text-label text-xs font-medium tracking-wide uppercase">NACIMIENTO</span>
            <p className="text-value text-sm">{author.birthday}</p>
          </div>
        )}
        {author.death && (
          <div>
            <span className="text-label text-xs font-medium tracking-wide uppercase">MUERTE</span>
            <p className="text-value text-sm">{author.death}</p>
          </div>
        )}
        <div>
          <span className="text-label text-xs font-medium tracking-wide uppercase">GÉNERO</span>
          <p className="text-value text-sm">{author.gender}</p>
        </div>
        {author.nobel_prize && (
          <div>
            <span className="text-label text-xs font-medium tracking-wide uppercase">NOBEL</span>
            <p className="text-value text-sm">{author.nobel_prize}</p>
          </div>
        )}
      </div>
    </div>
  );
}
