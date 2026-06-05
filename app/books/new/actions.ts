"use server";

import { redirect } from "next/navigation";
import { createBook } from "@/services/books";

export async function createBookAction(formData: FormData) {
  const readDateRaw = formData.get("read_date") as string;
  const readDate = readDateRaw
    ? readDateRaw.split(",").map((d) => d.trim()).filter(Boolean)
    : [];

  const authorIds = formData.getAll("author_ids") as string[];

  await createBook({
    name: formData.get("name") as string,
    year: Number(formData.get("year")),
    status: (formData.get("status") as string) || "por leer",
    rating: (formData.get("rating") as string) || "bueno",
    format: (formData.get("format") as string) || "físico",
    reading_times: Number(formData.get("reading_times")) || 0,
    purchased_date: formData.get("purchased_date") ? Number(formData.get("purchased_date")) : null,
    fiction: formData.get("fiction") === "true",
    in_library: formData.get("in_library") !== "false",
    cover: (formData.get("cover") as string) || null,
    editorial_id: formData.get("editorial_id") as string,
    author_ids: authorIds,
    read_date: readDate,
  });

  redirect("/");
}
