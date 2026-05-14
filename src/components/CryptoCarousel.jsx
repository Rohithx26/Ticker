import { motion } from 'framer-motion';
import PriceCard from './PriceCard';

function FeaturedCoin({ item }) {
  const isUp = item.change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6 sm:p-8 mb-6 border border-gray-800/30 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-600/5 pointer-events-none" />

      {/* Animated orbs */}
      <motion.div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.1), transparent)' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <motion.div
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center text-2xl font-bold text-amber-400"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {item.symbol === 'BTC' ? '₿' : item.symbol[0]}
          </motion.div>
          <div>
            <p className="text-lg font-bold text-gray-100">{item.name}</p>
            <p className="text-sm text-gray-500">{item.symbol}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-0.5">Price</p>
            <p className="text-2xl font-bold font-mono tabular-nums">
              ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-0.5">24h Change</p>
            <p className={`text-lg font-bold ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
              {isUp ? '+' : ''}{item.changePercent.toFixed(2)}%
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-medium shadow-lg shadow-amber-600/20 hover:shadow-amber-600/30 transition-shadow"
        >
          Trade Now
        </motion.button>
      </div>

      {/* Bottom glow bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{ transformOrigin: 'center' }}
      />
    </motion.div>
  );
}

export default function CryptoCarousel({ items }) {
  const featured = items[0];

  return (
    <section id="crypto" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-gradient-to-b from-amber-400 via-orange-500 to-rose-500 rounded-full" />
          <h2 className="text-lg font-semibold text-gray-200">Cryptocurrency</h2>
        </div>
        <motion.a
          href="#"
          className="text-xs text-ticker-400 hover:text-ticker-300 transition-colors flex items-center gap-1"
          whileHover={{ x: 3 }}
        >
          View All
          <span className="text-[10px]">→</span>
        </motion.a>
      </motion.div>

      {featured && <FeaturedCoin item={featured} />}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.slice(1).map((item, i) => (
          <PriceCard key={item.symbol} item={item} index={i} isCrypto />
        ))}
      </div>
    </section>
  );
}
