"use client";

type CountRow = { label: string; count: number };

const RATING_COLORS: Record<string, string> = {
  bueno: "#104F55",
  "muy bueno": "#C8755A",
  preferido: "#C4965A",
  "más o menos": "#D4C5A0",
  malo: "#6B7280",
};

const TYPE_COLORS: Record<string, string> = {
  novela: "#6B4E71",
  cuentos: "#C4965A",
  ensayo: "#104F55",
};

const TAG_COLORS = [
  "#C8755A", "#6B4E71", "#104F55", "#C4965A", "#8B5E3C",
  "#388697", "#1A936F", "#654597", "#E2711D", "#68B0AB",
];

export function BarChartSection({ title, data }: { title: string; data: CountRow[] }) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const currentYear = "2026";

  return (
    <div className="bg-card-bg border border-card-border rounded-xl p-6">
      <h3 className="text-base font-semibold text-title mb-6">{title}</h3>
      <div className="flex items-end gap-1 h-40">
        {data.map((d) => {
          const height = (d.count / maxCount) * 100;
          const isCurrent = d.label === currentYear;
          return (
            <div
              key={d.label}
              className="flex-1 max-w-8 mx-auto rounded-t-sm"
              style={{
                height: `${height}%`,
                minHeight: d.count > 0 ? "4px" : "0",
                backgroundColor: isCurrent ? "#104F55" : "#C8755A",
              }}
            />
          );
        })}
      </div>
      <div className="flex gap-1 mt-2">
        {data.map((d) => (
          <span
            key={d.label}
            className="flex-1 text-center text-[9px] text-muted"
            style={d.label === currentYear ? { color: "#104F55", fontWeight: 700 } : {}}
          >
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function StackedBarChartSection({ title, data, colors }: { title: string; data: CountRow[]; colors: Record<string, string> }) {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="bg-card-bg border border-card-border rounded-xl p-6">
      <h3 className="text-base font-semibold text-title mb-6">{title}</h3>
      <div className="w-full h-8 rounded-full overflow-hidden flex">
        {data.map((d) => (
          <div
            key={d.label}
            style={{
              width: `${(d.count / total) * 100}%`,
              backgroundColor: colors[d.label] ?? "#6B7280",
            }}
          />
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {data.map((d) => (
          <div key={d.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[d.label] ?? "#6B7280" }}
              />
              <span className="text-sm text-value">{d.label}</span>
            </div>
            <span className="text-sm font-semibold text-title">{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { RATING_COLORS, TYPE_COLORS };

export function HorizontalBarChartSection({
  title,
  data,
  color,
}: {
  title: string;
  data: CountRow[];
  color?: string;
}) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="bg-card-bg border border-card-border rounded-xl p-6">
      <h3 className="text-base font-semibold text-title mb-4">{title}</h3>
      <div className="flex flex-col gap-2.5">
        {data.map((d, i) => {
          const barColor = color ?? TAG_COLORS[i % TAG_COLORS.length];
          const width = (d.count / maxCount) * 100;
          return (
            <div key={d.label} className="flex items-center gap-3">
              <span className="text-xs text-value w-24 text-right shrink-0 truncate">
                {d.label}
              </span>
              <div className="flex-1 h-4 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${width}%`, backgroundColor: barColor }}
                />
              </div>
              <span className="text-xs font-semibold text-title w-8 text-right">
                {d.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
