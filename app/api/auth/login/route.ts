import { NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

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

    // Se não existe, criar (primeira vez)
    if (!admin) {
      const hashedPassword = await bcryptjs.hash(password, 10)
      admin = await prisma.admin.create({
        data: {
          email,
          password: hashedPassword,
        },
      })
    } else {
      // Verificar senha
      const isPasswordValid = await bcryptjs.compare(password, admin.password)
      if (!isPasswordValid) {
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
