// src/constants/constants.ts
var DATA_KEY = "dagobert_data";
var currencyFactors = {
  EUR: 1,
  TRY: 0.0262674
};
var DATE_START = "2024-09-21";
var BUDGET_PER_DAY = 25;

// src/data/data.ts
var defaultData = {
  entries: [],
  settings: {
    defaultCurrency: "EUR"
  }
};
var data = (() => {
  try {
    return JSON.parse(localStorage.getItem(DATA_KEY) ?? "-");
  } catch {
    return defaultData;
  }
})();
var saveData = () => {
  console.info("saving", data);
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
};

// src/dom/find.ts
var find = (id, name) => {
  return document.querySelector(
    name ? `#${id} [name="${name}"]` : `#${id}`
  );
};

// src/dom/blueprint.ts
var blueprint = (id, map, classNames) => {
  const blueprint2 = document.querySelector(`#${id}.blueprint`);
  if (!blueprint2) {
    throw new Error(`not found: #${id}.blueprint`);
  }
  const clone = blueprint2.cloneNode(true);
  clone.classList.remove("blueprint");
  classNames.forEach((x) => clone.classList.add(x));
  Object.entries(map).forEach(([key, value]) => {
    const child = clone.querySelector(`._${key}`);
    if (!child) {
      return;
    }
    child.classList.remove(`_${key}`);
    child.innerHTML = value.toString();
  });
  blueprint2.parentElement.appendChild(clone);
  return clone;
};

// src/utils/formatNum.ts
var formatNum = (n) => {
  return n.toFixed(2);
};

// src/utils/getLocalDate.ts
var getLocalDate = () => (/* @__PURE__ */ new Date()).toLocaleString("sv-SE", { dateStyle: "short" });

// src/utils/previousDate.ts
var previousDate = (dateString) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() - 1);
  return date.toISOString().split("T")[0];
};

// src/render/render.ts
var renderCount = 0;
var render = () => {
  const className = reset();
  find("input", "currencyOriginal").value = data.settings.defaultCurrency;
  const entriesByDate = data.entries.reduce(
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
        date,
        amount: formatNum(sum) + ` (budget: ${BUDGET_PER_DAY > sum ? "+" : ""}${formatNum(
          BUDGET_PER_DAY - sum
        )})`,
        reason: "Summary"
      },
      [className, "t-bold"]
    );
    entries.forEach((e) => {
      blueprint(
        "listRow",
        {
          date: e.date,
          amount: formatNum(e.amountEur),
          reason: e.reason
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
      result: formatNum(dayCount * BUDGET_PER_DAY - globalSum)
    },
    [className]
  );
};
var reset = () => {
  document.querySelectorAll(`._render${renderCount}`).forEach((x) => x.remove());
  renderCount++;
  return `_render${renderCount}`;
};

// src/actions/addEntry.ts
var addEntryAction = () => {
  const input = find("input");
  input.onsubmit = (e) => {
    var _a, _b;
    e.preventDefault();
    const input2 = find("input", "amountOriginal");
    const reason = find("input", "reason");
    const value = parseFloat(((_a = input2.value) == null ? void 0 : _a.trim()) || "?");
    if (!value || isNaN(value)) {
      return value;
    }
    data.entries.push({
      id: Math.random().toString().substring(2),
      amountOriginal: value,
      currencyOriginal: data.settings.defaultCurrency,
      currencyFactorOriginal: currencyFactors[data.settings.defaultCurrency],
      amountEur: parseFloat(
        (value * currencyFactors[data.settings.defaultCurrency]).toFixed(2)
      ),
      reason: ((_b = reason.value) == null ? void 0 : _b.trim()) || "",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      date: getLocalDate()
    });
    data.entries.sort(
      (a, b) => +new Date(b.timestamp) - +new Date(a.timestamp)
    );
    saveData();
    render();
    input2.value = "";
    reason.value = "";
  };
};

// src/actions/saveCurrency.ts
var saveCurrencyAction = () => {
  const input = find("input", "currencyOriginal");
  input.onchange = () => {
    data.settings.defaultCurrency = input.value;
    saveData();
  };
};

// src/actions/setupActions.ts
var setupActions = () => {
  saveCurrencyAction();
  addEntryAction();
};

// src/index.ts
setupActions();
render();
