import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import RippleButton from './RippleButton';

function FloatingOrb({ className, delay = 0, size = 60, color = 'rgba(99,102,241,0.08)' }) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{ width: size, height: size, background: `radial-gradient(circle, ${color}, transparent)` }}
      animate={{
        y: [0, -20, 10, -15, 0],
        x: [0, 10, -15, 5, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{ duration: 8 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouse = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const bgX = useTransform(mouseX, [0, 1], [-15, 15]);
  const bgY = useTransform(mouseY, [0, 1], [-15, 15]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouse}
      className="relative overflow-hidden pt-12 pb-6"
    >
      {/* Floating orbs */}
      <FloatingOrb className="top-20 left-[15%]" size={120} color="rgba(99,102,241,0.06)" />
      <FloatingOrb className="top-40 right-[20%]" size={160} delay={2} color="rgba(139,92,246,0.05)" />
      <FloatingOrb className="bottom-20 left-[40%]" size={100} delay={4} color="rgba(59,130,246,0.04)" />
      <FloatingOrb className="top-10 right-[35%]" size={80} delay={1} color="rgba(168,85,247,0.05)" />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 60%)',
          x: bgX,
          y: bgY,
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[11px] text-ticker-300 mb-6 border border-ticker-500/20"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Live Market Data — Updated every 2s
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            Track the{' '}
            <span className="text-gradient">markets</span>
            <br />
            <span className="relative">
              in real time
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-ticker-500 via-violet-500 to-fuchsia-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
                style={{ transformOrigin: 'left' }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-5 text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            Real-time stock & crypto prices, market indices, and portfolio tracking —
            all in one beautiful, animated dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <RippleButton variant="primary" className="!px-7 !py-2.5 !text-sm">
              Get Started Free
            </RippleButton>
            <RippleButton variant="secondary" className="!px-7 !py-2.5 !text-sm">
              Watch Demo
            </RippleButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
