// app/api/payments/webhook/route.ts
import { NextResponse } from 'next/server';
import { createNewOrder } from '@/lib/supabase/queries';
// import { verifyInstasendSignature } from '@/lib/instasend';

interface Metadata {
  user_id: string;
  items: Array<{
    id: string;
    quantity: number;
    price: number;
  }>;
}

interface Payload {
  event: string;
  data: {
    reference: string;
    amount: number;
    metadata: Metadata;
  };
  challenge: string;
  status: string;
}

export async function POST(req: Request) {
  try {
    // Verify webhook signature
    // const isValid = await verifyInstasendSignature(req);
    // if (!isValid) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const payload: Payload = await req.json();

    if(payload.challenge){
      return NextResponse.json({ challenge: payload.challenge })
    }

    // Handle different event types
    if (payload.event === 'payment.success' && payload.status === 'SUCCESS') {
      const { amount, metadata } = payload.data;
      const userId = metadata.user_id;

      // Create order
      const orderResult = await createNewOrder(
        {
          user_id: userId,
          total: amount,
          status: 'completed',
        },
        metadata.items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        }))
      );

      // Handle order creation result
      if (orderResult.error) {
        return NextResponse.json(
          { error: 'Order creation failed' },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ error: 'Event not handled' }, { status: 400 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
