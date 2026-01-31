'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, Download, Heart } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  genre: string;
  url: string;
  cover?: string;
}

const SAMPLE_TRACKS: Track[] = [
  {
    id: 1,
    title: 'Noite de Sucesso',
    artist: 'DJ Flup',
    duration: '3:45',
    genre: 'House',
    url: '#',
    cover: '🎵'
  },
  {
    id: 2,
    title: 'Pista Quente',
    artist: 'DJ Flup',
    duration: '4:20',
    genre: 'Tech House',
    url: '#',
    cover: '🎶'
  },
  {
    id: 3,
    title: 'Energia da Madrugada',
    artist: 'DJ Flup',
    duration: '5:10',
    genre: 'Deep House',
    url: '#',
    cover: '🎤'
  },
  {
    id: 4,
    title: 'Goiânia Elétrica',
    artist: 'DJ Flup',
    duration: '4:55',
    genre: 'Electronic',
    url: '#',
    cover: '⚡'
  },
];

export default function MusicSection() {
  const [playing, setPlaying] = useState<number | null>(null);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = (trackId: number) => {
    if (playing === trackId) {
      setPlaying(null);
    } else {
      setPlaying(trackId);
    }
  };

  const toggleLike = (trackId: number) => {
    const newLiked = new Set(liked);
    if (newLiked.has(trackId)) {
      newLiked.delete(trackId);
    } else {
      newLiked.add(trackId);
    }
    setLiked(newLiked);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="gradient-neon">Ouça as Tracks</span>
            {' '}do DJ Flup
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Mergulhe na melhor seleção de músicas, remixes e produções exclusivas.
            Cada faixa é selecionada com precisão para manter a energia da pista.
          </p>
        </motion.div>

        {/* Playlist */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          variants={containerVariants}
        >
          {SAMPLE_TRACKS.map((track) => (
            <motion.div
              key={track.id}
              variants={itemVariants}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-green-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-green-500/20 hover:border-green-500/50 rounded-xl p-6 transition-all duration-300">
                {/* Track Cover & Play Button */}
                <div className="flex items-center gap-4 mb-4">
                  <motion.button
                    onClick={() => togglePlay(track.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-16 h-16 rounded-lg bg-gradient-to-br from-green-500/30 to-blue-500/30 border border-green-500/50 flex items-center justify-center flex-shrink-0 group/btn hover:border-green-500 transition-all duration-300"
                  >
                    <span className="text-3xl">{track.cover}</span>
                    <div className="absolute inset-0 rounded-lg bg-green-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity blur-md"></div>
                  </motion.button>

                  {/* Track Info */}
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-1">{track.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{track.artist}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 font-semibold">
                        {track.genre}
                      </span>
                      <span className="text-xs text-gray-500">{track.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => togglePlay(track.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/50"
                  >
                    {playing === track.id ? (
                      <>
                        <Pause size={18} />
                        <span>Pausar</span>
                      </>
                    ) : (
                      <>
                        <Play size={18} />
                        <span>Tocar</span>
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    onClick={() => toggleLike(track.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg border transition-all duration-300 ${
                      liked.has(track.id)
                        ? 'bg-pink-500/30 border-pink-500/50 text-pink-400'
                        : 'bg-gray-800/30 border-gray-700 text-gray-400 hover:border-pink-500/50'
                    }`}
                  >
                    <Heart size={18} fill={liked.has(track.id) ? 'currentColor' : 'none'} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/50 text-blue-400 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    <Download size={18} />
                  </motion.button>
                </div>

                {/* Playing Indicator */}
                {playing === track.id && (
                  <motion.div
                    className="mt-4 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full overflow-hidden"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="h-full bg-green-400"
                      animate={{ scaleX: [0, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          variants={itemVariants}
        >
          <p className="text-gray-400 mb-6">
            Quer adicionar sua música ao nosso catálogo? Entre em contato!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/50"
          >
            Conheça Mais Músicas
          </motion.button>
        </motion.div>
      </motion.div>

      <audio ref={audioRef} />
    </section>
  );
}
