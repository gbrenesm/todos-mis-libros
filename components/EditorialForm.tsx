"use client";

import { createEditorialAction } from "@/app/editorials/new/actions";
import type { Country } from "@/types/country"; 

type EditorialFormProps = {
  countrys: Country[];
};

export default function EditorialForm({ countrys }: EditorialFormProps) {
  return (
    <form action={createEditorialAction} className="flex flex-col gap-5">
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
        <label htmlFor="country_id" className="text-sm text-muted">
          País *
        </label>
        <select
          id="country_id"
          name="country_id"
          required
          className="bg-card-bg border border-card-border rounded-lg px-5 pr-10 py-3 text-sm"
        >
          <option value="">Seleccionar</option>
          {countrys.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="mt-4 bg-accent text-white rounded-lg px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Guardar editorial
      </button>
    </form>
  );
}
