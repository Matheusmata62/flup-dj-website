'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappUrl = 'https://wa.me/5562999999999?text=Olá%20flup!%20Gostaria%20de%20conhecer%20seus%20pacotes%20de%20DJ.';

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-40"
    >
      <div className="relative">
        {/* Animated Background Circle */}
        <motion.div
          className="absolute inset-0 rounded-full bg-neon-green/20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        {/* Main Button */}
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-neon-green to-neon-blue flex items-center justify-center shadow-lg border-2 border-neon-green/50 neon-glow-green">
          <MessageCircle size={32} className="text-black" />
        </div>
      </div>

      {/* Floating Label */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-neon-green text-black px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap pointer-events-none"
      >
        Chat com DJ flup
      </motion.div>
    </motion.a>
  );
}
