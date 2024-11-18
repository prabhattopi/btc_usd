"use client";

import { OrderbookData } from "@/app/utils/constants";



interface ImbalanceIndicatorProps {
  orderbook: OrderbookData;
}

const ImbalanceIndicator: React.FC<ImbalanceIndicatorProps> = ({
  orderbook,
}) => {
  const bidSum = orderbook.bids.reduce(
    (acc, bid) => acc + parseFloat(bid.quantity),
    0
  );
  const askSum = orderbook.asks.reduce(
    (acc, ask) => acc + parseFloat(ask.quantity),
    0
  );
  const imbalance = ((bidSum - askSum) / (bidSum + askSum)) * 100;

  return (
    <div className="p-4 mb-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-lg font-semibold">Orderbook Imbalance</h2>
      <p className="text-2xl font-bold">{imbalance.toFixed(2)}%</p>
    </div>
  );
};

export default ImbalanceIndicator;
