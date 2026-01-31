import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const eventId = parseInt(id)
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    })
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    return NextResponse.json(event)
  } catch (error) {
    console.error('GET /api/events/[id] error:', error)
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const eventId = parseInt(id)
    const data = await request.json()
    const event = await prisma.event.update({
      where: { id: eventId },
      data: {
        date: data.date,
        time: data.time,
        location: data.location,
        package: data.package,
        price: data.price,
        clientName: data.clientName,
        clientPhone: data.clientPhone,
        clientEmail: data.clientEmail,
        status: data.status,
        paid: data.paid,
        notes: data.notes,
      },
    })
    return NextResponse.json(event)
  } catch (error) {
    console.error('PUT /api/events/[id] error:', error)
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const eventId = parseInt(id)
    await prisma.event.delete({
      where: { id: eventId },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/events/[id] error:', error)
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
  }
}
