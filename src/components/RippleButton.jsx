import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function RippleButton({ children, className = '', variant = 'primary', ...props }) {
  const [ripples, setRipples] = useState([]);

  const handleClick = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
      props.onClick?.(e);
    },
    [props.onClick]
  );

  const base = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="animate-ripple absolute rounded-full bg-white/15 pointer-events-none"
          style={{ left: r.x, top: r.y, width: 10, height: 10, marginLeft: -5, marginTop: -5 }}
        />
      ))}
      <span className="relative z-[1]">{children}</span>
    </motion.button>
  );
}
