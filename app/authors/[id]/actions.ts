"use server";

import { revalidatePath } from "next/cache";
import { updateAuthor } from "@/services/authors";

export async function updateAuthorAction(formData: FormData) {
  const id = formData.get("id") as string;
  const countryIdsRaw = formData.getAll("country_ids") as string[];
  const countryIds = countryIdsRaw.map(Number).filter((n) => !isNaN(n) && n > 0);

  await updateAuthor({
    id,
    name: formData.get("name") as string,
    lastname: (formData.get("lastname") as string) || null,
    birthday: formData.get("birthday") ? Number(formData.get("birthday")) : null,
    death: formData.get("death") ? Number(formData.get("death")) : null,
    gender: (formData.get("gender") as "mujer" | "hombre" | "no definido") || "no definido",
    nobel_prize: formData.get("nobel_prize") ? Number(formData.get("nobel_prize")) : null,
    photo: (formData.get("photo") as string) || null,
    city: (formData.get("city") as string) || null,
    country_ids: countryIds,
  });

  revalidatePath(`/authors/${id}`);
}
