import { OrderbookData } from "../utils/constants";

const symbolMap: { [key: string]: string } = {
  "BTC-USD": "btcusdt",
  "ETH-USD": "ethusdt",
  "XRP-USD": "xrpusdt",
};

export const createOrderbookWebSocket = (
  pair: string,
  onMessage: (data: OrderbookData) => void
): WebSocket => {
  const symbol = symbolMap[pair];
  const WEBSOCKET_URL = `wss://stream.binance.com:9443/ws/${symbol}@depth10@100ms`;
  const ws = new WebSocket(WEBSOCKET_URL);

  ws.onopen = () => {
    console.log(`Connected to Binance WebSocket for ${pair}`);
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage({
      bids: data.bids.map(([price, quantity]: [string, string]) => ({
        price,
        quantity,
      })),
      asks: data.asks.map(([price, quantity]: [string, string]) => ({
        price,
        quantity,
      })),
    });
  };

  ws.onclose = () => {
    console.log(`Disconnected from Binance WebSocket for ${pair}`);
  };

  return ws;
};
