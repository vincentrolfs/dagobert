import { Currency, DATA_KEY } from "../constants/constants";

export type Data = {
  entries: {
    id: string;
    amountOriginal: number;
    currencyOriginal: Currency;
    currencyFactorOriginal: number;
    amountEur: number;
    timestamp: string;
    reason: string;
    date: string;
  }[];
  settings: {
    defaultCurrency: Currency;
  };
  deleted?: Record<string, boolean>;
};

const defaultData: Data = {
  entries: [],
  settings: {
    defaultCurrency: "EUR",
  },
};

export const data = ((): Data => {
  try {
    return JSON.parse(localStorage.getItem(DATA_KEY) ?? "-");
  } catch {
    return defaultData;
  }
})();

export const saveData = () => {
  console.info("saving", data);

  const newEntries: Data["entries"] = [
    {
      id: "4111850078187538",
      amountOriginal: 120,
      currencyOriginal: "TRY",
      currencyFactorOriginal: 0.0262674,
      amountEur: 3.152088,
      reason: "one cappucino",
      timestamp: "2024-09-21T20:53:23.179Z",
      date: "2024-09-21",
    },
    {
      id: "05052973657392301",
      amountOriginal: 50,
      currencyOriginal: "TRY",
      currencyFactorOriginal: 0.0262674,
      amountEur: 1.31337,
      reason: "turkish ground coffee",
      timestamp: "2024-09-21T20:52:49.030Z",
      date: "2024-09-21",
    },
    {
      id: "739185707487249",
      amountOriginal: 60,
      currencyOriginal: "TRY",
      currencyFactorOriginal: 0.0262674,
      amountEur: 1.576044,
      reason: "sweet turkish fired balls",
      timestamp: "2024-09-21T20:49:58.645Z",
      date: "2024-09-21",
    },
    {
      id: "5891633995089558",
      amountOriginal: 120,
      currencyOriginal: "TRY",
      currencyFactorOriginal: 0.0262674,
      amountEur: 3.152088,
      reason: "turkish tea",
      timestamp: "2024-09-21T20:49:47.146Z",
      date: "2024-09-21",
    },
  ];
  newEntries.forEach((newEntry) => {
    if (data.entries.find((x) => x.id === newEntry.id)) {
      return;
    }

    data.entries.push(newEntry);
  });

  localStorage.setItem(DATA_KEY, JSON.stringify(data));
};
