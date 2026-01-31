'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Calendar, DollarSign, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Event {
  id: number;
  date: string;
  time: string;
  location: string;
  package: string;
  price: number;
  clientName: string;
  clientPhone: string;
  status: 'confirmada' | 'pendente' | 'cancelada';
  paid: boolean;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Verificar autenticação
    const token = localStorage.getItem('adminToken');
    const email = localStorage.getItem('adminEmail');

    if (!token || !email) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      setAdminEmail(email);
      // Carregar eventos (mock data - virá do backend)
      loadEvents();
    }
  }, [router]);

  const loadEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
      // Se falhar, use mock data
      const mockEvents: Event[] = [
      {
        id: 1,
        date: '15/02/2026',
        time: '22:00',
        location: 'Chácara Premium - Goiânia',
        package: 'Intermediário',
        price: 600,
        clientName: 'João Silva',
        clientPhone: '(62) 98765-4321',
        status: 'confirmada',
        paid: true,
      },
      {
        id: 2,
        date: '22/02/2026',
        time: '21:00',
        location: 'Casa de Eventos XYZ',
        package: 'Completo',
        price: 1600,
        clientName: 'Maria Santos',
        clientPhone: '(62) 99876-5432',
        status: 'confirmada',
        paid: false,
      },
      {
        id: 3,
        date: '28/02/2026',
        time: '23:00',
        location: 'Clube Goianiense',
        package: 'Básico',
        price: 250,
        clientName: 'Pedro Costa',
        clientPhone: '(62) 91234-5678',
        status: 'pendente',
        paid: false,
      },
      {
        id: 4,
        date: '08/03/2026',
        time: '20:00',
        location: 'Mansão dos Eventos',
        package: 'Intermediário',
        price: 600,
        clientName: 'Ana Oliveira',
        clientPhone: '(62) 99988-7654',
        status: 'confirmada',
        paid: true,
      },
      ];
      setEvents(mockEvents);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    router.push('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  // Calcular estatísticas
  const totalEvents = events.length;
  const confirmedEvents = events.filter((e) => e.status === 'confirmada').length;
  const totalReceived = events
    .filter((e) => e.paid)
    .reduce((sum, e) => sum + e.price, 0);
  const pendingPayments = events
    .filter((e) => !e.paid)
    .reduce((sum, e) => sum + e.price, 0);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.header
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-dark-charcoal border-b border-green-500/20 z-50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black gradient-text-neon">DJ Flup Admin</h1>
            <p className="text-sm text-gray-400">{adminEmail}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
          >
            <LogOut size={18} />
            Sair
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {[
            {
              title: 'Total de Shows',
              value: totalEvents,
              icon: Calendar,
              color: 'from-green-500 to-green-600',
            },
            {
              title: 'Confirmados',
              value: confirmedEvents,
              icon: CheckCircle,
              color: 'from-blue-500 to-blue-600',
            },
            {
              title: 'Recebido',
              value: `R$ ${totalReceived.toLocaleString('pt-BR')}`,
              icon: DollarSign,
              color: 'from-emerald-500 to-emerald-600',
            },
            {
              title: 'Aguardando',
              value: `R$ ${pendingPayments.toLocaleString('pt-BR')}`,
              icon: Clock,
              color: 'from-yellow-500 to-yellow-600',
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white`}
              >
                <Icon className="w-8 h-8 mb-2 opacity-80" />
                <p className="text-sm opacity-80 mb-1">{stat.title}</p>
                <p className="text-2xl font-black">{stat.value}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/admin/agenda">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg transition-all"
            >
              📅 Ver Agenda Completa
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all"
          >
            📊 Relatórios
          </motion.button>
          <Link href="/admin/configuracoes">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-all"
            >
              ⚙️ Configurações
            </motion.button>
          </Link>
        </motion.div>

        {/* Próximos Eventos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-black mb-6">
            <span className="neon-text-green">Próximos</span> Shows
          </h2>

          <div className="space-y-4">
            {events.slice(0, 5).map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border border-green-500/20 rounded-lg p-6 hover:border-green-500/50 transition-all"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  {/* Info Esquerda */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar size={20} className="text-green-500" />
                      <span className="font-black text-lg">{event.date} às {event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-2 text-gray-400">
                      <MapPin size={18} />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                      <Phone size={18} />
                      {event.clientName} - {event.clientPhone}
                    </div>
                  </div>

                  {/* Info Direita */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Pacote</p>
                      <p className="font-bold text-green-400">{event.package}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Valor</p>
                      <p className="font-black text-lg">R$ {event.price.toLocaleString('pt-BR')}</p>
                    </div>

                    {/* Status Badges */}
                    <div className="flex gap-2">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          event.status === 'confirmada'
                            ? 'bg-green-500/30 text-green-400'
                            : event.status === 'pendente'
                            ? 'bg-yellow-500/30 text-yellow-400'
                            : 'bg-red-500/30 text-red-400'
                        }`}
                      >
                        {event.status.toUpperCase()}
                      </motion.span>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          event.paid
                            ? 'bg-blue-500/30 text-blue-400'
                            : 'bg-orange-500/30 text-orange-400'
                        }`}
                      >
                        {event.paid ? '✓ PAGO' : '⏱️ PENDENTE'}
                      </motion.span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold rounded transition-all"
                      >
                        Editar
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white text-sm font-bold rounded transition-all"
                      >
                        Detalhes
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Ver Todos Button */}
          <Link href="/admin/agenda">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-6 text-center py-4 border-2 border-dashed border-green-500/50 rounded-lg hover:border-green-500 transition-all cursor-pointer"
            >
              <p className="text-green-400 font-bold">Ver todos os {totalEvents} shows →</p>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
