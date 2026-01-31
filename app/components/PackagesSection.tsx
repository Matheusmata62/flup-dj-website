'use client';

import { motion } from 'framer-motion';
import { Check, Star, Zap } from 'lucide-react';
import { useState } from 'react';

const packages = [
  {
    id: 1,
    name: 'Básico',
    price: 250,
    description: 'Perfeito para eventos menores',
    features: [
      '1 hora de set',
      'Vídeo simples',
      'Foco em custo-benefício',
      'Sem efeitos visuais',
      'Suporte básico',
    ],
    highlighted: false,
    color: 'green',
  },
  {
    id: 2,
    name: 'Intermediário',
    price: 600,
    description: 'O mais popular entre nossos clientes',
    features: [
      '2 horas de set',
      'After Movie (vídeo editado)',
      'Material de marketing',
      'Leitura de pista avançada',
      'Equipamento premium',
      'Suporte dedicado',
    ],
    highlighted: true,
    badge: 'Mais Popular',
    color: 'blue',
  },
  {
    id: 3,
    name: 'Completo',
    price: 1600,
    description: 'Experiência premium e inesquecível',
    features: [
      'Up to 4 horas de set',
      'Experiência Premium',
      'Dançarinos profissionais',
      'Efeitos visuais (Sparkles, Laser)',
      'Produção de conteúdo',
      'Consultoria de evento',
      'VIP experience setup',
    ],
    highlighted: false,
    color: 'green',
  },
];

export default function PackagesSection() {
  const [hoveredPackage, setHoveredPackage] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="packages" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            <span className="neon-text-blue">Pacotes de</span>
            <br />
            <span className="text-white">Apresentação</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Escolha o pacote ideal para transformar seu evento em uma experiência inesquecível.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredPackage(pkg.id)}
              onMouseLeave={() => setHoveredPackage(null)}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 perspective-3d ${
                pkg.highlighted
                  ? 'md:scale-105'
                  : ''
              }`}
              style={{
                background: pkg.highlighted
                  ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 255, 65, 0.05))'
                  : 'linear-gradient(135deg, rgba(26, 26, 26, 0.8), rgba(15, 15, 15, 0.8))',
              }}
            >
              {/* Glow Background */}
              {hoveredPackage === pkg.id && (
                <motion.div
                  className={`absolute inset-0 ${pkg.color === 'blue' ? 'bg-gradient-to-r from-blue-500/20 to-blue-500/5' : 'bg-gradient-to-r from-green-500/20 to-green-500/5'} blur-xl`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Border Glow */}
              <motion.div
                className={`absolute inset-0 rounded-2xl border-2 pointer-events-none ${
                  pkg.highlighted
                    ? 'border-blue-500'
                    : 'border-green-500'
                }`}
                initial={{ opacity: 0.1 }}
                animate={{ 
                  opacity: hoveredPackage === pkg.id ? 0.5 : 0.1,
                  boxShadow: hoveredPackage === pkg.id 
                    ? `0 0 30px ${pkg.color === 'blue' ? '#00d4ff' : '#00ff41'}`
                    : 'none'
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Badge */}
              {pkg.badge && (
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', delay: 0.3 }}
                  className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-green-500 px-4 py-2 text-black font-bold text-sm rounded-bl-xl flex items-center gap-1 shadow-lg shadow-blue-500/50"
                >
                  <Star size={16} fill="currentColor" />
                  {pkg.badge}
                </motion.div>
              )}

              <div className="p-8 relative z-10">
                {/* Header */}
                <h3 className="text-2xl font-black mb-2 text-white">{pkg.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{pkg.description}</p>

                {/* Price */}
                <motion.div
                  className="mb-8"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-5xl font-black mb-2">
                    <span className={pkg.color === 'blue' ? 'neon-text-blue' : 'neon-text-green'}>
                      R$ {pkg.price}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">por evento</p>
                </motion.div>

                {/* CTA Button */}
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg font-bold mb-8 transition-all duration-300 block text-center flex items-center justify-center gap-2 ${
                    pkg.highlighted
                      ? 'btn-neon-blue hover:shadow-lg hover:shadow-blue-500/50'
                      : 'btn-neon-green hover:shadow-lg hover:shadow-green-500/50'
                  }`}
                >
                  <Zap size={18} />
                  Selecionar
                </motion.a>

                {/* Features */}
                <div className="space-y-4">
                  {pkg.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: featureIndex * 0.05 }}
                      className="flex items-start gap-3 group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        className={`mt-1 flex-shrink-0 ${pkg.color === 'blue' ? 'text-blue-400' : 'text-green-400'}`}
                      >
                        <Check size={20} />
                      </motion.div>
                      <span className="text-gray-300 group-hover:text-white transition-colors">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400">
            ✨ Preços incluem suporte e consultoria. Pacotes customizados disponíveis!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
