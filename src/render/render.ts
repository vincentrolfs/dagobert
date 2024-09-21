import { BUDGET_PER_DAY, DATE_START } from "../constants/constants";
import { Data, data } from "../data/data";
import { blueprint } from "../dom/blueprint";
import { find } from "../dom/find";
import { formatNum } from "../utils/formatNum";
import { getLocalDate } from "../utils/getLocalDate";
import { previousDate } from "../utils/previousDate";

let renderCount = 0;

export const render = () => {
  const className = reset();

  find<HTMLSelectElement>("input", "currencyOriginal").value =
    data.settings.defaultCurrency;

  const entriesByDate = data.entries.reduce<Record<string, Data["entries"]>>(
    (entries, entry) => {
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
      "listRow",
      {
        date: date,
        amount:
          formatNum(sum) +
          ` (budget: ${BUDGET_PER_DAY > sum ? "+" : ""}${formatNum(
            BUDGET_PER_DAY - sum
          )})`,
        reason: "Summary",
      },
      [className, "t-bold"]
    );

    entries.forEach((e) => {
      blueprint(
        "listRow",
        {
          date: e.date,
          amount: formatNum(e.amountEur),
          reason: e.reason,
        },
        [className]
      );
    });

    if (date === DATE_START) {
      break;
    }

    date = previousDate(date);
  }

  blueprint(
    "globalStats",
    {
      dayCount: dayCount.toString(),
      cost: formatNum(globalSum),
      expected: formatNum(dayCount * BUDGET_PER_DAY),
      result: formatNum(dayCount * BUDGET_PER_DAY - globalSum),
    },
    [className, "t-bold"]
  );
};

const reset = () => {
  document
    .querySelectorAll(`._render${renderCount}`)
    .forEach((x) => x.remove());

  renderCount++;

  return `_render${renderCount}`;
};
