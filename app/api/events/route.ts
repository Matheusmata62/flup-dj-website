import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' },
    })
    return NextResponse.json(events)
  } catch (error) {
    console.error('GET /api/events error:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const event = await prisma.event.create({
      data: {
        date: data.date,
        time: data.time,
        location: data.location,
        package: data.package,
        price: data.price,
        clientName: data.clientName,
        clientPhone: data.clientPhone,
        clientEmail: data.clientEmail,
        status: data.status || 'pendente',
        paid: data.paid || false,
        notes: data.notes,
      },
    })
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('POST /api/events error:', error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}
