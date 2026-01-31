'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Calendar, Filter, Download, ArrowLeft, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
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
  clientEmail: string;
  status: 'confirmada' | 'pendente' | 'cancelada';
  paid: boolean;
}

export default function AdminAgenda() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<'todas' | 'confirmada' | 'pendente' | 'cancelada'>('todas');
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1)); // Fevereiro 2026

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
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
          clientEmail: 'joao@email.com',
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
          clientEmail: 'maria@email.com',
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
          clientEmail: 'pedro@email.com',
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
          clientEmail: 'ana@email.com',
          status: 'confirmada',
          paid: true,
        },
        {
          id: 5,
          date: '15/03/2026',
          time: '22:30',
          location: 'Casa de Festas Elite',
          package: 'Completo',
          price: 1600,
          clientName: 'Carlos Mendes',
          clientPhone: '(62) 98888-9999',
          clientEmail: 'carlos@email.com',
          status: 'confirmada',
          paid: false,
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

  const filteredEvents = filter === 'todas' ? events : events.filter((e) => e.status === filter);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthName = currentMonth.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const emptyDays: null[] = Array.from({ length: firstDay }, () => null);
  const numberDays: number[] = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const days: (number | null)[] = [...emptyDays, ...numberDays];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white pb-12">
      {/* Header */}
      <motion.header
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-dark-charcoal border-b border-green-500/20 z-50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 hover:bg-green-500/20 rounded-lg transition-all"
              >
                <ArrowLeft size={20} />
              </motion.button>
            </Link>
            <h1 className="text-2xl font-black gradient-text-neon">Agenda de Shows</h1>
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

      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Filtros e Actions */}
        <motion.div
          className="flex flex-wrap gap-4 mb-8 items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-wrap gap-2">
            {(['todas', 'confirmada', 'pendente', 'cancelada'] as const).map((f) => (
              <motion.button
                key={f}
                onClick={() => setFilter(f)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  filter === f
                    ? 'bg-green-500 text-black shadow-lg shadow-green-500/50'
                    : 'bg-dark-gray text-gray-300 hover:bg-dark-gray'
                }`}
              >
                {f === 'todas'
                  ? '📋 Todas'
                  : f === 'confirmada'
                  ? '✓ Confirmadas'
                  : f === 'pendente'
                  ? '⏱️ Pendentes'
                  : '✗ Canceladas'}
              </motion.button>
            ))}
          </div>
          <div className="flex gap-2">
            <Link href="/admin/agenda/new">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg transition-all"
              >
                ➕ Novo Evento
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                window.open('/api/export/pdf', '_blank');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all"
            >
              <Download size={18} />
              Exportar PDF
            </motion.button>
          </div>
        </motion.div>

        {/* Calendário Mini */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
        >
          {/* Calendário */}
          <div className="lg:col-span-1 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-green-500/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-lg capitalize">{monthName}</h3>
              <div className="flex gap-2">
                <motion.button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  whileHover={{ scale: 1.1 }}
                  className="p-1 hover:bg-green-500/20 rounded"
                >
                  <ChevronLeft size={18} />
                </motion.button>
                <motion.button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  whileHover={{ scale: 1.1 }}
                  className="p-1 hover:bg-green-500/20 rounded"
                >
                  <ChevronRight size={18} />
                </motion.button>
              </div>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map((day) => (
                <div key={day} className="text-center text-xs font-bold text-gray-400 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, idx) => (
                <div
                  key={idx}
                  className={`aspect-square flex items-center justify-center rounded text-sm font-bold ${
                    !day
                      ? ''
                      : events.some(
                          (e) =>
                            e.date.startsWith(
                              `${day.toString().padStart(2, '0')}/${(currentMonth.getMonth() + 1)
                                .toString()
                                .padStart(2, '0')}`
                            )
                        )
                      ? 'bg-green-500 text-black'
                      : 'bg-dark-gray text-gray-300'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Dias com shows</span>
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {[
              { label: 'Total Shows', value: filteredEvents.length, color: 'from-green-500' },
              { label: 'Confirmados', value: filteredEvents.filter((e) => e.status === 'confirmada').length, color: 'from-blue-500' },
              { label: 'Total Receber', value: `R$ ${filteredEvents.filter((e) => !e.paid).reduce((s, e) => s + e.price, 0).toLocaleString('pt-BR')}`, color: 'from-yellow-500' },
              { label: 'Total Recebido', value: `R$ ${filteredEvents.filter((e) => e.paid).reduce((s, e) => s + e.price, 0).toLocaleString('pt-BR')}`, color: 'from-emerald-500' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className={`bg-gradient-to-br ${stat.color} to-opacity-0 rounded-lg p-4 text-white border border-white/10`}
              >
                <p className="text-sm opacity-80 mb-1">{stat.label}</p>
                <p className="text-xl font-black">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Lista de Shows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-black mb-6">
            <span className="neon-text-green">
              {filteredEvents.length} {filter === 'todas' ? 'Shows' : `${filter}s`}
            </span>
          </h2>

          <div className="space-y-4">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum show encontrado</p>
              </div>
            ) : (
              filteredEvents.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border border-green-500/20 rounded-lg p-6 hover:border-green-500/50 transition-all"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    {/* Informações principais */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl font-black text-green-400">{event.date}</span>
                        <span className="text-lg text-gray-400">•</span>
                        <span className="text-lg font-bold">{event.time}</span>
                      </div>
                      <p className="text-gray-300 mb-2">{event.location}</p>
                      <p className="text-gray-400">{event.clientName}</p>
                      <p className="text-sm text-gray-500">{event.clientEmail}</p>
                    </div>

                    {/* Informações secundárias */}
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Pacote</p>
                          <p className="font-bold text-green-400">{event.package}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Valor</p>
                          <p className="font-black text-lg">R$ {event.price.toLocaleString('pt-BR')}</p>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex gap-2 flex-wrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            event.status === 'confirmada'
                              ? 'bg-green-500/30 text-green-400'
                              : event.status === 'pendente'
                              ? 'bg-yellow-500/30 text-yellow-400'
                              : 'bg-red-500/30 text-red-400'
                          }`}
                        >
                          {event.status.toUpperCase()}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            event.paid
                              ? 'bg-blue-500/30 text-blue-400'
                              : 'bg-orange-500/30 text-orange-400'
                          }`}
                        >
                          {event.paid ? '✓ PAGO' : '⏱️ PENDENTE'}
                        </span>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex gap-2">
                      <Link href={`/admin/agenda/${event.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded transition-all"
                        >
                          Editar
                        </motion.button>
                      </Link>
                      <Link href={`/admin/agenda/${event.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded transition-all"
                        >
                          Detalhes
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
