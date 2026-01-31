'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Music } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Settings {
  djName: string;
  djPhone: string;
  djEmail: string;
  djBio: string;
  basicPrice: number;
  intermediatePrice: number;
  completePrice: number;
}

const defaultSettings: Settings = {
  djName: 'DJ Flup',
  djPhone: '(62) 99999-9999',
  djEmail: 'flup@dj.com',
  djBio: 'DJ profissional com 10+ anos de experiência',
  basicPrice: 250,
  intermediatePrice: 600,
  completePrice: 1600,
};

export default function Settings() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      loadSettings();
    }
  }, [router]);

  const loadSettings = () => {
    const saved = localStorage.getItem('djSettings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const finalValue = type === 'number' ? parseFloat(value) : value;
    setSettings((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      localStorage.setItem('djSettings', JSON.stringify(settings));
      toast.success('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Erro ao salvar configurações');
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) return null;

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
            <h1 className="text-2xl font-black gradient-text-neon">Configurações</h1>
          </div>
        </div>
      </motion.header>

      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Perfil do DJ */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-green-500/20 rounded-lg p-8">
            <h2 className="text-xl font-black mb-6 text-green-400 flex items-center gap-2">
              <Music size={24} />
              Perfil do DJ
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nome do DJ</label>
                <input
                  type="text"
                  name="djName"
                  value={settings.djName}
                  onChange={handleChange}
                  className="w-full bg-dark-gray border border-gray-600 rounded px-4 py-2 text-white focus:border-green-500 focus:outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Telefone</label>
                  <input
                    type="tel"
                    name="djPhone"
                    value={settings.djPhone}
                    onChange={handleChange}
                    className="w-full bg-dark-gray border border-gray-600 rounded px-4 py-2 text-white focus:border-green-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    name="djEmail"
                    value={settings.djEmail}
                    onChange={handleChange}
                    className="w-full bg-dark-gray border border-gray-600 rounded px-4 py-2 text-white focus:border-green-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Biografia</label>
                <textarea
                  name="djBio"
                  value={settings.djBio}
                  onChange={handleChange}
                  className="w-full bg-dark-gray border border-gray-600 rounded px-4 py-2 text-white focus:border-green-500 focus:outline-none transition-all h-24 resize-none"
                  placeholder="Conte um pouco sobre você..."
                />
              </div>
            </div>
          </div>

          {/* Preços dos Pacotes */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-green-500/20 rounded-lg p-8">
            <h2 className="text-xl font-black mb-6 text-green-400">💰 Tabela de Preços</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Pacote Básico</label>
                <div className="relative">
                  <span className="absolute left-4 top-2 text-gray-400">R$</span>
                  <input
                    type="number"
                    name="basicPrice"
                    value={settings.basicPrice}
                    onChange={handleChange}
                    className="w-full bg-dark-gray border border-gray-600 rounded px-4 py-2 pl-10 text-white focus:border-green-500 focus:outline-none transition-all"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Som + Iluminação básica</p>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Pacote Intermediário</label>
                <div className="relative">
                  <span className="absolute left-4 top-2 text-gray-400">R$</span>
                  <input
                    type="number"
                    name="intermediatePrice"
                    value={settings.intermediatePrice}
                    onChange={handleChange}
                    className="w-full bg-dark-gray border border-gray-600 rounded px-4 py-2 pl-10 text-white focus:border-green-500 focus:outline-none transition-all"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Som + Iluminação completa</p>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Pacote Completo</label>
                <div className="relative">
                  <span className="absolute left-4 top-2 text-gray-400">R$</span>
                  <input
                    type="number"
                    name="completePrice"
                    value={settings.completePrice}
                    onChange={handleChange}
                    className="w-full bg-dark-gray border border-gray-600 rounded px-4 py-2 pl-10 text-white focus:border-green-500 focus:outline-none transition-all"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Som + Luz + Extra</p>
              </div>
            </div>
          </div>

          {/* Botão de Salvar */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-black rounded-lg transition-all disabled:opacity-50"
          >
            {saving ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                />
                Salvando...
              </>
            ) : (
              <>
                <Save size={20} />
                Salvar Configurações
              </>
            )}
          </motion.button>

          {/* Dica */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-sm text-blue-300">
              💡 <strong>Dica:</strong> Atualize seus preços e informações aqui para que apareçam automaticamente em todos os eventos.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
