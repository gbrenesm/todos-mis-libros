export type Book = {
  id: string;
  name: string;
  year: number;
  read_date: string[] | null;
  status: "leído" | "leyendo" | "por leer";
  rating: "preferido" | "muy bueno" | "bueno" | "más o menos" | "malo";
  format: "físico" | "digital" | "audiolibro";
  reading_times: number;
  purchased_date: number | null;
  fiction: boolean;
  in_library: boolean;
  cover: string | null;
  editorial: string;
  author_id: string;
  author_name: string;
  author_lastname: string | null;
};
