import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json([
    { id: 1042, table_number: 4, total: 2450.50, status: 'received' },
    { id: 1041, table_number: 12, total: 1240.00, status: 'preparing' },
    { id: 1040, table_number: 7, total: 3800.00, status: 'ready' },
    { id: 1039, table_number: 2, total: 950.00, status: 'served' },
    { id: 1038, table_number: 9, total: 4200.75, status: 'served' }
  ]);
}