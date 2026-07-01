import {
  getBooksByReadYear,
  getBooksByRating,
  getBooksByCountry,
  getBooksByTag,
  getBooksByType,
} from "@/services/charts";
import { BarChartSection, StackedBarChartSection, HorizontalBarChartSection, RATING_COLORS, TYPE_COLORS } from "@/components/Charts";

export default async function ChartsPage() {
  const [byYear, byRating, byCountry, byTag, byType] = await Promise.all([
    getBooksByReadYear(),
    getBooksByRating(),
    getBooksByCountry(),
    getBooksByTag(),
    getBooksByType(),
  ]);

  return (
    <main className="px-8 py-12 md:px-16 lg:px-24">
      <h1 className="text-2xl font-bold text-title mb-8">Gráficos</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BarChartSection title="Libros por año de lectura" data={byYear} />
        <StackedBarChartSection title="Libros por calificación" data={byRating} colors={RATING_COLORS} />
        <HorizontalBarChartSection title="Libros por país" data={byCountry} color="#C8755A" />
        <HorizontalBarChartSection title="Libros por etiqueta" data={byTag} color="#6B4E71" />
        <StackedBarChartSection title="Libros por tipo" data={byType} colors={TYPE_COLORS} />
      </div>
    </main>
  );
}
