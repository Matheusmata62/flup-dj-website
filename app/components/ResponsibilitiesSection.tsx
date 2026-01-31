'use client';

import { motion } from 'framer-motion';
import {
  Mic2,
  Music,
  DollarSign,
  BarChart3,
  AlertCircle,
  Clock,
} from 'lucide-react';

const requirements = [
  {
    icon: Mic2,
    title: 'Estrutura de Som',
    description: 'Necesário ter um sistema de som de qualidade ou locação incluída',
  },
  {
    icon: BarChart3,
    title: 'Espaço para Palco',
    description: 'Palco ou área elevada para visibilidade da performance',
  },
  {
    icon: Clock,
    title: 'Horário Confirmado',
    description: 'Horário de início do set deve ser confirmado com 7 dias de antecedência',
  },
  {
    icon: DollarSign,
    title: 'Sinal para Reserva',
    description: '50% do valor como sinal. Saldo pago no dia do evento',
  },
  {
    icon: Music,
    title: 'Playlist Preparada',
    description: 'Opção de compartilhar músicas que deseja ou deixar a leitura de pista',
  },
  {
    icon: AlertCircle,
    title: 'Cancelamento',
    description: 'Cancelamentos com até 15 dias de antecedência devem ser comunicados',
  },
];

export default function ResponsibilitiesSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-dark-gray to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            <span className="text-white">Condições e</span>
            <br />
            <span className="neon-text-green">Responsabilidades</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tudo o que você precisa saber para garantir uma experiência perfeita.
          </p>
        </motion.div>

        {/* Grid of Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requirements.map((req, index) => {
            const Icon = req.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 rounded-xl border border-dark-gray hover:border-neon-green/50 transition-all duration-300 bg-dark-charcoal/50 hover:bg-dark-charcoal/80"
              >
                {/* Icon Background */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-neon-green/5 rounded-lg group-hover:bg-neon-green/10 transition-all duration-300"></div>

                {/* Icon */}
                <Icon className="w-10 h-10 text-neon-green mb-4 relative z-10" />

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-green transition-colors">
                  {req.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{req.description}</p>

                {/* Hover Border Animation */}
                <div className="absolute inset-0 rounded-xl border border-neon-green/0 group-hover:border-neon-green/30 transition-all duration-300"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Important Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 rounded-xl border-l-4 border-neon-blue bg-neon-blue/5"
        >
          <h3 className="text-xl font-bold text-neon-blue mb-3 flex items-center gap-2">
            <AlertCircle size={24} />
            Informações Importantes
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li>✓ Equipamento de som deve estar em perfeito funcionamento</li>
            <li>✓ Fornecemos os cabos e adaptadores padrão de conexão</li>
            <li>✓ Em caso de problemas técnicos, DJ flup se adapta rapidamente</li>
            <li>✓ Todos os direitos de imagem e vídeo devem ser autorizados</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
