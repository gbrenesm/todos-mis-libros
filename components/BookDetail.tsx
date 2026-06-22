"use client";

import { useState } from "react";
import Link from "next/link";
import { updateBookAction, deleteBookAction } from "@/app/books/[id]/actions";
import PencilIcon from "@/components/PencilIcon";

type BookDetailData = {
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
  has_stories: boolean;
  purchased_from: string | null;
  cover: string | null;
  editorial: string;
  authors: string;
  author_id: string | null;
  tags: string | null;
};

function ratingStars(rating: string) {
  const map: Record<string, number> = {
    preferido: 5,
    "muy bueno": 4,
    bueno: 3,
    "más o menos": 2,
    malo: 1,
  };
  const stars = map[rating] ?? 0;
  return "★".repeat(stars) + "☆".repeat(5 - stars);
}

export default function BookDetail({ book }: { book: BookDetailData }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div className="flex flex-col gap-4 flex-1">
      <form
        action={async (formData) => {
          await updateBookAction(formData);
          setEditing(false);
        }}
        className="flex flex-col gap-4"
      >
        <input type="hidden" name="id" value={book.id} />

        <div className="flex items-start justify-between">
          <input
            type="text"
            name="name"
            defaultValue={book.name}
            required
            className="text-2xl font-bold bg-white border border-card-border rounded-lg px-4 py-2 flex-1 mr-4"
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
          <Field label="Primera edición" name="year" type="number" defaultValue={String(book.year)} />
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
          <SelectField label="Cuentos o relatos" name="has_stories" defaultValue={String(book.has_stories)} options={[
            { value: "true", label: "Sí" },
            { value: "false", label: "No" },
          ]} />
          <Field label="Comprado en o regalado por" name="purchased_from" type="text" defaultValue={book.purchased_from || ""} />
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
            <Field label="Tags" name="tags" type="text" defaultValue={book.tags || ""} placeholder="ficción, latinoamérica" />
          </div>
          <div className="col-span-2">
            <Field label="Portada (URL)" name="cover" type="url" defaultValue={book.cover || ""} />
          </div>
        </div>
      </form>

      <div className="mt-6 pt-4 border-t border-card-border">
        <form action={deleteBookAction}>
          <input type="hidden" name="id" value={book.id} />
          <button
            type="submit"
            onClick={(e) => {
              if (!confirm("¿Estás seguro de que quieres eliminar este libro?")) {
                e.preventDefault();
              }
            }}
            className="text-red-600 text-sm font-medium hover:text-red-800 transition-colors"
          >
            Eliminar libro
          </button>
        </form>
      </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 flex-1">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-bold text-title">{book.name}</h1>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="bg-accent text-white rounded-md p-2 hover:opacity-90 transition-opacity"
          aria-label="Editar libro"
        >
          <PencilIcon />
        </button>
      </div>

      {book.author_id ? (
        <Link href={`/authors/${book.author_id}`} className="text-label text-sm underline hover:opacity-80 transition-opacity">
          {book.authors}
        </Link>
      ) : (
        <p className="text-label text-sm">{book.authors}</p>
      )}

      <div className="grid grid-cols-2 gap-x-10 gap-y-3 mt-4 text-sm">
        <Detail label="EDITORIAL" value={book.editorial} />
        <Detail label="PRIMERA EDICIÓN" value={String(book.year)} />
        <Detail label="ESTADO" value={book.status} />
        <Detail label="CALIFICACIÓN" value={`${ratingStars(book.rating)} ${book.rating}`} />
        <Detail label="FORMATO" value={book.format} />
        <Detail label="VECES LEÍDO" value={String(book.reading_times)} />
        <Detail label="FICCIÓN" value={book.fiction ? "Sí" : "No"} />
        <Detail label="EN BIBLIOTECA" value={book.in_library ? "Sí" : "No"} />
        {book.has_stories && <Detail label="CUENTOS O RELATOS" value="Sí" />}
        {book.purchased_date && (
          <Detail label="AÑO DE COMPRA" value={String(book.purchased_date)} />
        )}
        {book.purchased_from && (
          <Detail label="COMPRADO EN" value={book.purchased_from} />
        )}
        {book.read_date && book.read_date.length > 0 && (
          <Detail label="FECHAS DE LECTURA" value={book.read_date.join(", ")} />
        )}
      </div>

      {book.tags && (
        <div className="flex flex-wrap gap-2 mt-4">
          {book.tags.split(", ").map((tag) => (
            <span
              key={tag}
              className="bg-tag text-tag-text text-xs rounded-full px-3 py-1"
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
    <div className="flex flex-col gap-0.5">
      <span className="text-label text-xs font-medium tracking-wide">{label}</span>
      <span className="text-sm text-value">{value}</span>
    </div>
  );
}

function Field({ label, name, type, defaultValue, placeholder }: {
  label: string; name: string; type: string; defaultValue: string; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-xs text-label font-medium uppercase tracking-wide">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="bg-white border border-card-border rounded-lg px-4 py-2 text-sm"
      />
    </div>
  );
}

function SelectField({ label, name, defaultValue, options }: {
  label: string; name: string; defaultValue: string; options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-xs text-label font-medium uppercase tracking-wide">{label}</label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="bg-white border border-card-border rounded-lg px-4 pr-10 py-2 text-sm"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
