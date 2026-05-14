import { useState, useEffect, useCallback, useRef } from 'react';
import { generateStocks, generateCrypto, generateIndices } from '../data/mockData';

function jitter(base, maxPct = 0.005) {
  return base * (1 + (Math.random() - 0.5) * maxPct);
}

function updateSparkline(sparkline, price) {
  const next = [...sparkline.slice(1), price];
  const avg = next.reduce((a, b) => a + b, 0) / next.length;
  if (Math.abs(avg - price) > avg * 0.3) {
    next[next.length - 1] = avg * 0.7 + price * 0.3;
  }
  return next;
}

export function useTickerData() {
  const [ready, setReady] = useState(false);

  const [state, setState] = useState(() => {
    const stocks = generateStocks();
    const crypto = generateCrypto();
    const indices = generateIndices();
    const all = [
      ...stocks.map((s) => ({ ...s, type: 'stock' })),
      ...crypto.map((c) => ({ ...c, type: 'crypto' })),
    ];
    return { stocks, crypto, indices, all };
  });

  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    setReady(true);
  }, []);

  const tick = useCallback(() => {
    setState((prev) => {
      const updateItems = (items, priceKey, sparkKey) =>
        items.map((item) => {
          const delta = jitter(item[priceKey] * 0.002);
          const newPrice = Math.abs(item[priceKey] + (Math.random() > 0.45 ? delta : -delta));
          const change = newPrice - item[priceKey];
          const changePercent = (change / item[priceKey]) * 100;
          return {
            ...item,
            [priceKey]: newPrice,
            change,
            changePercent,
            [sparkKey]: updateSparkline(item[sparkKey], newPrice),
          };
        });

      const stocks = updateItems(prev.stocks, 'price', 'sparkline');
      const crypto = updateItems(prev.crypto, 'price', 'sparkline');
      const indices = updateItems(prev.indices, 'value', 'sparkline');
      const all = [
        ...stocks.map((s) => ({ ...s, type: 'stock' })),
        ...crypto.map((c) => ({ ...c, type: 'crypto' })),
      ];

      return { stocks, crypto, indices, all };
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(tick, 2000);
    return () => clearInterval(interval);
  }, [tick]);

  return { ...state, ready };
}
