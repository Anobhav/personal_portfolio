import { useEffect, useState } from 'react';

export default function BubbleBackground() {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const generatedBubbles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 4,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: Math.random() * 10 + 10,
    }));
    setBubbles(generatedBubbles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <span
          key={bubble.id}
          z
          className="absolute bottom-0 rounded-full bg-teal-300 opacity-0 animate-float-up"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
            animationFillMode: 'backwards',
            boxShadow: '0 0 10px 3px rgba(20, 184, 166, 0.6), 0 0 20px 6px rgba(20, 184, 166, 0.3)',
          }}
        />
      ))}
    </div>
  );
}