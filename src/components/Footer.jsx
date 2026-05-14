import { motion } from 'framer-motion';
import RippleButton from './RippleButton';

const columns = [
  {
    title: 'Markets',
    links: ['Stocks', 'Crypto', 'Forex', 'Futures', 'Indices'],
  },
  {
    title: 'Tools',
    links: ['Charts', 'Screeners', 'Calendar', 'Heat Map', 'Scanner'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press', 'Blog', 'Brand'],
  },
  {
    title: 'Support',
    links: ['Help Center', 'API Docs', 'Status', 'Contact', 'Community'],
  },
];

const socials = [
  { name: 'Twitter', icon: '𝕏' },
  { name: 'GitHub', icon: '◇' },
  { name: 'Discord', icon: '◆' },
  { name: 'Telegram', icon: '☰' },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-gray-800/40 mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {columns.map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.06 }}
            >
              <h3 className="text-[10px] font-semibold text-gray-600 uppercase tracking-[0.2em] mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
            className="col-span-2 md:col-span-1"
          >
            <h3 className="text-[10px] font-semibold text-gray-600 uppercase tracking-[0.2em] mb-4">
              Newsletter
            </h3>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">
              Get market updates straight to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-gray-900/60 border border-gray-800/50 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-ticker-500/40 focus:ring-1 focus:ring-ticker-500/20 transition-all"
              />
              <RippleButton variant="primary" className="!px-3 !py-2 !text-xs shrink-0">
                →
              </RippleButton>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-6 border-t border-gray-800/30 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">📈</span>
            <span className="text-sm font-bold">
              <span className="text-gradient">Ticker</span>
            </span>
            <span className="text-xs text-gray-600 ml-2">
              © {new Date().getFullYear()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <motion.a
                key={s.name}
                href="#"
                title={s.name}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs text-gray-600 hover:text-gray-300 hover:bg-gray-800/40 transition-all duration-200"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          <p className="text-[10px] text-gray-700">
            Data is simulated for demonstration.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
