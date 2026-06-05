"use client";

import { createAuthorAction } from "@/app/authors/new/actions";

type Country = {
  id: number;
  name: string;
  continent: string;
};

type AuthorFormProps = {
  countrys: Country[];
};

export default function AuthorForm({ countrys }: AuthorFormProps) {
  return (
    <form action={createAuthorAction} className="flex flex-col gap-5">
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

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="country_id" className="text-sm text-muted">
            País *
          </label>
          <select
            id="country_id"
            name="country_id"
            required
            className="bg-card-bg border border-card-border rounded-lg px-5 py-3 text-sm"
          >
            <option value="">Seleccionar</option>
            {countrys.map((country) => (
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
        className="mt-4 bg-accent text-white rounded-lg px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Guardar autor
      </button>
    </form>
  );
}
