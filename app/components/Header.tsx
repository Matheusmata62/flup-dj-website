'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Sobre', href: '#about' },
    { name: 'Pacotes', href: '#packages' },
    { name: 'Contato', href: '#contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-neon-green/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0"
          >
            <div className="text-3xl font-black neon-text-green">
              flup
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-gray-300 hover:text-neon-green transition-colors duration-300"
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex items-center gap-3"
          >
            <Link href="/admin/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm border border-neon-blue text-neon-blue hover:bg-neon-blue/10 transition-all"
              >
                <LogIn size={16} />
                Admin
              </motion.button>
            </Link>
            <a
              href="#contact"
              className="btn-neon-green px-6 py-2 rounded-full font-bold text-sm"
            >
              Reserve sua Data
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="md:hidden text-neon-green"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <nav className="flex flex-col space-y-4 pb-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-neon-green transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Link href="/admin/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm border border-neon-blue text-neon-blue hover:bg-neon-blue/10 transition-all w-fit"
                onClick={() => setIsOpen(false)}
              >
                <LogIn size={16} />
                Admin
              </motion.button>
            </Link>
            <a
              href="#contact"
              className="btn-neon-green px-6 py-2 rounded-full font-bold text-sm inline-block w-fit"
              onClick={() => setIsOpen(false)}
            >
              Reserve sua Data
            </a>
          </nav>
        </motion.div>
      </div>
    </header>
  );
}
