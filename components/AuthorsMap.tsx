"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type CountryData = {
  country: string;
  count: number;
};

type AuthorsMapProps = {
  data: CountryData[];
  title: string;
  color: string;
};

export default function AuthorsMap({ data, title, color }: AuthorsMapProps) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  const countByCountry = new Map(data.map((d) => [d.country, d.count]));

  function getColor(geoName: string) {
    const count = countByCountry.get(geoName);
    if (!count) return "#2a2a2a";
    const intensity = count / maxCount;
    const opacity = 0.3 + intensity * 0.7;
    return `color-mix(in srgb, ${color} ${Math.round(opacity * 100)}%, #1a1a1a)`;
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="rounded-xl overflow-hidden">
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
                      stroke="#3a3a3a"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", opacity: 0.8 },
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
        <div className="flex flex-wrap gap-2 text-xs text-muted">
          {data.map((d) => (
            <span key={d.country} className="bg-card-bg rounded-full px-3 py-1">
              {d.country}: {d.count}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
