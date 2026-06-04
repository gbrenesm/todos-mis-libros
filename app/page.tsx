import BookCard from "../components/BookCard";

export default function Home() {
  const books = [
      { id: 1, title: "La insoportable levedad del ser", author: "Milan Kundera", year: 1984 },
      { id: 2, title: "Distancia de rescate", author: "Samanta Schweblin", year: 2014 },
    ];
  return (
    <main>
      <h1 className="font-sans text-5xl">Todos mis libros</h1>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </main>
  );
}
