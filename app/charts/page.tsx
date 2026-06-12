import {
  getBooksByReadYear,
  getBooksByRating,
  getBooksByCountry,
  getBooksByTag,
  getBooksByAuthorGender,
  getAuthorsByGender,
} from "@/services/charts";
import { BarChartSection, HorizontalBarChartSection, PieChartSection } from "@/components/Charts";

export default async function ChartsPage() {
  const [byYear, byRating, byCountry, byTag, byGender, authorsByGender] = await Promise.all([
    getBooksByReadYear(),
    getBooksByRating(),
    getBooksByCountry(),
    getBooksByTag(),
    getBooksByAuthorGender(),
    getAuthorsByGender(),
  ]);

  return (
    <main className="px-8 py-12 md:px-16 lg:px-24">
      <h1 className="text-2xl font-bold mb-8">Gráficos</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BarChartSection title="Libros por año de lectura" data={byYear} />
        <PieChartSection title="Libros por calificación" data={byRating} />
        <HorizontalBarChartSection title="Libros por país" data={byCountry} />
        <HorizontalBarChartSection title="Libros por etiqueta" data={byTanpmg} />
        <PieChartSection title="Libros por género del autxr" data={byGender} />
        <PieChartSection title="Autorxs" data={authorsByGender} />
      </div>
    </main>
  );
}
