import { motion, AnimatePresence } from 'framer-motion';
import Sparkline from './Sparkline';

function IndexCard({ item, index }) {
  const isUp = item.change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 60 }}
      className="glass rounded-xl px-5 py-4 group hover:bg-gray-800/30 transition-all duration-300 cursor-default border border-gray-800/20"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-[10px] font-semibold text-gray-500 tracking-[0.15em] uppercase">
              {item.name}
            </p>
            {index === 0 && (
              <span className="text-[8px] px-1 py-0.5 rounded bg-ticker-500/10 text-ticker-400 font-medium">
                LIVE
              </span>
            )}
          </div>
          <AnimatePresence mode="popLayout">
            <motion.p
              key={Math.round(item.value * 100)}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-xl font-bold font-mono tabular-nums"
            >
              {item.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-end gap-1">
          <motion.div
            key={item.changePercent}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-2.5 py-1 rounded-lg ${
              isUp ? 'bg-emerald-400/10' : 'bg-red-400/10'
            }`}
          >
            <p className={`text-xs font-bold ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
              {isUp ? '+' : ''}{item.changePercent.toFixed(2)}%
            </p>
            <p className={`text-[10px] ${isUp ? 'text-emerald-400/60' : 'text-red-400/60'}`}>
              {isUp ? '+' : ''}{item.change.toFixed(2)}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mt-2 opacity-40 group-hover:opacity-70 transition-opacity duration-300">
        <Sparkline data={item.sparkline} trend={isUp ? 'up' : 'down'} width={120} height={24} />
      </div>
    </motion.div>
  );
}

export default function MarketOverview({ indices }) {
  return (
    <section id="markets" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-ticker-500 rounded-full" />
        <h2 className="text-lg font-semibold text-gray-200">Market Indices</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {indices.map((item, i) => (
          <IndexCard key={item.name} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
