import { setupActions } from "../actions/setupActions";
import {
  BUDGET_PER_DAY,
  DATE_START,
  Classes,
  Ids,
} from "../constants/constants";
import { Data, data } from "../data/data";
import { blueprint } from "../dom/blueprint";
import { find } from "../dom/find";
import { formatNum } from "../utils/formatNum";
import { getLocalDate } from "../utils/getLocalDate";
import { previousDate } from "../utils/previousDate";

let renderCount = 0;

export const render = () => {
  const className = reset();

  find<HTMLSelectElement>(Ids.Input, "currencyOriginal").value =
    data.settings.defaultCurrency;

  const entriesByDate = data.entries.reduce<Record<string, Data["entries"]>>(
    (entries, entry) => {
      if (data.deleted?.[entry.id]) {
        return entries;
      }

      entries[entry.date] = entries[entry.date] ?? [];
      entries[entry.date].push(entry);
      return entries;
    },
    {}
  );

  let dayCount = 0;
  let globalSum = 0;
  let date = getLocalDate();

  while (true) {
    const entries = entriesByDate[date] ?? [];
    const sum = entries.reduce((x, e) => x + e.amountEur, 0);
    dayCount++;
    globalSum += sum;

    blueprint(
      Ids.ListRow,
      {
        date: date,
        amount:
          formatNum(sum) +
          ` (budget: ${BUDGET_PER_DAY > sum ? "+" : ""}${formatNum(
            BUDGET_PER_DAY - sum
          )})`,
        reason: "Summary",
      },
      [className, Classes.ListRowSummary]
    );

    entries.forEach((e) => {
      blueprint(
        Ids.ListRow,
        {
          date: e.date,
          amount: formatNum(e.amountEur),
          reason: e.reason,
        },
        [className, Classes.ListRowEntry, `${Classes.ListRowEntryId}${e.id}`]
      );
    });

    if (date === DATE_START) {
      break;
    }

    date = previousDate(date);
  }

  blueprint(
    Ids.GlobalStats,
    {
      dayCount: dayCount.toString(),
      cost: formatNum(globalSum),
      expected: formatNum(dayCount * BUDGET_PER_DAY),
      result: formatNum(dayCount * BUDGET_PER_DAY - globalSum),
    },
    [className]
  );

  setupActions();
};

const reset = () => {
  document
    .querySelectorAll(`.${Classes.Render}${renderCount}`)
    .forEach((x) => x.remove());

  renderCount++;

  return `${Classes.Render}${renderCount}`;
};
