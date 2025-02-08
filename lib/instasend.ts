// lib/instasend.ts
import crypto from 'crypto';

export const verifyInstasendSignature = async (req: Request) => {
  const signature = req.headers.get('x-instasend-signature');
  const rawBody = await req.text();
  
  const hmac = crypto.createHmac('sha256', process.env.INSTA_WEBHOOK_SECRET!);
  const digest = hmac.update(rawBody).digest('hex');
  
  return signature === digest;
};

// challenge: rocinante