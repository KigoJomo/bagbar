// app/components/Checkout/MpesaForm.tsx

'use client';
import { FC, useState } from 'react';
import { Input } from '../Input';
import { BadgeInfo, Loader2 } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { useToast } from '@/context/toast-context';
import CtaButton from '../CtaButton';

const MpesaForm: FC = () => {
  const { cart } = useShop();
  const { showToast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + (item.product.price * item.quantity),
    0
  );

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate phone number format (254xxxxxxxxx)
    const phoneRegex = /^2547\d{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      showToast('Invalid phone number format. Use 2547XXXXXXXX', 'error');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/payments/mpesa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          phoneNumber,
          reference: `BB-${Date.now()}`, // Unique transaction reference
        }),
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Payment initiation failed');

      showToast('Payment request sent! Check your phone', 'success');
      // Handle order creation in background via webhook
    } catch (error) {
      showToast('Payment failed. Please try again', 'error');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h4 className="text-2xl font-semibold">Pay via M-Pesa</h4>
      <form onSubmit={handlePayment} className="space-y-4">
        <Input
          type="tel"
          label="M-Pesa Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))} // Numbers only
            placeholder="254712345678"
            pattern="^(2547\d{8}|2541\d{8})$"
            required
          />

        <div className="p-4 bg-foreground-faded/10 border border-foreground-faded flex gap-2">
          <BadgeInfo className="flex-shrink-0 text-accent" size={18} />
          <p className="text-sm">
            You&apos;ll receive a payment prompt on your phone. 
            Enter your M-Pesa PIN to complete the transaction.
          </p>
        </div>

        <CtaButton 
          label={loading ? 'Processing...' : `Pay Ksh ${total.toLocaleString()}`}
          icon={loading ? <Loader2 className="animate-spin" /> : undefined}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default MpesaForm;