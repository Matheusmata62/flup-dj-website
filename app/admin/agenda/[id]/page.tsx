'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

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
  notes?: string;
}

export default function EventDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Event | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      loadEvent();
    }
  }, [router, id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/events/${id}`);
      if (!response.ok) throw new Error('Failed to fetch event');
      const data = await response.json();
      setEvent(data);
      setFormData(data);
    } catch (error) {
      console.error('Erro ao carregar evento:', error);
      toast.error('Erro ao carregar evento');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => prev ? { ...prev, [name]: finalValue } : null);
  };

  const handleSave = async () => {
    if (!formData) return;

    try {
      setSaving(true);
      const response = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update event');

      toast.success('Evento atualizado com sucesso!');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push('/admin/agenda');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast.error('Erro ao atualizar evento');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja deletar este evento?')) return;

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete event');

      toast.success('Evento deletado com sucesso!');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push('/admin/agenda');
    } catch (error) {
      console.error('Erro ao deletar:', error);
      toast.error('Erro ao deletar evento');
    }
  };

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto"
          />
          <p className="text-gray-400 mt-4">Carregando evento...</p>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <p>Evento não encontrado</p>
          <Link href="/admin/agenda">
            <motion.button whileHover={{ scale: 1.05 }} className="mt-4 px-4 py-2 bg-green-500 rounded">
              Voltar
            </motion.button>
          </Link>
        </div>
      </div>
    );
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
            <Link href="/admin/agenda">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 hover:bg-green-500/20 rounded-lg transition-all"
              >
                <ArrowLeft size={20} />
              </motion.button>
            </Link>
            <h1 className="text-2xl font-black gradient-text-neon">Editar Evento</h1>
          </div>
        </div>
      </motion.header>

      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-green-500/20 rounded-lg p-8"
        >
          {/* Informações do Cliente */}
          <div className="mb-8">
            <h2 className="text-xl font-black mb-4 text-green-400">Informações do Cliente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nome do Cliente</label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  className="w-full bg-dark-gray border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  className="w-full bg-dark-gray border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Telefone</label>
                <input
                  type="tel"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleChange}
                  className="w-full bg-dark-gray border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Data e Horário */}
          <div className="mb-8">
            <h2 className="text-xl font-black mb-4 text-green-400">Data e Hora</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Data</label>
                <input
                  type="text"
                  name="date"
                  placeholder="DD/MM/YYYY"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-dark-gray border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Hora</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full bg-dark-gray border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-2">Local</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-dark-gray border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Pacote e Preço */}
          <div className="mb-8">
            <h2 className="text-xl font-black mb-4 text-green-400">Serviço</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Pacote</label>
                <select
                  name="package"
                  value={formData.package}
                  onChange={handleChange}
                  className="w-full bg-dark-gray border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none transition-all"
                >
                  <option value="Básico">Básico</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Completo">Completo</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Preço (R$)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-dark-gray border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="mb-8">
            <h2 className="text-xl font-black mb-4 text-green-400">Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Status do Evento</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-dark-gray border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none transition-all"
                >
                  <option value="pendente">Pendente</option>
                  <option value="confirmada">Confirmada</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Pagamento</label>
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="checkbox"
                    name="paid"
                    checked={formData.paid}
                    onChange={handleChange}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className={formData.paid ? 'text-green-400' : 'text-orange-400'}>
                    {formData.paid ? '✓ Pago' : '⏱️ Pendente'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notas */}
          <div className="mb-8">
            <h2 className="text-xl font-black mb-4 text-green-400">Notas</h2>
            <textarea
              name="notes"
              value={formData.notes || ''}
              onChange={handleChange}
              placeholder="Notas adicionais sobre o evento..."
              className="w-full bg-dark-gray border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none transition-all h-24 resize-none"
            />
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-4 justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition-all"
              disabled={saving}
            >
              <Trash2 size={18} />
              Deletar
            </motion.button>
            <Link href="/admin/agenda">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded transition-all"
              >
                Cancelar
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-bold rounded transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Salvar
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
