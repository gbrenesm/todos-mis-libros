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
  countryEs: string;
  count: number;
};

type AuthorsMapProps = {
  data: CountryData[];
  title: string;
  color: string;
};

function generateGradientSteps(color: string, steps: number) {
  return Array.from({ length: steps }, (_, i) => {
    const opacity = 0.2 + (i / (steps - 1)) * 0.8;
    return `color-mix(in srgb, ${color} ${Math.round(opacity * 100)}%, #1a1a1a)`;
  });
}

export default function AuthorsMap({ data, title, color }: AuthorsMapProps) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const countByCountry = new Map(data.map((d) => [d.country, d.count]));
  const sorted = [...data].sort((a, b) => b.count - a.count);
  const topCountryEn = sorted[0]?.country;
  const gradientSteps = generateGradientSteps(color, 4);

  function getColor(geoName: string) {
    const count = countByCountry.get(geoName);
    if (!count) return "#bdbfc2";
    const intensity = count / maxCount;
    const opacity = 0.3 + intensity * 0.7;
    return `color-mix(in srgb, ${color} ${Math.round(opacity * 100)}%, #1a1a1a)`;
  }

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
        <div className="flex flex-wrap gap-2 text-xs">
          {sorted.map((d) => (
            <span
              key={d.country}
              className="rounded-full px-3 py-1 border border-card-border"
              style={
                d.country === topCountryEn
                  ? { backgroundColor: color, color: "#fff", borderColor: color }
                  : {}
              }
            >
              {d.countryEs}: {d.count}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
