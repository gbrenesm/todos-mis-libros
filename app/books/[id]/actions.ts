"use server";

import { revalidatePath } from "next/cache";
import { createQuote, updateQuote } from "@/services/quotes";
import { updateBook } from "@/services/books";

export async function createQuoteAction(formData: FormData) {
  const bookId = formData.get("book_id") as string;
  const quote = formData.get("quote") as string;
  const pages = (formData.get("pages") as string) || null;
  const libreta = formData.get("libreta") === "true";

  await createQuote(bookId, quote, pages, libreta);
  revalidatePath(`/books/${bookId}`);
}

export async function updateBookAction(formData: FormData) {
  const id = formData.get("id") as string;
  const readDateRaw = formData.get("read_date") as string;
  const readDate = readDateRaw
    ? readDateRaw.split(",").map((d) => d.trim()).filter(Boolean)
    : [];

  await updateBook({
    id,
    name: formData.get("name") as string,
    year: Number(formData.get("year")),
    status: formData.get("status") as string,
    rating: formData.get("rating") as string,
    format: formData.get("format") as string,
    reading_times: Number(formData.get("reading_times")) || 0,
    purchased_date: formData.get("purchased_date") ? Number(formData.get("purchased_date")) : null,
    fiction: formData.get("fiction") === "true",
    in_library: formData.get("in_library") !== "false",
    cover: (formData.get("cover") as string) || null,
    read_date: readDate,
  });

  revalidatePath(`/books/${id}`);
}

export async function updateQuoteAction(formData: FormData) {
  const quoteId = formData.get("quote_id") as string;
  const bookId = formData.get("book_id") as string;
  const quote = formData.get("quote") as string;
  const pages = (formData.get("pages") as string) || null;
  const libreta = formData.get("libreta") === "true";

  await updateQuote(quoteId, quote, pages, libreta);
  revalidatePath(`/books/${bookId}`);
}
