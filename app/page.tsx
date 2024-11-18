"use client";
import { useState } from "react";
import MarketDepthChart from "@/components/MarketDepthChart";
import Orderbook from "@/components/OrderBook";
import SpreadIndicator from "@/components/SpreadIndicator";
import ImbalanceIndicator from "@/components/ImbalanceIndicator";
import useOrderbookData from "./hooks/useOrderBookData";

export default function Home() {
  const [pair, setPair] = useState("BTC-USD");
  const orderbook = useOrderbookData(pair);

  const handlePairChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPair(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-white mb-4">
        {pair} Orderbook
      </h1>
      <div className="flex justify-center mb-4">
        <select
          value={pair}
          onChange={handlePairChange}
          className="bg-gray-800 text-white p-2 rounded"
        >
          <option value="BTC-USD">BTC-USD</option>
          <option value="ETH-USD">ETH-USD</option>
          <option value="XRP-USD">XRP-USD</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SpreadIndicator orderbook={orderbook} />
        <ImbalanceIndicator orderbook={orderbook} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MarketDepthChart orderbook={orderbook} />
        <Orderbook orderbook={orderbook} />
      </div>
    </div>
  );
}
