export type Story = {
  id: string;
  name: string;
  description: string | null;
  rating: "preferido" | "muy bueno" | "bueno" | "más o menos" | "malo";
  book_id: string;
};
