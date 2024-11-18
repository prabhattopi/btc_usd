import { useState, useEffect } from "react";
import { createOrderbookWebSocket } from "../services/binancesWebSocket";
import { OrderbookData } from "../utils/constants";

const useOrderbookData = (pair: string): OrderbookData => {
  const [orderbook, setOrderbook] = useState<OrderbookData>({
    bids: [],
    asks: [],
  });

  useEffect(() => {
    const ws = createOrderbookWebSocket(pair, setOrderbook);
    return () => ws.close();
  }, [pair]);

  return orderbook;
};

export default useOrderbookData;
