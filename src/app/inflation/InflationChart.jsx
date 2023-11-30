import React, { useRef, useEffect } from "react";
import LineChart from "../../utils/LineChart";
import { useD3 } from "../../hooks/useD3";

const InflationChart = ({ data }) => {
  const inflationChartRef = useD3((svg) => {
    const dataArray  = Object.keys(data).map((key) => ({
      year: new Date(key),
      inflation: data[key],
    }));
    LineChart(dataArray, {
      svg,
      x: (d) => d.year,
      y: (d) => d.inflation,
      yLabel: "↑ Inflation",
      height: 500,
      color: "steelblue",
      strokeWidth: 3,
      // yFormat: "%Y"
    });
  }, [data]);

  return <svg ref={inflationChartRef}></svg>;
};

export default InflationChart;
