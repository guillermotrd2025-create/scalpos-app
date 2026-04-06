import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const trades = await prisma.trade.findMany({
      include: {
        session: true,
        account: true,
        mistakes: true
      },
      orderBy: { time: 'desc' }
    });

    const headers = [
      'ID', 'Fecha', 'Hora', 'Cuenta', 'Activo', 'Direccion', 'Setup',
      'SL Pts', 'TP Pts', 'RR Plan', 'PnL Final ($)', 'En Plan', 
      'Emocion Pre', 'Emocion Durante', 'Emocion Post', 'Score Ejecucion', 'Errores'
    ];

    const rows = trades.map(t => [
      t.id,
      t.session.date.toISOString().split('T')[0],
      t.time.toISOString().split('T')[1].substring(0, 5),
      t.account.name,
      t.asset,
      t.direction,
      t.setup_type,
      t.sl_price || '',
      t.tp_price || '',
      t.rr_planned,
      t.result_pnl,
      t.is_in_plan ? 'Sí' : 'No',
      t.emotion_pre || '',
      t.emotion_during || '',
      t.emotion_post || '',
      t.execution_score || '',
      t.mistakes.map(m => m.mistake_type).join('; ')
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const response = new NextResponse(csvContent);
    response.headers.set('Content-Type', 'text/csv');
    response.headers.set('Content-Disposition', 'attachment; filename="scalpos_trades_export.csv"');

    return response;
  } catch (error) {
    console.error('Error exporting CSV:', error);
    return new NextResponse('Error generating CSV', { status: 500 });
  }
}
