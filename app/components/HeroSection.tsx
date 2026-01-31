'use client';

import { motion } from 'framer-motion';
import { Play, Zap, Music } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HeroSection() {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00ff41', '#00d4ff', '#ff00ff'],
    });
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
      },
    }),
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            'url(/images/WhatsApp\ Image\ 2026-01-29\ at\ 22.55.24.jpeg)',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
      </div>

      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-green-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Stats Row */}
        <motion.div
          className="flex justify-center gap-8 mb-8 flex-wrap"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <Zap className="text-green-500" size={20} />
            <span className="text-green-500 font-bold">1000+ Shows</span>
          </div>
          <div className="flex items-center gap-2">
            <Music className="text-blue-500" size={20} />
            <span className="text-blue-500 font-bold">10+ Anos</span>
          </div>
        </motion.div>

        {/* Main Title */}
        <div className="mb-6 overflow-hidden">
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            custom={0}
          >
            <motion.span className="gradient-text-neon block">
              DJ FLUP
            </motion.span>
          </motion.h1>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={textVariants}
          custom={1}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6">
            <span className="text-white">A Energia que o seu</span>
            <br />
            <span className="neon-text-blue">Evento Merece</span>
          </h2>
        </motion.div>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={textVariants}
          custom={2}
          className="text-lg sm:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          Transformando pistas em Goiânia com shows de alto impacto visual, leitura de pista única e experiências que seus convidados nunca esquecerão.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={textVariants}
          custom={3}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.a
            href="#music"
            onClick={triggerConfetti}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-neon-green px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 group hover:shadow-lg hover:shadow-green-500/50"
          >
            <Play size={24} className="group-hover:scale-110 transition-transform" />
            Ouça as Tracks
          </motion.a>

          <motion.a
            href="#packages"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-neon-blue px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-blue-500/50"
          >
            Ver Pacotes
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-16"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-center text-gray-400">
            <p className="text-sm mb-2">Role para explorar</p>
            <div className="flex justify-center gap-2">
              <div className="w-1 h-8 border border-green-500 rounded-full opacity-50"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated Gradient Background */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-neon-green to-neon-blue rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />
    </section>
  );
}
