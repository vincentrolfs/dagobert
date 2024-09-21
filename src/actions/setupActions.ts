import { addEntryAction } from "./addEntry";
import { saveCurrencyAction } from "./saveCurrency";

export const setupActions = () => {
  saveCurrencyAction();
  addEntryAction();
};
