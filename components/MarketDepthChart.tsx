"use client";

import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
} from "chart.js";
import { OrderbookData } from "@/app/utils/constants";


ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale
);

interface MarketDepthChartProps {
  orderbook: OrderbookData;
}

const MarketDepthChart: React.FC<MarketDepthChartProps> = ({ orderbook }) => {
  const chartData = useMemo(() => {
    // Sort bids descending and asks ascending
    const bids = orderbook.bids
      .slice(0, 10)
      .map((bid) => ({
        price: parseFloat(bid.price),
        quantity: parseFloat(bid.quantity),
      }))
      .sort((a, b) => b.price - a.price);

    const asks = orderbook.asks
      .slice(0, 10)
      .map((ask) => ({
        price: parseFloat(ask.price),
        quantity: parseFloat(ask.quantity),
      }))
      .sort((a, b) => a.price - b.price);

    // Calculate cumulative sums
    let cumulativeBidQty = 0;
    const bidsData = bids.map((bid) => {
      cumulativeBidQty += bid.quantity;
      return {
        x: bid.price,
        y: cumulativeBidQty,
      };
    });

    let cumulativeAskQty = 0;
    const asksData = asks.map((ask) => {
      cumulativeAskQty += ask.quantity;
      return {
        x: ask.price,
        y: cumulativeAskQty,
      };
    });

    return {
      datasets: [
        {
          label: "Bids",
          data: bidsData,
          borderColor: "rgb(0, 200, 0)",
          backgroundColor: "rgba(0, 200, 0, 0.5)",
          fill: false,
          stepped: true,
        },
        {
          label: "Asks",
          data: asksData,
          borderColor: "rgb(200, 0, 0)",
          backgroundColor: "rgba(200, 0, 0, 0.5)",
          fill: false,
          stepped: true,
        },
      ],
    };
  }, [orderbook]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: "Market Depth",
        color: "white",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Price",
          color: "white",
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
          text: "Cumulative Quantity",
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
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MarketDepthChart;
