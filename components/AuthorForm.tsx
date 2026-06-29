"use client";

import { useState } from "react";
import { createAuthorAction } from "@/app/authors/new/actions";
import type { Country } from "@/types/country";

type AuthorFormProps = {
  countrys: Country[];
  returnTo?: string;
};

export default function AuthorForm({ countrys, returnTo }: AuthorFormProps) {
  const [selectedCountries, setSelectedCountries] = useState<number[]>([]);

  return (
    <form
      action={async (formData) => {
        for (const cid of selectedCountries) {
          formData.append("country_ids", String(cid));
        }
        await createAuthorAction(formData);
      }}
      className="flex flex-col gap-5"
    >
      {returnTo && <input type="hidden" name="returnTo" value={returnTo} />}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm text-muted">
          Nombre *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="lastname" className="text-sm text-muted">
          Apellido
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="birthday" className="text-sm text-muted">
            Año de nacimiento
          </label>
          <input
            type="number"
            id="birthday"
            name="birthday"
            className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="death" className="text-sm text-muted">
            Año de defunción
          </label>
          <input
            type="number"
            id="death"
            name="death"
            className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-muted">Países *</label>
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
            className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm"
          >
            <option value="">Agregar país...</option>
            {countrys
              .filter((c) => !selectedCountries.includes(c.id))
              .map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="city" className="text-sm text-muted">
            Ciudad
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="gender" className="text-sm text-muted">
            Género
          </label>
          <select
            id="gender"
            name="gender"
            defaultValue="no definido"
            className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm"
          >
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
            <option value="no definido">No definido</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="nobel_prize" className="text-sm text-muted">
            Premio Nobel (año)
          </label>
          <input
            type="number"
            id="nobel_prize"
            name="nobel_prize"
            className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="photo" className="text-sm text-muted">
          Foto (URL)
        </label>
        <input
          type="url"
          id="photo"
          name="photo"
          className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={selectedCountries.length === 0}
        className="mt-4 bg-accent text-white rounded-lg px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Guardar autor
      </button>
    </form>
  );
}
