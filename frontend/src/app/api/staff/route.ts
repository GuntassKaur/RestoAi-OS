import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json([
    { id: 1, name: 'Rahul Sharma', role: 'Chef', status: 'On Duty' },
    { id: 2, name: 'Priya Patel', role: 'Manager', status: 'On Duty' },
    { id: 3, name: 'Amit Kumar', role: 'Waiter', status: 'On Duty' },
    { id: 4, name: 'Neha Singh', role: 'Waiter', status: 'On Duty' },
    { id: 5, name: 'Vikram Singh', role: 'Chef', status: 'Off Duty' }
  ]);
}
