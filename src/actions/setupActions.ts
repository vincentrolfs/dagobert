import { addEntryAction } from "./addEntry";
import { deleteEntryAction } from "./deleteEntry";
import { saveCurrencyAction } from "./saveCurrency";

export const setupActions = () => {
  saveCurrencyAction();
  addEntryAction();
  deleteEntryAction();
};
