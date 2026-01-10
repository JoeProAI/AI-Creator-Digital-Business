import { NextRequest, NextResponse } from 'next/server';
import { submitTip } from '@/lib/sheets-write';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.userName && !data.handle) {
      return NextResponse.json(
        { error: 'Username or handle is required' },
        { status: 400 }
      );
    }

    if (!data.tip) {
      return NextResponse.json(
        { error: 'Tip is required' },
        { status: 400 }
      );
    }

    const success = await submitTip({
      userName: data.userName || '',
      handle: data.handle || '',
      category: data.category || '',
      tip: data.tip,
      details: data.details || '',
    });

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Failed to submit tip' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Tip submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
