import { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

function CountUp({ end, suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [displayed, setDisplayed] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, end, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (val) => {
        setDisplayed(val.toFixed(decimals) + suffix);
      },
    });
    return () => controls.stop();
  }, [inView, end, suffix, decimals]);

  return (
    <span ref={ref} className="text-2xl sm:text-3xl font-bold text-gradient">
      {displayed}
    </span>
  );
}

const stats = [
  { label: 'Markets Covered', end: 12000, suffix: '+' },
  { label: 'Data Updates', value: 'Real-time' },
  { label: 'Active Users', end: 2.4, suffix: 'M+', decimals: 1 },
  { label: 'Uptime SLA', end: 99.99, suffix: '%', decimals: 2 },
];

export default function StatsBar() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="glass rounded-2xl p-6 sm:p-8 border border-gray-800/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              {stat.value ? (
                <motion.p
                  className="text-2xl sm:text-3xl font-bold text-gradient"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2, type: 'spring', stiffness: 150 }}
                >
                  {stat.value}
                </motion.p>
              ) : (
                <CountUp end={stat.end} suffix={stat.suffix} decimals={stat.decimals || 0} />
              )}
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
