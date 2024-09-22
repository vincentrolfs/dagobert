export const DATA_KEY = "dagobert_data";

export type Currency = "EUR" | "TRY";

export const currencyFactors: Record<Currency, number> = {
  EUR: 1,
  TRY: 0.0262674,
};

export const DATE_START = "2024-09-21";
export const BUDGET_PER_DAY = 25;

export const Classes = {
  Render: "render",
  ListRowEntry: "listRow-entry",
  ListRowEntryId: "listRow-entry-id",
  ListRowSummary: "listRow-summary",
  DeleteEntry: "deleteEntry",
};

export const Ids = {
  Input: "input",
  ListRow: "listRow",
  GlobalStats: "globalStats",
};
