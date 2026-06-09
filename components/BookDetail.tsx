"use client";

import { useState } from "react";
import { updateBookAction } from "@/app/books/[id]/actions";

type BookData = {
  id: string;
  name: string;
  year: number;
  read_date: string[] | null;
  status: string;
  rating: string;
  format: string;
  reading_times: number;
  purchased_date: number | null;
  fiction: boolean;
  in_library: boolean;
  cover: string | null;
  editorial: string;
  authors: string;
  tags: string | null;
};

export default function BookDetail({ book }: { book: BookData }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <form
        action={async (formData) => {
          await updateBookAction(formData);
          setEditing(false);
        }}
        className="flex flex-col gap-4 flex-1"
      >
        <input type="hidden" name="id" value={book.id} />

        <div className="flex items-start justify-between">
          <input
            type="text"
            name="name"
            defaultValue={book.name}
            required
            className="text-3xl font-bold bg-card-bg border border-card-border rounded-lg px-4 py-2 flex-1 mr-4"
          />
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

        <p className="text-muted text-lg">{book.authors}</p>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-4 text-sm">
          <Field label="Año" name="year" type="number" defaultValue={String(book.year)} />
          <Field label="Año de compra" name="purchased_date" type="number" defaultValue={book.purchased_date ? String(book.purchased_date) : ""} />

          <SelectField label="Estado" name="status" defaultValue={book.status} options={[
            { value: "por leer", label: "Por leer" },
            { value: "leyendo", label: "Leyendo" },
            { value: "leído", label: "Leído" },
          ]} />
          <SelectField label="Calificación" name="rating" defaultValue={book.rating} options={[
            { value: "preferido", label: "Preferido" },
            { value: "muy bueno", label: "Muy bueno" },
            { value: "bueno", label: "Bueno" },
            { value: "más o menos", label: "Más o menos" },
            { value: "malo", label: "Malo" },
          ]} />
          <SelectField label="Formato" name="format" defaultValue={book.format} options={[
            { value: "físico", label: "Físico" },
            { value: "digital", label: "Digital" },
            { value: "audiolibro", label: "Audiolibro" },
          ]} />
          <Field label="Veces leído" name="reading_times" type="number" defaultValue={String(book.reading_times)} />
          <SelectField label="Ficción" name="fiction" defaultValue={String(book.fiction)} options={[
            { value: "true", label: "Sí" },
            { value: "false", label: "No" },
          ]} />
          <SelectField label="En biblioteca" name="in_library" defaultValue={String(book.in_library)} options={[
            { value: "true", label: "Sí" },
            { value: "false", label: "No" },
          ]} />
          <div className="col-span-2">
            <Field
              label="Fechas de lectura"
              name="read_date"
              type="text"
              defaultValue={book.read_date ? book.read_date.join(", ") : ""}
              placeholder="2023-06, 2025-01"
            />
          </div>
          <div className="col-span-2">
            <Field label="Portada (URL)" name="cover" type="url" defaultValue={book.cover || ""} />
          </div>
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-bold">{book.name}</h1>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="bg-accent text-white rounded-lg px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Editar
        </button>
      </div>
      <p className="text-muted text-lg">{book.authors}</p>

      <div className="grid grid-cols-2 gap-x-10 gap-y-3 mt-4 text-sm">
        <Detail label="Editorial" value={book.editorial} />
        <Detail label="Año" value={String(book.year)} />
        <Detail label="Estado" value={book.status} />
        <Detail label="Calificación" value={book.rating} />
        <Detail label="Formato" value={book.format} />
        <Detail label="Veces leído" value={String(book.reading_times)} />
        <Detail label="Ficción" value={book.fiction ? "Sí" : "No"} />
        <Detail label="En biblioteca" value={book.in_library ? "Sí" : "No"} />
        {book.purchased_date && (
          <Detail label="Año de compra" value={String(book.purchased_date)} />
        )}
        {book.read_date && book.read_date.length > 0 && (
          <Detail label="Fechas de lectura" value={book.read_date.join(", ")} />
        )}
      </div>

      {book.tags && (
        <div className="flex flex-wrap gap-2 mt-4">
          {book.tags.split(", ").map((tag) => (
            <span
              key={tag}
              className="bg-accent text-white text-xs rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-muted">{label}:</span>{" "}
      <span className="font-medium">{value}</span>
    </div>
  );
}

function Field({ label, name, type, defaultValue, placeholder }: {
  label: string; name: string; type: string; defaultValue: string; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm text-muted">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="bg-card-bg border border-card-border rounded-lg px-4 py-2 text-sm"
      />
    </div>
  );
}

function SelectField({ label, name, defaultValue, options }: {
  label: string; name: string; defaultValue: string; options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm text-muted">{label}</label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="bg-card-bg border border-card-border rounded-lg px-4 pr-10 py-2 text-sm"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
