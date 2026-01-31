import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

async function getAdminFromToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return await prisma.admin.findUnique({
      where: { id: decoded.id },
    })
  } catch (error) {
    return null
  }
}

export async function GET(request: Request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const admin = await getAdminFromToken(token)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({
      djName: admin.djName,
      djBio: admin.djBio,
      phone: admin.phone,
      email: admin.email,
      basicPrice: admin.basicPrice,
      intermediatePrice: admin.intermediatePrice,
      completePrice: admin.completePrice,
    })
  } catch (error) {
    console.error('GET /api/settings error:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const admin = await getAdminFromToken(token)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const updated = await prisma.admin.update({
      where: { id: admin.id },
      data: {
        djName: data.djName,
        djBio: data.djBio,
        phone: data.phone,
        basicPrice: data.basicPrice,
        intermediatePrice: data.intermediatePrice,
        completePrice: data.completePrice,
      },
    })

    return NextResponse.json({
      djName: updated.djName,
      djBio: updated.djBio,
      phone: updated.phone,
      email: updated.email,
      basicPrice: updated.basicPrice,
      intermediatePrice: updated.intermediatePrice,
      completePrice: updated.completePrice,
    })
  } catch (error) {
    console.error('PUT /api/settings error:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
