import { NextRequest, NextResponse } from 'next/server';
import { submitFeedback } from '@/lib/sheets-write';

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

    if (!data.issue || !data.solution) {
      return NextResponse.json(
        { error: 'Issue and solution are required' },
        { status: 400 }
      );
    }

    const success = await submitFeedback({
      userName: data.userName || '',
      handle: data.handle || '',
      category: data.category || '',
      issue: data.issue,
      solution: data.solution,
    });

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Failed to submit feedback' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Feedback submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
