import { UTCTimestamp } from "lightweight-charts";
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
import { budgetSeries, SeriesData, spendingSeries } from "../dom/setupChart";
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

  let date = getLocalDate();
  let budgetData: SeriesData = [];
  const spendingData: SeriesData = [];

  while (true) {
    const timestamp = Math.round(+new Date(date) / 1000) as UTCTimestamp;
    const currentEntries = entriesByDate[date] ?? [];
    const currentBudget = BUDGET_PER_DAY;
    const currentSpending = currentEntries.reduce((x, e) => x + e.amountEur, 0);

    budgetData.push({ value: currentBudget, time: timestamp });
    spendingData.push({ value: currentSpending, time: timestamp });

    blueprint(
      Ids.ListRow,
      {
        date: date,
        amount:
          formatNum(currentSpending) +
          ` (budget: ${currentBudget > currentSpending ? "+" : ""}${formatNum(
            currentBudget - currentSpending
          )})`,
        reason: "Summary",
      },
      [className, Classes.ListRowSummary]
    );

    currentEntries.forEach((e) => {
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

  const dayCount = spendingData.length + 1;
  const totalSpending = spendingData.reduce((x, e) => x + e.value, 0);

  blueprint(
    Ids.GlobalStats,
    {
      dayCount: dayCount.toString(),
      cost: formatNum(totalSpending),
      expected: formatNum(dayCount * BUDGET_PER_DAY),
      result: formatNum(dayCount * BUDGET_PER_DAY - totalSpending),
    },
    [className]
  );

  spendingSeries.setData(computeAccumulation(spendingData));
  budgetSeries.setData(computeAccumulation(budgetData));

  setupActions();
};

const reset = () => {
  document
    .querySelectorAll(`.${Classes.Render}${renderCount}`)
    .forEach((x) => x.remove());

  renderCount++;

  return `${Classes.Render}${renderCount}`;
};

const computeAccumulation = (input: SeriesData): SeriesData => {
  return [...input].reverse().reduce<SeriesData>((ret, entry) => {
    ret.push({ ...entry, value: entry.value + (ret.at(-1)?.value ?? 0) });
    return ret;
  }, []);
};
