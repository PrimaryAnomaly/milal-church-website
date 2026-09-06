type Column = { key: string; label: string };

type ScheduleTableProps = {
  columns: Column[];
  rows: Array<Record<string, string>>;
};

export function ScheduleTable({ columns, rows }: ScheduleTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface">
      <table className="min-w-full text-left text-sm">
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
              {columns.map((col, ci) => (
                <td
                  key={col.key}
                  className={`px-4 py-3 ${
                    ci === 0
                      ? "font-medium text-foreground"
                      : "text-muted"
                  }`}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
