import { Data } from "./data";

const exampleData: Data = {
  entries: [
    {
      id: "1",
      amountOriginal: 100,
      currencyOriginal: "EUR",
      currencyFactorOriginal: 1,
      amountEur: 100,
      timestamp: new Date().toISOString(),
      reason: "r1",
      date: new Date().toISOString().substring(0, 10),
    },
  ],
  settings: {
    defaultCurrency: "EUR",
  },
};

localStorage.setItem(
  "dagobert_data",
  JSON.stringify({
    entries: [
      {
        id: "1",
        amountOriginal: 100,
        currencyOriginal: "EUR",
        currencyFactorOriginal: 1,
        amountEur: 100,
        timestamp: new Date().toISOString(),
        reason: "r1",
        date: new Date().toISOString().substring(0, 10),
      },
    ],
    settings: {
      defaultCurrency: "EUR",
    },
  })
);
