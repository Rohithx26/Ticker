import { motion } from 'framer-motion';
import Header from './components/Header';
import TickerTape from './components/TickerTape';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import MarketOverview from './components/MarketOverview';
import CryptoCarousel from './components/CryptoCarousel';
import StocksSection from './components/StocksSection';
import Footer from './components/Footer';
import { useTickerData } from './hooks/useTickerData';

function BackgroundLayer() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="text-5xl mb-4"
          animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          📈
        </motion.div>
        <motion.p
          className="text-sm text-gray-500"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading markets...
        </motion.p>
      </div>
    </div>
  );
}

export default function App() {
  const { stocks, crypto, indices, all, ready } = useTickerData();

  return (
    <div className="min-h-screen bg-gray-950 relative">
      <BackgroundLayer />
      {!ready && <LoadingScreen />}

      <div className="relative z-10">
        <Header />
        <TickerTape items={all} />
        <Hero />
        <StatsBar />
        <MarketOverview indices={indices} />
        <CryptoCarousel items={crypto} />
        <StocksSection items={stocks} />
        <Footer />
      </div>
    </div>
  );
}

