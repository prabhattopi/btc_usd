/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { OrderbookData } from "@/app/utils/constants";

interface OrderbookProps {
  orderbook: OrderbookData;
}

const Orderbook: React.FC<OrderbookProps> = ({ orderbook }) => {
  const [previousOrderbook, setPreviousOrderbook] = useState<OrderbookData>({
    bids: [],
    asks: [],
  });

  useEffect(() => {
    setPreviousOrderbook(orderbook);
  }, [orderbook]);

  const getRowClass = (
    currentPrice: string,
    previousPrice: string | undefined
  ) => {
    if (!previousPrice) return "";
    const curr = parseFloat(currentPrice);
    const prev = parseFloat(previousPrice);
    if (curr > prev) return "bg-green-500";
    if (curr < prev) return "bg-red-500";
    return "";
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-800 text-white">
      <h2 className="text-xl font-bold mb-4">Orderbook</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-green-500 font-semibold">Bids</h3>
          {orderbook.bids.slice(0, 10).map((bid: any, index: any) => {
            const prevBid = previousOrderbook.bids[index];
            const rowClass = getRowClass(
              bid.price,
              prevBid ? prevBid.price : undefined
            );
            return (
              <div
                key={index}
                className={`flex justify-between text-green-300 ${rowClass}`}
              >
                <span>{bid.price}</span>
                <span>{bid.quantity}</span>
              </div>
            );
          })}
        </div>
        <div>
          <h3 className="text-red-500 font-semibold">Asks</h3>
          {orderbook.asks.slice(0, 10).map((ask: any, index: any) => {
            const prevAsk = previousOrderbook.asks[index];
            const rowClass = getRowClass(
              ask.price,
              prevAsk ? prevAsk.price : undefined
            );
            return (
              <div
                key={index}
                className={`flex justify-between text-red-300 ${rowClass}`}
              >
                <span>{ask.price}</span>
                <span>{ask.quantity}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orderbook;
