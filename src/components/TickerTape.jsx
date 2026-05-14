import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function TickerItem({ item }) {
  const isUp = item.direction !== 'down';

  return (
    <motion.div
      layout
      className="flex items-center gap-2.5 px-4 py-1.5 whitespace-nowrap"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <span className="font-semibold text-xs text-gray-200">{item.symbol}</span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={Math.round(item.price * 100)}
          initial={{ y: isUp ? 8 : -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: isUp ? -8 : 8, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="text-xs font-mono tabular-nums text-gray-400"
        >
          {item.price.toLocaleString(undefined, {
            minimumFractionDigits: item.price < 1 ? 4 : item.price < 100 ? 2 : 2,
            maximumFractionDigits: item.price < 1 ? 4 : item.price < 100 ? 2 : 2,
          })}
        </motion.span>
      </AnimatePresence>
      <motion.span
        key={item.changePercent}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
          isUp ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'
        }`}
      >
        {isUp ? '+' : ''}
        {item.changePercent.toFixed(2)}%
      </motion.span>
    </motion.div>
  );
}

export default function TickerTape({ items }) {
  const [isPaused, setIsPaused] = useState(false);
  const doubled = [...items, ...items, ...items];

  return (
    <div className="relative mt-16 overflow-hidden">
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-gray-950 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-gray-950 to-transparent" />

        {/* Top border line with gradient */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-ticker-500/20 to-transparent" />

        <motion.div
          className="flex py-2"
          animate={isPaused ? { x: 0 } : { x: '-33.333%' }}
          transition={
            isPaused
              ? { duration: 0.3 }
              : { duration: 40, ease: 'linear', repeat: Infinity }
          }
        >
          <div className="flex shrink-0">
            {doubled.map((item, i) => (
              <TickerItem key={`${item.symbol}-${i}`} item={item} />
            ))}
          </div>
        </motion.div>

        {/* Bottom border line with gradient */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-ticker-500/20 to-transparent" />
      </div>
    </div>
  );
}
