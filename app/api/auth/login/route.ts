import { NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'flup-dj-default-secret-key-change-in-production'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email e senha são obrigatórios' }, { status: 400 })
    }

    // Procurar admin no banco
    let admin = await prisma.admin.findUnique({
      where: { email },
    })

    // Se não existe, criar (primeira vez) - sem hash para facilitar testes
    if (!admin) {
      admin = await prisma.admin.create({
        data: {
          email,
          password, // Salvar em plain text na primeira vez (dev only)
          djName: 'DJ Flup',
          djBio: 'DJ profissional',
        },
      })
    } else {
      // Se existe, verificar senha (simples, sem hash)
      if (admin.password !== password) {
        return NextResponse.json({ error: 'Email ou senha incorretos' }, { status: 401 })
      }
    }

    // Gerar JWT token
    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
      expiresIn: '7d',
    })

    return NextResponse.json({
      success: true,
      token,
      email: admin.email,
    })
  } catch (error) {
    console.error('POST /api/auth/login error:', error)
    return NextResponse.json({ error: 'Erro ao fazer login' }, { status: 500 })
  }
}
