// app/api/payments/mpesa/route.ts
import { NextResponse } from 'next/server';

interface MpesaRequest {
  amount: number;
  phoneNumber: string;
  reference: string;
}

export async function POST(req: Request) {
  try {
    const { amount, phoneNumber, reference }: MpesaRequest = await req.json();

    // Validate input
    if (!phoneNumber || !amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      );
    }

    // Initiate payment with Instasend
    const response = await fetch(`${process.env.INSTA_API_URL}/mpesa/stk-push`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.INSTA_API_KEY}`,
      },
      body: JSON.stringify({
        amount: Math.round(amount), // Ensure whole number
        phone: phoneNumber,
        reference,
        callback_url: `${process.env.NEXTAUTH_URL}/api/payments/webhook`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Instasend Error:', data);
      return NextResponse.json(
        { error: data.message || 'Payment initiation failed' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      message: 'Payment request initiated',
      checkoutId: data.checkout_id,
    });

  } catch (error) {
    console.error('M-Pesa Processing Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}