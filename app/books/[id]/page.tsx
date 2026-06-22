import { notFound } from "next/navigation";
import { getBookById } from "@/services/books";
import { getQuotesByBookId } from "@/services/quotes";
import { getStorysByBookId } from "@/services/storys";
import BookDetail from "@/components/BookDetail";
import QuoteSection from "@/components/QuoteSection";
import StorySection from "@/components/StorySection";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BookDetailPage({ params }: Props) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) notFound();

  const quotes = await getQuotesByBookId(id);
  const storys = book.has_stories ? await getStorysByBookId(id) : [];

  return (
    <main className="px-8 py-12 md:px-16 lg:px-24 max-w-5xl mx-auto">
      <div className="bg-card-bg border border-card-border rounded-xl p-8 mb-12">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="shrink-0">
            {book.cover ? (
              <img
                src={book.cover}
                alt={book.name}
                className="w-40 h-60 object-cover rounded-lg"
              />
            ) : (
              <div className="w-40 h-60 bg-white/50 rounded-lg flex items-center justify-center">
                <span className="text-muted text-sm">Sin portada</span>
              </div>
            )}
          </div>

          <BookDetail book={book} />
        </div>
      </div>

      <QuoteSection bookId={id} quotes={quotes} />

      {book.has_stories && (
        <div className="mt-12">
          <StorySection bookId={id} storys={storys} />
        </div>
      )}
    </main>
  );
}
