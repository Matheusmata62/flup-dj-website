'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    location: '',
    package: 'intermediário',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Email inválido';
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    if (!formData.date) newErrors.date = 'Data é obrigatória';
    if (!formData.location.trim()) newErrors.location = 'Local é obrigatório';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        location: '',
        package: 'intermediário',
      });

      setTimeout(() => setSubmitStatus('idle'), 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            <span className="neon-text-green">Reserve</span>
            <span className="text-white"> sua Data Agora</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Preencha o formulário abaixo ou entre em contato direto via WhatsApp
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <motion.div whileHover={{ y: -2 }}>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Nome Completo
                </label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-4 py-3 rounded-lg bg-dark-gray border-2 focus:outline-none text-white transition-all ${
                    errors.name
                      ? 'border-red-500/50'
                      : formData.name
                      ? 'border-green-500/50'
                      : 'border-dark-gray'
                  } focus:border-green-500`}
                  placeholder="Seu nome"
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-1"
                    >
                      <AlertCircle size={14} />
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email */}
              <motion.div whileHover={{ y: -2 }}>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Email
                </label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-4 py-3 rounded-lg bg-dark-gray border-2 focus:outline-none text-white transition-all ${
                    errors.email
                      ? 'border-red-500/50'
                      : formData.email && formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
                      ? 'border-green-500/50'
                      : 'border-dark-gray'
                  } focus:border-green-500`}
                  placeholder="seu@email.com"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-1"
                    >
                      <AlertCircle size={14} />
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Phone */}
              <motion.div whileHover={{ y: -2 }}>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Telefone / WhatsApp
                </label>
                <motion.input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-4 py-3 rounded-lg bg-dark-gray border-2 focus:outline-none text-white transition-all ${
                    errors.phone
                      ? 'border-red-500/50'
                      : formData.phone
                      ? 'border-green-500/50'
                      : 'border-dark-gray'
                  } focus:border-green-500`}
                  placeholder="(62) 9 9999-9999"
                />
                <AnimatePresence>
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-1"
                    >
                      <AlertCircle size={14} />
                      {errors.phone}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Date */}
              <motion.div whileHover={{ y: -2 }}>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Data do Evento
                </label>
                <motion.input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-4 py-3 rounded-lg bg-dark-gray border-2 focus:outline-none text-white transition-all ${
                    errors.date
                      ? 'border-red-500/50'
                      : formData.date
                      ? 'border-green-500/50'
                      : 'border-dark-gray'
                  } focus:border-green-500`}
                />
                <AnimatePresence>
                  {errors.date && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-1"
                    >
                      <AlertCircle size={14} />
                      {errors.date}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Location */}
              <motion.div whileHover={{ y: -2 }}>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Local do Evento
                </label>
                <motion.input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-4 py-3 rounded-lg bg-dark-gray border-2 focus:outline-none text-white transition-all ${
                    errors.location
                      ? 'border-red-500/50'
                      : formData.location
                      ? 'border-green-500/50'
                      : 'border-dark-gray'
                  } focus:border-green-500`}
                  placeholder="Ex: Chácara em Goiânia"
                />
                <AnimatePresence>
                  {errors.location && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-1"
                    >
                      <AlertCircle size={14} />
                      {errors.location}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Package Selection */}
              <motion.div whileHover={{ y: -2 }}>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Pacote de Interesse
                </label>
                <motion.select
                  name="package"
                  value={formData.package}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 rounded-lg bg-dark-gray border-2 border-dark-gray focus:border-green-500 focus:outline-none text-white transition-all"
                >
                  <option value="básico">Básico - R$ 250</option>
                  <option value="intermediário">Intermediário - R$ 600 (Mais Popular)</option>
                  <option value="completo">Completo - R$ 1.600</option>
                </motion.select>
              </motion.div>

              {/* Submit Status */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400 font-bold flex items-center gap-2"
                  >
                    <CheckCircle size={20} />
                    Pré-reserva enviada com sucesso! Entraremos em contato em breve.
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-neon-green px-6 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-green-500/50 transition-all"
              >
                <Send size={20} />
                {isSubmitting ? 'Enviando...' : 'Enviar Pré-Reserva'}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white mb-6">
                Outras Formas de Contato
              </h3>

              <motion.a
                href="https://wa.me/5562999999999"
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-start gap-4 p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-all">
                    <Phone className="w-6 h-6 text-blue-400" />
                  </div>
                </motion.div>
                <div>
                  <h4 className="font-bold text-white mb-1">WhatsApp</h4>
                  <p className="text-gray-400 text-sm">(62) 9 9999-9999</p>
                  <p className="text-blue-400 text-sm mt-2 group-hover:underline">
                    Clique para conversar →
                  </p>
                </div>
              </motion.a>

              <motion.a
                href="mailto:contato@djflup.com"
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-start gap-4 p-6 rounded-lg border border-green-500/20 hover:border-green-500/50 hover:bg-green-500/5 transition-all group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/20 group-hover:bg-green-500/30 transition-all">
                    <Mail className="w-6 h-6 text-green-400" />
                  </div>
                </motion.div>
                <div>
                  <h4 className="font-bold text-white mb-1">Email</h4>
                  <p className="text-gray-400 text-sm">contato@djflup.com</p>
                  <p className="text-green-400 text-sm mt-2 group-hover:underline">
                    Enviar email →
                  </p>
                </div>
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-start gap-4 p-6 rounded-lg border border-green-500/20 bg-green-500/5 transition-all group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/20">
                    <MapPin className="w-6 h-6 text-green-400" />
                  </div>
                </motion.div>
                <div>
                  <h4 className="font-bold text-white mb-1">Localização</h4>
                  <p className="text-gray-400 text-sm">Goiânia, Goiás</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Atendemos eventos em toda Goiânia e região metropolitana
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 transition-all"
            >
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <span>💡</span> Dica Importante
              </h4>
              <p className="text-gray-300 text-sm">
                Quanto mais antecedência você nos avisar sobre seu evento, melhor conseguiremos preparar uma experiência única e personalizada para você!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
