'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    title: 'Performance ao Vivo',
    category: 'Performance',
    url: '/images/WhatsApp Image 2026-01-29 at 22.55.17.jpeg',
  },
  {
    id: 2,
    title: 'Show com Efeitos',
    category: 'Show',
    url: '/images/WhatsApp Image 2026-01-29 at 22.55.24.jpeg',
  },
  {
    id: 3,
    title: 'Multidão Vibrante',
    category: 'Lifestyle',
    url: '/images/WhatsApp Image 2026-01-29 at 22.55.17 (1).jpeg',
  },
  {
    id: 4,
    title: 'Lifestyle Premium',
    category: 'Setup',
    url: '/images/WhatsApp Image 2026-01-29 at 22.55.17 (2).jpeg',
  },
  {
    id: 5,
    title: 'Energia do Show',
    category: 'Efeitos',
    url: '/images/WhatsApp Image 2026-01-29 at 22.55.24.jpeg',
  },
  {
    id: 6,
    title: 'Momento Premium',
    category: 'Performance',
    url: '/images/WhatsApp Image 2026-01-29 at 22.55.17.jpeg',
  },
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('Tudo');

  const categories = ['Tudo', 'Performance', 'Show', 'Lifestyle', 'Setup', 'Efeitos'];
  const filteredImages = filter === 'Tudo' ? galleryImages : galleryImages.filter(img => img.category === filter);

  const currentIndex = selectedImage !== null ? filteredImages.findIndex(img => img.id === selectedImage) : 0;

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex].id);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex].id);
  };

  return (
    <section id="gallery" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-dark-gray to-black">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            <span className="neon-text-green">Galeria</span>
            <span className="text-white"> de Experiências</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Momentos incríveis capturados em eventos com DJ flup. Veja a energia e o impacto que criamos.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                filter === category
                  ? 'bg-green-500 text-black shadow-lg shadow-green-500/50'
                  : 'bg-dark-gray border border-green-500/20 text-white hover:border-green-500/50'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          layout
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImage(image.id)}
                className={`relative group cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
                  index === 0 || index === 4 ? 'md:col-span-1 md:row-span-2' : ''
                }`}
                style={{ minHeight: index === 0 || index === 4 ? '400px' : '250px' }}
              >
                {/* Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-blue-500/0 to-green-500/0 group-hover:from-green-500/20 group-hover:via-blue-500/20 group-hover:to-green-500/20 transition-all duration-300 blur-xl opacity-0 group-hover:opacity-100"></div>

                {/* Image */}
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 flex flex-col items-end justify-end p-6">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-right w-full">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-green-400 font-bold text-sm mb-2">{image.category}</p>
                      <h3 className="text-white font-black text-lg">{image.title}</h3>
                    </motion.div>
                  </div>
                </div>

                {/* Neon Border */}
                <motion.div
                  className="absolute inset-0 border-2 border-green-500/0 group-hover:border-green-500/50 transition-all duration-300 rounded-lg pointer-events-none"
                  initial={{ borderColor: 'rgba(0, 255, 65, 0)' }}
                  whileHover={{ borderColor: 'rgba(0, 255, 65, 0.5)' }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all"
              >
                <X size={24} />
              </motion.button>

              {/* Image */}
              <img
                src={filteredImages[currentIndex]?.url}
                alt={filteredImages[currentIndex]?.title}
                className="w-full rounded-lg"
              />

              {/* Info */}
              <motion.div
                className="mt-4 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-green-400 font-bold mb-2">{filteredImages[currentIndex]?.category}</p>
                <h3 className="text-white font-black text-2xl mb-4">{filteredImages[currentIndex]?.title}</h3>
                <p className="text-gray-400">
                  {currentIndex + 1} de {filteredImages.length}
                </p>
              </motion.div>

              {/* Navigation */}
              <div className="flex justify-center gap-4 mt-6">
                <motion.button
                  onClick={handlePrev}
                  whileHover={{ scale: 1.1 }}
                  className="bg-green-500 hover:bg-green-600 text-black p-3 rounded-full transition-all"
                >
                  <ChevronLeft size={24} />
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.1 }}
                  className="bg-green-500 hover:bg-green-600 text-black p-3 rounded-full transition-all"
                >
                  <ChevronRight size={24} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
