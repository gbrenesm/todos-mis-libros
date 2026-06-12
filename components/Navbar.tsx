import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-accent text-white px-8 md:px-16 lg:px-24 py-5 flex items-center justify-between">
      <Link href="/" className="text-xl font-handwritten hover:opacity-80 transition-opacity">
        Todos mis libros
      </Link>

      <ul className="flex gap-8">
        <li>
          <Link href="/" className="text-base font-medium hover:opacity-80 transition-opacity">
            Libros
          </Link>
        </li>
        <li>
          <Link href="/authors" className="text-base font-medium hover:opacity-80 transition-opacity">
            Autorxs
          </Link>
        </li>
        <li>
          <Link href="/editorials" className="text-base font-medium hover:opacity-80 transition-opacity">
            Editoriales
          </Link>
        </li>
        <li>
          <Link href="/maps" className="text-base font-medium hover:opacity-80 transition-opacity">
            Mapas
          </Link>
        </li>
        <li>
          <Link href="/charts" className="text-base font-medium hover:opacity-80 transition-opacity">
            Gráficos
          </Link>
        </li>
      </ul>
    </nav>
  );
}
