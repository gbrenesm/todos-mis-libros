import {
  getBooksByReadYear,
  getBooksByRating,
  getBooksByCountry,
  getBooksByTag,
  getBooksByType,
  getBooksByFormat,
  getBooksByAuthor,
  getBooksByFiction,
  getBooksByDecade,
  getBooksByAuthorGender,
  getBooksByEditorial,
  getChartsSummary,
} from "@/services/charts";
import { BarChartSection, StackedBarChartSection, HorizontalBarChartSection, RATING_COLORS, TYPE_COLORS, FORMAT_COLORS, FICTION_COLORS, GENDER_COLORS } from "@/components/Charts";

export default async function ChartsPage() {
  const [byYear, byRating, byCountry, byTag, byType, byFormat, byAuthor, byFiction, byDecade, byGender, byEditorial, summary] = await Promise.all([
    getBooksByReadYear(),
    getBooksByRating(),
    getBooksByCountry(),
    getBooksByTag(),
    getBooksByType(),
    getBooksByFormat(),
    getBooksByAuthor(),
    getBooksByFiction(),
    getBooksByDecade(),
    getBooksByAuthorGender(),
    getBooksByEditorial(),
    getChartsSummary(),
  ]);

  return (
    <main className="px-8 py-12 md:px-16 lg:px-24">
      <h1 className="text-2xl font-bold text-title mb-8">Gráficos y estadísticas</h1>

      <section className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-card-bg border border-card-border rounded-xl p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-label">En biblioteca</p>
          <p className="text-3xl font-bold text-title mt-2">{summary.totalBooks}</p>
        </div>
        <div className="bg-card-bg border border-card-border rounded-xl p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-label">Lecturas totales</p>
          <p className="text-3xl font-bold text-title mt-2">{summary.totalReadings}</p>
        </div>
        <div className="bg-card-bg border border-card-border rounded-xl p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-label">Autorxs</p>
          <p className="text-3xl font-bold text-title mt-2">{summary.totalAuthors}</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BarChartSection title="Libros por año de lectura" data={byYear} />
        <StackedBarChartSection title="Libros por calificación" data={byRating} colors={RATING_COLORS} />
        <HorizontalBarChartSection title="Libros por país" data={byCountry} color="#C8755A" />
        <HorizontalBarChartSection title="Libros por etiqueta" data={byTag} color="#6B4E71" />
        <StackedBarChartSection title="Libros por tipo" data={byType} colors={TYPE_COLORS} />
        <StackedBarChartSection title="Libros por formato" data={byFormat} colors={FORMAT_COLORS} />
        <HorizontalBarChartSection title="Libros por autor" data={byAuthor} color="#8B5E3C" />
        <StackedBarChartSection title="Ficción vs No ficción" data={byFiction} colors={FICTION_COLORS} />
        <HorizontalBarChartSection title="Libros por editorial" data={byEditorial} color="#5B8C5A" />
        <BarChartSection title="Libros por década de edición" data={byDecade} />
        <StackedBarChartSection title="Libros por género del autor" data={byGender} colors={GENDER_COLORS} />
      </div>
    </main>
  );
}
