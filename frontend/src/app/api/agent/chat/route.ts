import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    // Simple mock response to keep everything in one Next.js deployment
    // (Firebase Hosting + Functions / Vercel)
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const responseText = `DINEVA: I am operating in serverless demo mode. I see your message: "${message}". In this demo environment, I can confirm today's revenue is ₹1,25,430 and we have 3 low stock items.`;
        
        // Chunk it
        for (let i = 0; i < responseText.length; i += 5) {
          const chunk = responseText.slice(i, i + 5);
          controller.enqueue(encoder.encode(`data: {"content":"${chunk}"}\n\n`));
          await new Promise(r => setTimeout(r, 50));
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
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
}