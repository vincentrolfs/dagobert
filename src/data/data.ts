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
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
};
