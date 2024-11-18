"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { OrderbookData } from "@/app/utils/constants";


ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  TimeScale
);

interface SpreadIndicatorProps {
  orderbook: OrderbookData;
}

const SpreadIndicator: React.FC<SpreadIndicatorProps> = ({ orderbook }) => {
  const [spreadData, setSpreadData] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (orderbook.bids.length > 0 && orderbook.asks.length > 0) {
      const bestBid = parseFloat(orderbook.bids[0].price);
      const bestAsk = parseFloat(orderbook.asks[0].price);
      const spread = bestAsk - bestBid;
      const timestamp = Date.now();

      setSpreadData((prevData) => {
        // Remove data older than 1 minute
        const cutoff = timestamp - 60000;
        const newData = prevData.filter((dataPoint) => dataPoint.x >= cutoff);
        return [...newData, { x: timestamp, y: spread }];
      });
    }
  }, [orderbook]);

  const data = {
    datasets: [
      {
        label: "Spread",
        data: spreadData,
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Spread Indicator (Last 1 Minute)",
        color: "white",
      },
    },
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: "second" as const,
          tooltipFormat: "HH:mm:ss",
        },
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Spread",
          color: "white",
        },
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return (
    <div className="p-4 mb-4 bg-gray-800 text-white rounded-lg">
      <Line data={data} options={options} />
    </div>
  );
};

export default SpreadIndicator;
