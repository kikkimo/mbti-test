import { NextRequest, NextResponse } from 'next/server';

import { encodeBase64, decodeBase64 } from '@/lib/base64';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { result } = body;

    if (!result || !result.type || !result.dimensions) {
      return NextResponse.json({ error: 'Missing result data' }, { status: 400 });
    }

    // Generate share ID
    const shareId = generateShareId(result);

    // Return share URL with encoded result
    const shareUrl = `${request.headers.get('host')}/share/${shareId}?data=${encodeURIComponentResult)}`;

    return NextResponse.json({ shareUrl });
  } catch (error) {
    console.error('Error saving result:', error);
    return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });
  }
}

