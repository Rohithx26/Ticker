import { motion } from 'framer-motion';
import PriceCard from './PriceCard';

export default function StocksSection({ items }) {
  return (
    <section id="markets" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-gradient-to-b from-ticker-400 via-violet-500 to-fuchsia-500 rounded-full" />
          <h2 className="text-lg font-semibold text-gray-200">Top Stocks</h2>
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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {items.slice(0, 10).map((item, i) => (
          <PriceCard key={item.symbol} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
