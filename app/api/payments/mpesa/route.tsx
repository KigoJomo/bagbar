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
    // Parse and validate the incoming request body
    const { amount, phoneNumber, firstName, lastName, email }: MpesaRequest = await req.json();

    if (!phoneNumber || !amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      );
    }

    // Initialize IntaSend with your API credentials
    const instasend = new IntaSend(
      process.env.INSTA_API_KEY, 
      process.env.INSTA_API_SECRET, 
      true // Set to false in production
    );

    // Get the collection payment object
    const collection = instasend.collection();

    // Generate a unique API reference for tracking this transaction
    const apiRef = `order-${Date.now()}`;

    // Initiate the Mpesa STK Push payment request
    const response = await collection.mpesaStkPush({
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      host: 'https://bagbar.vercel.app',
      amount: amount,
      api_ref: apiRef,
    });

    console.log('STK Push Response:', response);

    // Return a success response to the client
    return NextResponse.json({
      success: 'Payment request sent',
      data: response,
    });
  } catch (error) {
    console.error('M-Pesa Processing Error:', error);
    return NextResponse.json(
      { error: 'Payment initiation failed' },
      { status: 500 }
    );
  }
}
