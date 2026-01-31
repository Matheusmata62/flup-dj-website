'use client';

import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube, Music, ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/djflup',
      icon: Instagram,
      color: 'hover:text-pink-400',
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/djflup',
      icon: Facebook,
      color: 'hover:text-blue-400',
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@djflup',
      icon: Youtube,
      color: 'hover:text-red-400',
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <footer className="relative bg-dark-charcoal border-t border-neon-green/20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-black neon-text-green mb-4 flex items-center gap-2 w-fit"
            >
              <Music size={32} />
              <span>flup</span>
            </motion.div>
            <p className="text-gray-400 text-sm leading-relaxed">
              DJ especializado em criar experiências visuais e sonoras de alto impacto. Transformando eventos em Goiânia desde 2020.
            </p>
            <motion.div
              className="mt-4 text-xs text-gray-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              ✨ 1000+ Shows | 10+ Anos de Experiência
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Galeria', href: '#gallery' },
                { name: 'Músicas', href: '#music' },
                { name: 'Pacotes', href: '#packages' },
                { name: 'Contato', href: '#contact' },
              ].map((link, idx) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm font-medium"
                  >
                    → {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Redes Sociais
            </h4>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((link, idx) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br from-dark-gray to-dark-charcoal hover:from-green-500/30 hover:to-blue-500/30 border border-dark-gray hover:border-green-500/50 transition-all flex items-center justify-center group ${link.color}`}
                    title={link.name}
                  >
                    <Icon size={22} />
                  </motion.a>
                );
              })}
            </div>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-black font-bold rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              <ArrowUp size={18} />
              Voltar ao Topo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="border-t border-dark-gray my-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500"
        >
          <motion.p whileHover={{ color: '#00ff41' }} className="transition-colors">
            &copy; {currentYear} DJ flup. Todos os direitos reservados.
          </motion.p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, color: '#00ff41' }}
              className="transition-colors"
            >
              Política de Privacidade
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, color: '#00ff41' }}
              className="transition-colors"
            >
              Termos de Serviço
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
