import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CarouselCard } from '../types';
import { MessageCircle, Smartphone, Youtube, Zap, Search, Volume2 } from 'lucide-react';

interface CarouselProps {
  darkMode: boolean;
  onCommandSelect: (command: string) => void;
}

const CAROUSEL_CARDS: CarouselCard[] = [
  {
    id: '1',
    title: 'Open WhatsApp',
    description: 'Launch WhatsApp instantly',
    command: 'Open WhatsApp',
    icon: 'MessageCircle',
    color: 'from-green-400 to-emerald-600'
  },
  {
    id: '2',
    title: 'YouTube Search',
    description: 'Search for any video',
    command: 'Search YouTube for cats',
    icon: 'Youtube',
    color: 'from-red-400 to-pink-600'
  },
  {
    id: '3',
    title: 'System Control',
    description: 'Control device functions',
    command: 'Turn on flashlight',
    icon: 'Zap',
    color: 'from-yellow-400 to-orange-600'
  },
  {
    id: '4',
    title: 'Voice Commands',
    description: 'Talk naturally to BarbraAI',
    command: 'What can you do?',
    icon: 'Volume2',
    color: 'from-purple-400 to-indigo-600'
  }
];

const iconMap = {
  MessageCircle,
  Youtube,
  Zap,
  Volume2,
  Smartphone,
  Search
};

export function Carousel({ darkMode, onCommandSelect }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_CARDS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_CARDS.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_CARDS.length) % CAROUSEL_CARDS.length);
  };

  return (
    <div className="relative h-64 overflow-hidden rounded-2xl mb-8">
      <AnimatePresence mode="wait">
        {CAROUSEL_CARDS.map((card, index) => {
          const isActive = index === currentIndex;
          const IconComponent = iconMap[card.icon as keyof typeof iconMap];

          if (!isActive) return null;

          return (
            <motion.div
              key={card.id}
              initial={{ x: 300, opacity: 0, scale: 0.8 }}
              animate={{ 
                x: 0, 
                opacity: 1, 
                scale: 1,
                rotateY: 0
              }}
              exit={{ 
                x: -300, 
                opacity: 0, 
                scale: 0.8,
                rotateY: -15
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.6
              }}
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} p-6 cursor-pointer transform-gpu`}
              style={{
                boxShadow: darkMode 
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                  : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                perspective: '1000px'
              }}
              onClick={() => onCommandSelect(card.command)}
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                z: 50
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between h-full">
                <div className="flex-1">
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p 
                    className="text-white/80 mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {card.description}
                  </motion.p>
                  <motion.div 
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white inline-block"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    "{card.command}"
                  </motion.div>
                </div>
                <motion.div
                  className="ml-4"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    delay: 0.2
                  }}
                >
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              </div>
              
              {/* 3D depth indicator */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 rounded-2xl pointer-events-none" />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Navigation buttons */}
      <button
        onClick={prevCard}
        className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full ${
          darkMode ? 'bg-white/20' : 'bg-black/20'
        } backdrop-blur-sm flex items-center justify-center text-white hover:scale-110 transition-transform z-10`}
      >
        ‹
      </button>
      <button
        onClick={nextCard}
        className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full ${
          darkMode ? 'bg-white/20' : 'bg-black/20'
        } backdrop-blur-sm flex items-center justify-center text-white hover:scale-110 transition-transform z-10`}
      >
        ›
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {CAROUSEL_CARDS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white w-6' 
                : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}