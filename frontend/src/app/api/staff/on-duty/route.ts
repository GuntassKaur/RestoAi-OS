import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json([
    { id: 1, name: 'Rahul Sharma', role: 'Chef' },
    { id: 2, name: 'Priya Patel', role: 'Manager' },
    { id: 3, name: 'Amit Kumar', role: 'Waiter' },
    { id: 4, name: 'Neha Singh', role: 'Waiter' }
  ]);
}