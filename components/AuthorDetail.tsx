"use client";

import { useState } from "react";
import { updateAuthorAction } from "@/app/authors/[id]/actions";

type AuthorData = {
  id: string;
  name: string;
  lastname: string | null;
  birthday: number | null;
  death: number | null;
  gender: "mujer" | "hombre" | "no definido";
  nobel_prize: number | null;
  photo: string | null;
  city: string | null;
  country_id: number;
  country: string;
};

type Country = {
  id: number;
  name: string;
};

type Props = {
  author: AuthorData;
  countrys: Country[];
};

export default function AuthorDetail({ author, countrys }: Props) {
  const [editing, setEditing] = useState(false);
  const fullName = `${author.name} ${author.lastname ?? ""}`.trim();

  if (editing) {
    return (
      <form
        action={async (formData) => {
          await updateAuthorAction(formData);
          setEditing(false);
        }}
        className="flex flex-col gap-4"
      >
        <input type="hidden" name="id" value={author.id} />

        <div className="flex items-start justify-between">
          <div className="flex gap-3 flex-1 mr-4">
            <input
              type="text"
              name="name"
              defaultValue={author.name}
              required
              placeholder="Nombre"
              className="text-2xl font-handwritten bg-card-bg border border-card-border rounded-lg px-4 py-2 flex-1"
            />
            <input
              type="text"
              name="lastname"
              defaultValue={author.lastname || ""}
              placeholder="Apellido"
              className="text-2xl font-handwritten bg-card-bg border border-card-border rounded-lg px-4 py-2 flex-1"
            />
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
              onClick={() => setEditing(false)}
              className="border border-card-border rounded-lg px-5 py-2 text-sm font-medium hover:opacity-70 transition-opacity"
            >
              Cancelar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm mt-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">País</label>
            <select
              name="country_id"
              defaultValue={author.country_id}
              className="bg-card-bg border border-card-border rounded-lg px-4 pr-10 py-2 text-sm"
            >
              {countrys.map((c) => (
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
      </form>
    );
  }

  return (
    <div className="flex flex-col gap-3 flex-1">
      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-handwritten">{fullName}</h1>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="bg-accent text-white rounded-lg px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          Editar
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm mt-2">
        <div>
          <span className="text-muted">País:</span>{" "}
          <span className="font-handwritten text-base">{author.country}</span>
        </div>
        {author.city && (
          <div>
            <span className="text-muted">Ciudad:</span>{" "}
            <span className="font-handwritten text-base">{author.city}</span>
          </div>
        )}
        {author.birthday && (
          <div>
            <span className="text-muted">Nacimiento:</span>{" "}
            <span className="font-handwritten text-base">{author.birthday}</span>
          </div>
        )}
        {author.death && (
          <div>
            <span className="text-muted">Muerte:</span>{" "}
            <span className="font-handwritten text-base">{author.death}</span>
          </div>
        )}
        <div>
          <span className="text-muted">Género:</span>{" "}
          <span className="font-handwritten text-base">{author.gender}</span>
        </div>
        {author.nobel_prize && (
          <div>
            <span className="text-muted">Nobel:</span>{" "}
            <span className="font-handwritten text-base">{author.nobel_prize}</span>
          </div>
        )}
      </div>
    </div>
  );
}
