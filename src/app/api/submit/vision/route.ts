import { NextRequest, NextResponse } from 'next/server';
import { submitVision } from '@/lib/sheets-write';

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

    if (!data.goal) {
      return NextResponse.json(
        { error: 'Goal is required' },
        { status: 400 }
      );
    }

    const success = await submitVision({
      userName: data.userName || '',
      handle: data.handle || '',
      goal: data.goal,
      timeline: data.timeline || '',
      accountability: data.accountability || '',
    });

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Failed to submit vision' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Vision submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
