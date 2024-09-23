import {
  ColorType,
  createChart,
  ISeriesApi,
  Time,
  UTCTimestamp,
} from "lightweight-charts";
import { Ids } from "../constants/constants";

export let spendingSeries: ISeriesApi<"Line", Time>;
export let budgetSeries: ISeriesApi<"Line", Time>;
export type SeriesData = { value: number; time: UTCTimestamp }[];

export const setupChart = () => {
  const chart = createChart(
    document.getElementById(Ids.Chart), //
    {
      width: document.body.clientWidth * 0.8,
      height: 300,
      layout: {
        textColor: "black",
        background: { type: ColorType.Solid, color: "white" },
      },
    }
  );

  spendingSeries = chart.addLineSeries({ color: "#48c774" });
  // spendingSeries.setData([
  //   { value: 0, time: 1642425322 as UTCTimestamp },
  // ]);

  budgetSeries = chart.addLineSeries({ color: "#000000" });
  // budgetSeries.setData([
  //   { value: -10, time: 1642425322 as UTCTimestamp },
  //   { value: -8, time: 1642511722 as UTCTimestamp },
  //   { value: -10, time: 1642598122 as UTCTimestamp },
  // ]);

  chart.timeScale().fitContent();
};
