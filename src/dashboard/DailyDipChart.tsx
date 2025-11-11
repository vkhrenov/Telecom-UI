import * as React from "react";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";

// Import the title, tooltip, rectangular coordinate system, dataset and transform components
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";
// Features like Universal Transition and Label Layout
import {
  LabelLayout,
  UniversalTransition,
  LegacyGridContainLabel,
} from "echarts/features";

// Import the Canvas renderer
// Note that including the CanvasRenderer or SVGRenderer is a required step
import { SVGRenderer } from "echarts/renderers";

import { format, subMinutes } from "date-fns";
import { StatsPerTime } from "../types";

import type {
  DatasetComponentOption,
  GridComponentOption,
  LineSeriesOption,
  TitleComponentOption,
  TooltipComponentOption,
} from "echarts";

// generate 288 timestamps (every 5 minutes) for the past 24 hours, formatted as "YYYY-MM-DD HH:mm:00"
const INTERVAL_MINUTES = 5;
const POINTS_PER_DAY = (24 * 60) / INTERVAL_MINUTES; // 288

// align "now" down to the nearest 5-minute boundary so every generated timestamp
// has minutes divisible by 5 (no remainder)
const alignedNow = new Date();
alignedNow.setSeconds(0, 0);
const mins = alignedNow.getMinutes();
alignedNow.setMinutes(Math.floor(mins / INTERVAL_MINUTES) * INTERVAL_MINUTES);

// Create an Option type with only the required components and charts via ComposeOption
type ECOption = echarts.ComposeOption<
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  LabelLayout,
  UniversalTransition,
  LegacyGridContainLabel,
  SVGRenderer,
]);

const dateFormatter = (date: number): string =>
  format(new Date(date), "HH:mm:ss");

// Helper function to map dipsper5 array into a dictionary for quick lookup
const retrieveDipsBy5 = (
  dipsper5: StatsPerTime[],
): { [key: string]: number } => {
  const dipsBy5: { [key: string]: number } = {};
  dipsper5.forEach((item) => {
    dipsBy5[item.date] = item.dips;
  });
  return dipsBy5;
};

// Function to get dips per 5-minute interval for the last day
const getDipsPer5min = (
  dipsper5: StatsPerTime[],
  lastday5: string[],
): TotalBy5min[] => {
  const intervalsWithDips = retrieveDipsBy5(dipsper5);
  return lastday5.map((dateStr) => ({
    // convert formatted string back to timestamp for the chart x-axis
    date: new Date(dateStr).getTime(),
    // lookup by the full "yyyy-MM-dd HH:mm:00" key
    total: intervalsWithDips[dateStr] || 0,
  }));
};

// Main component for rendering the daily dip chart
const DailyDipChart = (props: { dipsper5?: StatsPerTime[] }) => {
  const { dipsper5 } = props;
  const chartRef = React.useRef<HTMLDivElement>(null);
  const chartInstance = React.useRef<echarts.ECharts | null>(null);

  React.useEffect(() => {
    let mounted = true;

    const initOrGetChart = () => {
      if (!chartRef.current) return null;
      if (!chartInstance.current) {
        chartInstance.current = echarts.init(chartRef.current);
      }
      return chartInstance.current;
    };

    const updateChart = () => {
      const chart = initOrGetChart();
      if (!chart || !mounted) return;

      // compute "now" at update time and align to 5-min boundary
      const now = new Date();
      now.setSeconds(0, 0);
      now.setMinutes(
        Math.floor(now.getMinutes() / INTERVAL_MINUTES) * INTERVAL_MINUTES,
      );
      // regenerate the 5-min timestamps relative to current aligned now
      const lastday5 = Array.from({ length: POINTS_PER_DAY }, (_, i) => {
        const dt = subMinutes(now, i * INTERVAL_MINUTES);
        return format(dt, "yyyy-MM-dd HH:mm:00");
      }).reverse();

      const dipData = getDipsPer5min(dipsper5 || [], lastday5);

      const option: ECOption = {
        xAxis: {
          type: "time",
          // min: keep using fromDateForDips or compute from lastday5[0]
          min: new Date(lastday5[0].replace(" ", "T")).getTime(),
          max: now.getTime(),
          axisLabel: { formatter: (value: number) => dateFormatter(value) },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: (value: number) => `${value}`,
            margin: 12,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: [3, 4],
              color: "#aaa",
            },
          },
        },
        tooltip: {
          trigger: "axis",
          formatter: (params: any) => {
            const param = params[0];

            return `${dateFormatter(param.value[0])}: ${new Intl.NumberFormat(
              undefined,
              {
                style: "decimal",
                minimumFractionDigits: 0,
              },
            ).format(param.value[1])}`;
          },
          axisPointer: {
            type: "line",
            lineStyle: {
              type: [3, 3],
            },
          },
        },
        grid: {
          left: "1%",
          right: "1%",
          bottom: "0%",
          top: "2%",
          containLabel: true,
        },
        series: [
          {
            name: "Dip",
            type: "line",
            smooth: true,
            smoothMonotone: "x",
            symbol: "none",
            sampling: "average",
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0.05,
                  color: "rgba(136, 132, 216, 0.8)",
                },
                {
                  offset: 0.95,
                  color: "rgba(136, 132, 216, 0)",
                },
              ]),
            },
            lineStyle: {
              color: "#8884d8",
              width: 2,
            },
            data: dipData.map((item) => [item.date, item.total]),
          },
        ],
      };

      // Apply the config
      chart.setOption(option);
    };

    updateChart();

    // Handle resize
    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      mounted = false;
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [dipsper5]);

  return <div ref={chartRef} style={{ width: "100%", height: 300 }} />;
};

interface TotalBy5min {
  date: number;
  total: number;
}

export default DailyDipChart;
