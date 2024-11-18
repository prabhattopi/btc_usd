export interface Order {
    price: string;
    quantity: string;
}

export interface OrderbookData {
    bids: Order[];
    asks: Order[];
}
