import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '../hooks/useScrollProgress';
import RippleButton from './RippleButton';

const navLinks = [
  { label: 'Markets', href: '#markets' },
  { label: 'Crypto', href: '#crypto' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'News', href: '#news' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState(0);
  const progress = useScrollProgress();

  const isScrolled = progress > 0.02;

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-strong' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <motion.a
          href="/"
          className="flex items-center gap-2.5 group"
          whileHover={{ scale: 1.02 }}
        >
          <motion.span
            className="text-2xl"
            animate={{ rotate: [0, -6, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            📈
          </motion.span>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-gradient">Ticker</span>
          </span>
        </motion.a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i + 0.15 }}
              onClick={() => setActive(i)}
              className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                active === i ? 'text-gray-100' : 'text-gray-500 hover:text-gray-300'
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.label}
              {active === i && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-gray-800/50 rounded-lg -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <RippleButton className="!px-4 !py-1.5 !text-xs hidden sm:inline-flex">
            Connect Wallet
          </RippleButton>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            aria-label="Menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-full bg-gray-400 rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 w-full bg-gray-400 rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-full bg-gray-400 rounded-full"
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden glass-strong border-t border-gray-800/40"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => { setActive(i); setMobileOpen(false); }}
                  className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                    active === i ? 'text-gray-100 bg-gray-800/50' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <RippleButton className="w-full !mt-4 sm:hidden">Connect Wallet</RippleButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-ticker-500 via-violet-500 to-fuchsia-500"
        style={{ scaleX: progress, transformOrigin: 'left' }}
      />
    </motion.header>
  );
}
