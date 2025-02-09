// app/api/payments/webhook/route.ts
import { NextResponse } from 'next/server';
import chalk from 'chalk';
import { updateOrderStatus } from '@/lib/supabase/queries'; 

/**
 * The actual payload from Instasend is a flat object containing invoice details,
 * along with a challenge property. The interface below matches what you're seeing:
 */
interface InstasendWebhookPayload {
  invoice_id: string;
  state: string;  // e.g., "PENDING" or "COMPLETE"
  provider: string;
  charges: string;
  net_amount: string;
  currency: string;
  value: string;
  account: string;
  api_ref: string; // This corresponds to your order reference (e.g., "order-1739117867327")
  mpesa_reference: string | null;
  host: string;
  card_info: {
    bin_country: string | null;
    card_type: string | null;
  };
  retry_count: number;
  failed_reason: string | null;
  failed_code: string | null;
  failed_code_link: string | null;
  created_at: string;
  updated_at: string;
  challenge?: string;
}

export async function POST(req: Request) {
  try {
    const payload: InstasendWebhookPayload = await req.json();
    console.log(chalk.blue('Received Webhook Payload:'), chalk.white(JSON.stringify(payload, null, 2)));

    // Determine whether this is merely a verification request or a real event.
    // In your case, the payload always contains an invoice_id.
    // So if invoice_id exists, we assume it's a genuine event.
    if (!payload.invoice_id && payload.challenge) {
      console.log(chalk.magenta("Webhook verification challenge received:"), chalk.yellow(payload.challenge));
      return NextResponse.json({ challenge: payload.challenge });
    }

    // Process the event based on the state of the invoice
    if (payload.state === 'COMPLETE') {
      console.log(chalk.green("Processing completed payment for invoice:"), chalk.white(payload.invoice_id));
      console.log(chalk.green("Order reference (api_ref):"), chalk.white(payload.api_ref));
      
      // Here you update the corresponding order in the database.
      
      const updatedOrder = await updateOrderStatus({
        invoice_id: payload.invoice_id,
        status: 'completed',
      });

      console.log(chalk.white(updatedOrder));
      
      return NextResponse.json({ success: true }, { status: 200 });
    } else if (payload.state === 'PENDING') {
      console.log(chalk.yellow("Payment pending for invoice:"), chalk.white(payload.invoice_id));
      // Optionally, you could decide to log or process pending events differently.
      return NextResponse.json({ message: 'Payment pending' }, { status: 200 });
    } else {
      console.warn(chalk.yellow("Unhandled payment state:"), chalk.white(payload.state));
      return NextResponse.json({ error: 'Unhandled payment state' }, { status: 400 });
    }
  } catch (error) {
    console.error(chalk.red("Error processing webhook:"), chalk.white(error as Error));
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
