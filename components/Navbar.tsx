import Link from "next/link";

const links = [
  { href: "/", label: "Libros" },
  { href: "/authors", label: "Autorxs" },
  { href: "/maps", label: "Mapas" },
  { href: "/charts", label: "Gráficos" },
  { href: "/editorials", label: "Editoriales" }
];

export default function Navbar() {
  return (
    <nav className="border-b border-card-border px-8 md:px-16 lg:px-24 py-4">
      <ul className="flex gap-8">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm font-medium hover:opacity-70 transition-opacity"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
