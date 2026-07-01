"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import type { Book } from "@/types/book";
import BookCard from "@/components/BookCard";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type CountryData = {
  country: string;
  countryEs: string;
  count: number;
};

type MapBook = Book & {
  country_en: string;
  author_gender: string;
};

type AuthorsMapProps = {
  data: CountryData[];
  title: string;
  color: string;
  books: MapBook[];
};

function generateGradientSteps(color: string, steps: number) {
  return Array.from({ length: steps }, (_, i) => {
    const opacity = 0.2 + (i / (steps - 1)) * 0.8;
    return `color-mix(in srgb, ${color} ${Math.round(opacity * 100)}%, #1a1a1a)`;
  });
}

export default function AuthorsMap({ data, title, color, books }: AuthorsMapProps) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const countByCountry = new Map(data.map((d) => [d.country, d.count]));
  const sorted = [...data].sort((a, b) => b.count - a.count);
  const gradientSteps = generateGradientSteps(color, 4);

  function getColor(geoName: string) {
    const count = countByCountry.get(geoName);
    if (!count) return "#bdbfc2";
    const intensity = count / maxCount;
    const opacity = 0.3 + intensity * 0.7;
    return `color-mix(in srgb, ${color} ${Math.round(opacity * 100)}%, #1a1a1a)`;
  }

  const selectedCountryEs = selectedCountry
    ? data.find((d) => d.country === selectedCountry)?.countryEs
    : null;

  const filteredBooks = selectedCountry
    ? books.filter((b) => b.country_en === selectedCountry)
    : [];

  const uniqueBooks = filteredBooks.filter(
    (b, i, arr) => arr.findIndex((x) => x.id === b.id) === i
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-card-bg border border-card-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3">
          <h2 className="text-base font-semibold text-title">{title}</h2>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <span>menos</span>
            {gradientSteps.map((bg, i) => (
              <span
                key={i}
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: bg }}
              />
            ))}
            <span>más</span>
          </div>
        </div>

        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 120, center: [0, 30] }}
          style={{ width: "100%", height: "auto", backgroundColor: "#388697" }}
        >
          <ZoomableGroup>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const name = geo.properties.name;
                  const count = countByCountry.get(name);
                  const label = count ? `${name}: ${count}` : name;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getColor(name)}
                      stroke={selectedCountry === name ? "#fff" : "#3a3a3a"}
                      strokeWidth={selectedCountry === name ? 2 : 0.5}
                      onClick={() => {
                        if (count) setSelectedCountry(selectedCountry === name ? null : name);
                      }}
                      style={{
                        default: { outline: "none", cursor: count ? "pointer" : "default" },
                        hover: { outline: "none", opacity: 0.8, cursor: count ? "pointer" : "default" },
                        pressed: { outline: "none" },
                      }}
                    >
                      <title>{label}</title>
                    </Geography>
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {data.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs">
          {sorted.map((d) => {
            const bgColor = getColor(d.country);
            const isSelected = selectedCountry === d.country;
            return (
              <button
                type="button"
                key={d.country}
                onClick={() => setSelectedCountry(isSelected ? null : d.country)}
                className="rounded-full px-3 py-1 text-white transition-opacity"
                style={{
                  backgroundColor: bgColor,
                  outline: isSelected ? "2px solid currentColor" : "none",
                  outlineOffset: "2px",
                  opacity: isSelected ? 1 : 0.85,
                }}
              >
                {d.countryEs}: {d.count}
              </button>
            );
          })}
        </div>
      )}

      {selectedCountry && uniqueBooks.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-title mb-3">
            Libros — {selectedCountryEs}
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {uniqueBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
