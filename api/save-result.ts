import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { result } = body;

    if (!result) {
      return NextResponse.json({ error: 'Missing result data' }, { status: 400 });
    }

    // Generate share ID
    const shareId = btoa(`${result.id}-${Date.now()}`).substring(0, 8);

    // Store in KV with 180 day TTL
    await kv.set(`mbti:${shareId}`, JSON.stringify(result), {
      ex: 180 * 24 * 60 * 60, // 180 days in seconds
    });

    return NextResponse.json({ shareId });
  } catch (error) {
    console.error('Error saving result:', error);
    return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });
  }
}
