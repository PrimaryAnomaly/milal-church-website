import { TbdChip } from "./TbdChip";

type Column = { key: string; label: string };

export type ScheduleRow = {
  key: string;
  tbd?: boolean;
  [cell: string]: string | boolean | undefined;
};

type ScheduleTableProps = {
  columns: Column[];
  rows: ScheduleRow[];
  tbdLabel: string;
};

export function ScheduleTable({
  columns,
  rows,
  tbdLabel,
}: ScheduleTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface">
      <table className="min-w-full text-left text-base">
        <thead className="border-b border-border text-foreground">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-semibold">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.key ?? i}
              className="border-b border-border last:border-b-0"
            >
              {columns.map((col, ci) => {
                const raw = row[col.key];
                const value = typeof raw === "string" ? raw : "";
                return (
                  <td
                    key={col.key}
                    className={`px-4 py-3 ${
                      ci === 0
                        ? "font-medium text-foreground"
                        : "text-muted"
                    }`}
                  >
                    {ci === 0 ? (
                      <span className="inline-flex flex-wrap items-center gap-2">
                        {row.tbd ? <TbdChip label={tbdLabel} /> : null}
                        {value}
                      </span>
                    ) : value ? (
                      value
                    ) : row.tbd ? (
                      <TbdChip label={tbdLabel} />
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
