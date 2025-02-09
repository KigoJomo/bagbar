// app/api/payments/mpesa/route.ts
import { NextResponse } from 'next/server';
import IntaSend from 'intasend-node';

interface MpesaRequest {
  amount: number;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string;
}

export async function POST(req: Request) {
  try {
    const { amount, phoneNumber, firstName, lastName, email }: MpesaRequest =
      await req.json();

    // Validate input
    if (!phoneNumber || !amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      );
    }

    const instasend = new IntaSend(
      process.env.INSTA_API_KEY,
      process.env.INSTA_API_SECRET,
      true
    );

    const collection = instasend.collection();

    collection
      .mpesaStkPush({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
        host: 'bagbar.vercel.app',
        amount: amount,
        api_ref: 'test',
      })
      .then((response) => {
        console.log(`STK Push Response ${response}`);
      })
      .catch((error) => {
        console.error(`STK Push Error ${error}`);
      });
  } catch (error) {
    console.error('M-Pesa Processing Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
