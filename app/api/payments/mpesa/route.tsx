// app/api/payments/mpesa/route.ts
import { NextResponse } from 'next/server';
import IntaSend from 'intasend-node';
import { createNewOrder } from '@/lib/supabase/queries';
import { OrderItem } from '@/types/declarations';

interface MpesaRequest {
  userId: string;
  amount: number;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  orderItems: OrderItem[]
}

export async function POST(req: Request) {
  try {
    // Parse and validate the incoming request body
    const { userId, amount, phoneNumber, firstName, lastName, email, orderItems }: MpesaRequest = await req.json();

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
    const invoice_id = await response.invoice.invoice_id;

    // Save the order details to the database
    const newOrder = await createNewOrder({
      user_id: userId,
      total: amount,
      status: 'pending',
      invoice_id: invoice_id,
    }, orderItems)

    console.log('New Order:', newOrder);

    return NextResponse.json({
      success: 'Payment request sent',
      data: response,
      redirectUrl: '/account'
    });
  } catch (error) {
    console.error('M-Pesa Processing Error:', error);
    return NextResponse.json(
      { error: 'Payment initiation failed' },
      { status: 500 }
    );
  }
}