"use server";

import { redirect } from "next/navigation";
import { createEditorial } from "@/services/editorials";

export async function createEditorialAction(formData: FormData) {
  await createEditorial(
    formData.get("name") as string,
    Number(formData.get("country_id")),
  );

  redirect("/editorials/new");
}
