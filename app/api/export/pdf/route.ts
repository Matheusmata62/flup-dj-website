import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' },
    })

    // Gerar HTML do PDF
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Agenda de Shows - DJ Flup</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
          h1 { color: #00ff41; text-align: center; margin-bottom: 30px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th { background-color: #1a1a1a; color: #00ff41; padding: 10px; text-align: left; border: 1px solid #ccc; }
          td { padding: 10px; border: 1px solid #ddd; }
          tr:nth-child(even) { background-color: #f9f9f9; }
          .status-confirmada { color: green; font-weight: bold; }
          .status-pendente { color: orange; font-weight: bold; }
          .status-cancelada { color: red; font-weight: bold; }
          .paid { color: blue; }
          .unpaid { color: red; }
          .summary { margin-top: 20px; padding: 10px; background-color: #f0f0f0; border-left: 4px solid #00ff41; }
        </style>
      </head>
      <body>
        <h1>📅 Agenda de Shows - DJ Flup</h1>
        <p style="text-align: center; color: #666;">Gerado em: ${new Date().toLocaleString('pt-BR')}</p>
        
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Hora</th>
              <th>Local</th>
              <th>Cliente</th>
              <th>Pacote</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Pagamento</th>
            </tr>
          </thead>
          <tbody>
            ${events
              .map(
                (event) => `
              <tr>
                <td>${event.date}</td>
                <td>${event.time}</td>
                <td>${event.location}</td>
                <td>${event.clientName}<br/><small>${event.clientPhone}</small></td>
                <td>${event.package}</td>
                <td>R$ ${event.price.toLocaleString('pt-BR')}</td>
                <td><span class="status-${event.status}">${event.status.toUpperCase()}</span></td>
                <td><span class="${event.paid ? 'paid' : 'unpaid'}">${event.paid ? '✓ PAGO' : '✗ PENDENTE'}</span></td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>

        <div class="summary">
          <h3>Resumo</h3>
          <p><strong>Total de Shows:</strong> ${events.length}</p>
          <p><strong>Confirmados:</strong> ${events.filter((e) => e.status === 'confirmada').length}</p>
          <p><strong>Pendentes:</strong> ${events.filter((e) => e.status === 'pendente').length}</p>
          <p><strong>Total a Receber:</strong> R$ ${events
            .filter((e) => !e.paid)
            .reduce((sum, e) => sum + e.price, 0)
            .toLocaleString('pt-BR')}</p>
          <p><strong>Total Recebido:</strong> R$ ${events
            .filter((e) => e.paid)
            .reduce((sum, e) => sum + e.price, 0)
            .toLocaleString('pt-BR')}</p>
        </div>
      </body>
      </html>
    `

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="agenda-dj-flup-${new Date().toISOString().split('T')[0]}.html"`,
      },
    })
  } catch (error) {
    console.error('GET /api/export/pdf error:', error)
    return NextResponse.json({ error: 'Failed to export PDF' }, { status: 500 })
  }
}
