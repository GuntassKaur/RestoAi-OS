import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json([
    { id: 1, name: 'Tomatoes', quantity: 12, reorder_threshold: 20, unit: 'kg' },
    { id: 2, name: 'Olive Oil', quantity: 4, reorder_threshold: 10, unit: 'Liters' },
    { id: 3, name: 'Mozzarella', quantity: 8, reorder_threshold: 15, unit: 'kg' }
  ]);
}