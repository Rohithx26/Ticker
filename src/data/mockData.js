function generateSparkline(len = 20) {
  let val = 50 + Math.random() * 50;
  return Array.from({ length: len }, () => {
    val += (Math.random() - 0.48) * 6;
    return Math.max(val, 5);
  });
}

const stockNames = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corp.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.' },
  { symbol: 'META', name: 'Meta Platforms' },
  { symbol: 'JPM', name: 'JPMorgan Chase' },
  { symbol: 'V', name: 'Visa Inc.' },
  { symbol: 'JNJ', name: 'Johnson & Johnson' },
];

const cryptoNames = [
  { symbol: 'BTC', name: 'Bitcoin' },
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'SOL', name: 'Solana' },
  { symbol: 'XRP', name: 'Ripple' },
  { symbol: 'DOGE', name: 'Dogecoin' },
  { symbol: 'ADA', name: 'Cardano' },
  { symbol: 'DOT', name: 'Polkadot' },
  { symbol: 'AVAX', name: 'Avalanche' },
];

const indexNames = [
  { name: 'S&P 500', abbrev: 'SPX' },
  { name: 'NASDAQ', abbrev: 'NDX' },
  { name: 'DOW JONES', abbrev: 'DJI' },
  { name: 'RUSSELL 2000', abbrev: 'RUT' },
];

export function generateStocks() {
  return stockNames.map((s) => ({
    ...s,
    price: +(Math.random() * 900 + 50).toFixed(2),
    change: 0,
    changePercent: 0,
    sparkline: generateSparkline(30),
    volume: Math.floor(Math.random() * 50_000_000 + 1_000_000),
    high: 0,
    low: 0,
    open: 0,
    prevClose: 0,
  }));
}

export function generateCrypto() {
  const basePrices = { BTC: 45000, ETH: 3200, SOL: 150, XRP: 0.62, DOGE: 0.087, ADA: 0.52, DOT: 7.89, AVAX: 38 };
  return cryptoNames.map((c) => ({
    ...c,
    price: basePrices[c.symbol] || +(Math.random() * 500).toFixed(2),
    change: 0,
    changePercent: 0,
    sparkline: generateSparkline(30),
    marketCap: Math.floor(Math.random() * 1_000_000_000_000 + 100_000_000),
    volume: Math.floor(Math.random() * 100_000_000_000 + 10_000_000),
  }));
}

export function generateIndices() {
  const baseValues = { SPX: 5432, NDX: 17123, DJI: 38912, RUT: 2045 };
  return indexNames.map((i) => ({
    ...i,
    value: baseValues[i.abbrev] || +(Math.random() * 10000 + 1000).toFixed(2),
    change: 0,
    changePercent: 0,
    sparkline: generateSparkline(30),
  }));
}
