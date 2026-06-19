export type Author = {
  id: string;
  name: string;
  lastname: string | null;
  birthday: number | null;
  death: number | null;
  gender: "mujer" | "hombre" | "no definido";
  nobel_prize: number | null;
  photo: string | null;
  city: string | null;
  country_id: number;
  country: string;
};
