import { Currency, data, saveData } from "../data/data";
import { find } from "../dom/find";

export const saveCurrencyAction = () => {
  const input = find<HTMLSelectElement>("input", "currencyOriginal");

  input.onchange = () => {
    data.settings.defaultCurrency = input.value as Currency;
    saveData();
  };
};
