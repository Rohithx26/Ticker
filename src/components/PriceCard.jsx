import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sparkline from './Sparkline';

const iconMap = {
  BTC: '₿', ETH: '⟠', SOL: '◎', XRP: '✕',
  DOGE: 'Ð', ADA: '₳', DOT: '●', AVAX: '▲',
};

export default function PriceCard({ item, index = 0, isCrypto = false }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const isUp = item.change >= 0;

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: -y * 12, y: x * 12 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.04, type: 'spring', stiffness: 90, damping: 16 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: rotate.x, rotateY: rotate.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="perspective-1000"
      >
        <div
          className={`relative overflow-hidden rounded-2xl p-5 cursor-pointer transition-shadow duration-500 ${
            isHovered ? 'shadow-2xl shadow-black/30' : 'shadow-lg shadow-black/10'
          }`}
          style={{
            background: isHovered
              ? 'linear-gradient(145deg, rgba(17,24,39,0.85), rgba(17,24,39,0.95))'
              : 'linear-gradient(145deg, rgba(17,24,39,0.6), rgba(17,24,39,0.8))',
            border: '1px solid',
            borderColor: isHovered
              ? isUp ? 'rgba(52,211,153,0.2)' : 'rgba(248,113,113,0.2)'
              : 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 pointer-events-none shimmer" />

          {/* Glow effect */}
          <motion.div
            className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl pointer-events-none`}
            animate={{
              opacity: isHovered ? 0.15 : 0,
              scale: isHovered ? 1 : 0.5,
            }}
            transition={{ duration: 0.4 }}
            style={{
              background: isUp
                ? 'radial-gradient(circle, rgba(52,211,153,0.4), transparent)'
                : 'radial-gradient(circle, rgba(248,113,113,0.4), transparent)',
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={isHovered ? { scale: 1.1, rotate: [0, -8, 8, 0] } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${
                    isCrypto
                      ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/20 text-amber-400'
                      : 'bg-gradient-to-br from-ticker-500/20 to-violet-600/20 text-ticker-400'
                  }`}
                >
                  {isCrypto ? iconMap[item.symbol] || item.symbol[0] : item.symbol[0]}
                </motion.div>
                <div>
                  <p className="font-semibold text-sm text-gray-100">{item.symbol}</p>
                  <p className="text-[11px] text-gray-500 truncate max-w-[90px]">{item.name}</p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                  isUp
                    ? 'bg-emerald-400/10 text-emerald-400'
                    : 'bg-red-400/10 text-red-400'
                }`}
              >
                {isUp ? '↑' : '↓'}
              </motion.div>
            </div>

            <AnimatePresence mode="popLayout">
              <motion.p
                key={Math.round(item.price * 100)}
                initial={{ y: isUp ? -14 : 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 250, damping: 22 }}
                className="text-2xl font-bold font-mono tabular-nums tracking-tight"
              >
                ${item.price.toLocaleString(undefined, {
                  minimumFractionDigits: item.price < 1 ? 4 : 2,
                  maximumFractionDigits: item.price < 1 ? 4 : 2,
                })}
              </motion.p>
            </AnimatePresence>

            <div className="flex items-center gap-2 mt-2">
              <motion.div
                key={item.changePercent}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${
                  isUp
                    ? 'text-emerald-400 bg-emerald-400/10'
                    : 'text-red-400 bg-red-400/10'
                }`}
              >
                <span className="text-[10px]">{isUp ? '▲' : '▼'}</span>
                {isUp ? '+' : ''}{item.changePercent.toFixed(2)}%
              </motion.div>
              <motion.span
                key={item.change.toFixed(2)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[11px] text-gray-500"
              >
                {isUp ? '+' : ''}${Math.abs(item.change).toFixed(2)}
              </motion.span>
            </div>

            {/* Sparkline */}
            <div className="mt-2 -mb-1 opacity-60">
              <Sparkline
                data={item.sparkline}
                trend={isUp ? 'up' : 'down'}
                width={80}
                height={22}
              />
            </div>

            {/* Bottom glow bar */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
              animate={{
                background: isUp
                  ? 'linear-gradient(90deg, transparent, #34d399, transparent)'
                  : 'linear-gradient(90deg, transparent, #f87171, transparent)',
                scaleX: isHovered ? 1 : 0,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.35 }}
              style={{ transformOrigin: 'center' }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
