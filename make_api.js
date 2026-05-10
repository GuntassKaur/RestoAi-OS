const fs = require('fs');
const path = require('path');
const base = path.join('frontend', 'src', 'app', 'api');

const files = {
  'reports/summary/route.ts': `import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({
    today_revenue: 125430,
    today_orders: 142,
    low_stock_count: 3
  });
}`,

  'inventory/alerts/route.ts': `import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json([
    { id: 1, name: 'Tomatoes', quantity: 12, reorder_threshold: 20, unit: 'kg' },
    { id: 2, name: 'Olive Oil', quantity: 4, reorder_threshold: 10, unit: 'Liters' },
    { id: 3, name: 'Mozzarella', quantity: 8, reorder_threshold: 15, unit: 'kg' }
  ]);
}`,

  'reports/revenue/route.ts': `import { NextResponse } from 'next/server';
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
}`,

  'orders/route.ts': `import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json([
    { id: 1042, table_number: 4, total: 2450.50, status: 'received' },
    { id: 1041, table_number: 12, total: 1240.00, status: 'preparing' },
    { id: 1040, table_number: 7, total: 3800.00, status: 'ready' },
    { id: 1039, table_number: 2, total: 950.00, status: 'served' },
    { id: 1038, table_number: 9, total: 4200.75, status: 'served' }
  ]);
}`,

  'staff/on-duty/route.ts': `import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json([
    { id: 1, name: 'Rahul Sharma', role: 'Chef' },
    { id: 2, name: 'Priya Patel', role: 'Manager' },
    { id: 3, name: 'Amit Kumar', role: 'Waiter' },
    { id: 4, name: 'Neha Singh', role: 'Waiter' }
  ]);
}`,

  'agent/chat/route.ts': `import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    // Simple mock response to keep everything in one Next.js deployment
    // (Firebase Hosting + Functions / Vercel)
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const responseText = \`DINEVA: I am operating in serverless demo mode. I see your message: "\${message}". In this demo environment, I can confirm today's revenue is ₹1,25,430 and we have 3 low stock items.\`;
        
        // Chunk it
        for (let i = 0; i < responseText.length; i += 5) {
          const chunk = responseText.slice(i, i + 5);
          controller.enqueue(encoder.encode(\`data: {"content":"\${chunk}"}\\n\\n\`));
          await new Promise(r => setTimeout(r, 50));
        }
        controller.enqueue(encoder.encode('data: [DONE]\\n\\n'));
        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(base, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}
console.log('Mock APIs created!');
