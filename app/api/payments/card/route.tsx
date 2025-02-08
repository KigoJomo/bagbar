// app/api/payments/card/route.ts
import { NextResponse } from 'next/server';

interface CardPaymentRequestBody {
  amount: number;
  currency: string;
  cardToken: string; // Ideally, you tokenize card details on the client or via Instasend’s tokenization endpoint.
  callbackUrl: string;
  // ... include additional fields as required.
}

export async function POST(request: Request) {
  try {
    const body: CardPaymentRequestBody = await request.json();

    // Construct the payload according to Instasend’s Card payment requirements.
    const payload = {
      amount: body.amount,
      currency: body.currency,
      card_token: body.cardToken,
      callback_url: body.callbackUrl,
      // Other parameters if needed.
    };

    // Call the Instasend Card payment endpoint.
    const response = await fetch(`${process.env.INSTA_API_BASE_URL}/payments/card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.INSTA_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Internal Server Error ${error}` }, { status: 500 });
  }
}
