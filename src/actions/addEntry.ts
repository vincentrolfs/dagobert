import { currencyFactors } from "../constants/constants";
import { data, saveData } from "../data/data";
import { find } from "../dom/find";
import { render } from "../render/render";
import { getLocalDate } from "../utils/getLocalDate";

export const addEntryAction = () => {
  const input = find<HTMLFormElement>("input");

  input.onsubmit = (e) => {
    e.preventDefault();

    const input = find<HTMLInputElement>("input", "amountOriginal");
    const reason = find<HTMLInputElement>("input", "reason");
    const value = parseFloat(input.value?.trim() || "?");

    if (!value || isNaN(value)) {
      return value;
    }

    data.entries.push({
      id: Math.random().toString().substring(2),
      amountOriginal: value,
      currencyOriginal: data.settings.defaultCurrency,
      currencyFactorOriginal: currencyFactors[data.settings.defaultCurrency],
      amountEur: value * currencyFactors[data.settings.defaultCurrency],
      reason: reason.value?.trim() || "",
      timestamp: new Date().toISOString(),
      date: getLocalDate(),
    });
    data.entries.sort(
      (a, b) => +new Date(b.timestamp) - +new Date(a.timestamp)
    );
    saveData();
    render();

    input.value = "";
    reason.value = "";
  };
};
