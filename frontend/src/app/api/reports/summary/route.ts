import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({
    today_revenue: 125430,
    today_orders: 142,
    low_stock_count: 3
  });
}