# Cryptocurrency Orderbook Dashboard

## Overview

This project is a **real-time cryptocurrency trading dashboard** built with Next.js and React. It provides traders and enthusiasts with up-to-date market data for various trading pairs, such as **BTC-USD**, **ETH-USD**, and **XRP-USD**. The application displays a live orderbook, market depth chart, spread indicator, and orderbook imbalance indicator, all updating in real-time via WebSocket connections to the Binance API.

## Features

- **Real-Time Orderbook Display**
  - Shows the top 10 best bids and asks for the selected trading pair.
  - Updates live using Binance's WebSocket API.

- **Spread Indicator**
  - Live graph plotting the bid-ask spread over a rolling 1-minute period.
  - Updates with every orderbook update.

- **Orderbook Imbalance Indicator**
  - Calculates the percentage difference between total bid and ask volumes.
  - Provides insight into market sentiment.

- **Market Depth Chart**
  - Live, non-historical line graph representing the current market depth.
  - Displays cumulative bid and ask quantities at different price levels.
  - Updates with each orderbook update.

- **Responsive Design**
  - User-friendly interface across various screen sizes, from mobile devices to desktops.
  - Utilizes Tailwind CSS for styling and responsiveness.

- **Bonus Features**
  - **Color-Coding and Visual Cues**
    - Highlights significant changes in the orderbook with color cues.
  - **Trading Pair Selection**
    - Allows users to switch between different trading pairs (BTC-USD, ETH-USD, XRP-USD).

## Assumptions Made

- **API Reliability**: Assumes that the Binance WebSocket API is reliable and provides continuous real-time data.
- **Data Availability**: Assumes that real-time data is available for the selected trading pairs.
- **Browser Compatibility**: Assumes users are using modern browsers that support WebSockets and the latest web technologies.
- **Performance**: Assumes that the real-time updates and data processing are acceptable for demonstration purposes and do not require extensive optimization for high-load scenarios.

## Libraries and Tools Used

- **Next.js**: For server-side rendering and routing.
- **React**: For building the user interface.
- **TypeScript**: For type safety and code reliability.
- **Tailwind CSS**: For styling and responsive design.
- **Chart.js** and **react-chartjs-2**: For rendering interactive charts.
- **chartjs-adapter-date-fns** and **date-fns**: For date and time handling in charts.
- **Binance WebSocket API**: For real-time data streaming.
- **ESLint** and **Prettier**: For code linting and formatting.

## Installation and Running Locally

### Prerequisites

- **Node.js** (version 14 or above)
- **npm** (version 6 or above)

### Steps

**Start the Project in local**

   ```bash
   git clone https://github.com/prabhattopi/btc_usd.git
   cd frontend
   npm run dev
   ```