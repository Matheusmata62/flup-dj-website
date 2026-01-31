import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST() {
  try {
    // Verificar se admin já existe
    const adminExists = await prisma.admin.findFirst()
    
    if (adminExists) {
      return NextResponse.json({ message: 'Admin already initialized' })
    }

    // Criar admin padrão
    const hashedPassword = await bcrypt.hash('flup2026', 10)
    await prisma.admin.create({
      data: {
        email: 'flup@dj.com',
        password: hashedPassword,
        phone: '(62) 99999-9999',
        djName: 'DJ Flup',
        djBio: 'DJ profissional com mais de 10 anos de experiência em eventos',
        basicPrice: 250,
        intermediatePrice: 600,
        completePrice: 1600,
      },
    })

    // Criar eventos de exemplo
    await prisma.event.createMany({
      data: [
        {
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
      ],
    })

    return NextResponse.json({ 
      message: 'Database initialized successfully',
      admin: 'flup@dj.com / flup2026'
    })
  } catch (error) {
    console.error('Init error:', error)
    return NextResponse.json({ error: 'Failed to initialize' }, { status: 500 })
  }
}
