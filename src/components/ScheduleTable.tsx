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
    <div className="rounded-xl border border-border bg-surface">
      <div className="sm:hidden">
        {rows.map((row, i) => (
          <dl
            key={row.key ?? i}
            className="grid grid-cols-[minmax(5.75rem,0.38fr)_minmax(0,0.62fr)] gap-x-4 gap-y-2 border-b border-border px-4 py-4 last:border-b-0"
          >
            {columns.map((col, ci) => {
              const raw = row[col.key];
              const value = typeof raw === "string" ? raw : "";
              const content = value || (row.tbd ? tbdLabel : "");

              if (!content) return null;

              return (
                <div key={col.key} className="contents">
                  <dt className="text-sm font-medium text-muted">{col.label}</dt>
                  <dd
                    className={
                      ci === 0
                        ? "font-medium text-foreground"
                        : "text-foreground"
                    }
                  >
                    <span className="inline-flex flex-wrap items-center gap-2">
                      {row.tbd && (ci === 0 || !value) ? (
                        <TbdChip label={tbdLabel} />
                      ) : null}
                      {value}
                    </span>
                  </dd>
                </div>
              );
            })}
          </dl>
        ))}
      </div>

      <div className="hidden sm:block">
        <table className="w-full table-fixed text-left text-base">
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
                      className={`break-words px-4 py-3 align-top ${
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
    </div>
  );
}
