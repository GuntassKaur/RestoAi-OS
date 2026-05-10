import { NextResponse } from 'next/server';
export async function GET(request: Request) {
  return NextResponse.json([
    { date: new Date(Date.now() - 6*86400000).toISOString(), revenue: 95000 },
    { date: new Date(Date.now() - 5*86400000).toISOString(), revenue: 102000 },
    { date: new Date(Date.now() - 4*86400000).toISOString(), revenue: 110500 },
    { date: new Date(Date.now() - 3*86400000).toISOString(), revenue: 98000 },
    { date: new Date(Date.now() - 2*86400000).toISOString(), revenue: 115000 },
    { date: new Date(Date.now() - 1*86400000).toISOString(), revenue: 130000 },
    { date: new Date().toISOString(), revenue: 125430 }
  ]);
}