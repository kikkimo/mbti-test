import { NextRequest, NextResponse } from 'next/server';
import { decodeBase64 } from '@/lib/base64';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const shareId = searchParams.get('shareId');

    if (!shareId) {
      return NextResponse.json({ error: 'Missing shareId' }, { status: 400 });
    }

    // Decode data from URL
    const data = searchParams.get('data');
    if (!data) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }
    const result = JSON.parse(decodeBase64(data));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error getting result:', error);
    return NextResponse.json({ error: 'Failed to get result' }, { status: 500 });
  }
}
