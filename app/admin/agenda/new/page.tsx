'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface NewEvent {
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
  notes: string;
}

const initialFormData: NewEvent = {
  date: '',
  time: '',
  location: '',
  package: 'Intermediário',
  price: 0,
  clientName: '',
  clientPhone: '',
  clientEmail: '',
  status: 'pendente',
  paid: false,
  notes: '',
};

export default function NewEvent() {
  const router = useRouter();
  const [formData, setFormData] = useState<NewEvent>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.date) newErrors.date = 'Data é obrigatória';
    if (!formData.time) newErrors.time = 'Hora é obrigatória';
    if (!formData.clientName) newErrors.clientName = 'Nome do cliente é obrigatório';
    if (!formData.clientPhone) newErrors.clientPhone = 'Telefone é obrigatório';
    if (!formData.clientEmail) newErrors.clientEmail = 'Email é obrigatório';
    if (!formData.location) newErrors.location = 'Local é obrigatório';
    if (formData.price <= 0) newErrors.price = 'Preço deve ser maior que 0';
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(formData.date)) {
      newErrors.date = 'Use o formato DD/MM/YYYY';
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.clientEmail)) {
      newErrors.clientEmail = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : finalValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create event');

      toast.success('Evento criado com sucesso!');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push('/admin/agenda');
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      toast.error('Erro ao criar evento');
    } finally {
      setLoading(false);
    }
  };

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
            <h1 className="text-2xl font-black gradient-text-neon">Novo Evento</h1>
          </div>
        </div>
      </motion.header>

      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-green-500/20 rounded-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações do Cliente */}
            <div>
              <h2 className="text-xl font-black mb-4 text-green-400">Informações do Cliente</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Nome do Cliente"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  error={errors.clientName}
                  required
                />
                <FormInput
                  label="Email"
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  error={errors.clientEmail}
                  required
                />
                <FormInput
                  label="Telefone"
                  type="tel"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleChange}
                  error={errors.clientPhone}
                  placeholder="(XX) 9XXXX-XXXX"
                  required
                />
              </div>
            </div>

            {/* Data e Hora */}
            <div>
              <h2 className="text-xl font-black mb-4 text-green-400">Data e Hora</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Data"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  error={errors.date}
                  placeholder="DD/MM/YYYY"
                  required
                />
                <FormInput
                  label="Hora"
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  error={errors.time}
                  required
                />
                <FormInput
                  label="Local"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  error={errors.location}
                  className="md:col-span-2"
                  required
                />
              </div>
            </div>

            {/* Pacote e Preço */}
            <div>
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
                    <option value="Básico">Básico - R$ 250</option>
                    <option value="Intermediário">Intermediário - R$ 600</option>
                    <option value="Completo">Completo - R$ 1600</option>
                    <option value="VIP">VIP - Customizado</option>
                  </select>
                </div>
                <FormInput
                  label="Preço (R$)"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  error={errors.price}
                  required
                />
              </div>
            </div>

            {/* Status */}
            <div>
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
                  <label className="flex items-center gap-3 cursor-pointer mt-2">
                    <input
                      type="checkbox"
                      name="paid"
                      checked={formData.paid}
                      onChange={handleChange}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <span className={formData.paid ? 'text-green-400 font-bold' : 'text-orange-400'}>
                      {formData.paid ? '✓ Pago' : '⏱️ Pendente'}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Notas */}
            <div>
              <h2 className="text-xl font-black mb-4 text-green-400">Notas</h2>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Notas adicionais sobre o evento..."
                className="w-full bg-dark-gray border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none transition-all h-24 resize-none"
              />
            </div>

            {/* Botões */}
            <div className="flex gap-4 justify-end">
              <Link href="/admin/agenda">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded transition-all"
                >
                  Cancelar
                </motion.button>
              </Link>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-black font-bold rounded transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                    />
                    Criando...
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Criar Evento
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

function FormInput({
  label,
  error,
  className = '',
  ...props
}: {
  label: string;
  error?: string;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div className={className}>
      <label className="block text-sm text-gray-400 mb-2">{label}</label>
      <input
        {...props}
        className={`w-full bg-dark-gray border rounded px-3 py-2 text-white focus:outline-none transition-all ${
          error ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-green-500'
        }`}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
