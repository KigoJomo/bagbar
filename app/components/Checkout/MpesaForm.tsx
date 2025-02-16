// app/components/Checkout/MpesaForm.tsx

'use client';
import { FC, useEffect, useState } from 'react';
import { Input } from '../Input';
import { BadgeInfo, Loader2 } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { useToast } from '@/context/toast-context';
import CtaButton from '../CtaButton';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const MpesaForm: FC = () => {
  const [user, setUser] = useState<{
    userId: string;
    email: string;
    first_name?: string;
    last_name?: string;
  } | null>(null);

  const { cart } = useShop();
  const { showToast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
        error: authError,
      } = await supabase.auth.getSession();

      if (authError || !session) {
        return;
      }

      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        const { data: profileData } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', authUser?.id)
          .single();

        if (authUser) {
          setUser({
            userId: authUser.id,
            email: authUser.email || '',
            last_name: profileData?.last_name || '',
            first_name: profileData?.first_name || '',
          });
        }
      } catch (error) {
        console.error('User fetch error:', error);
      }
    };

    fetchUser();
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate phone number format (254xxxxxxxxx)
    const phoneRegex = /^2547\d{8}|2541\d{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      showToast('Invalid phone number format. Use 254XXXXXXXXX', 'error');
      setLoading(false);
      return;
    }

    try {
      /**
       * Initiates an MPesa payment by sending payment details to the '/api/payments/mpesa' endpoint.
       *
       * The request payload is a JSON object with the following structure:
       *
       * {
       *   userId: string | undefined,
       *   amount: number,
       *   phoneNumber: string,
       *   firstName: string | undefined,
       *   lastName: string | undefined,
       *   email: string | undefined,
       *   orderItems: Array<{
       *     product_id: string,
       *     quantity: number,
       *     price: number,
       *   }>
       * }
       *
       * Example payload:
       *
       * {
       *   userId: "user123",
       *   amount: 200.00,
       *   phoneNumber: "0712345678",
       *   firstName: "Jane",
       *   lastName: "Doe",
       *   email: "jane.doe@example.com",
       *   orderItems: [
       *     { product_id: "101", quantity: 2, price: 75.00 },
       *     { product_id: "202", quantity: 1, price: 50.00 }
       *   ]
       * }
       * 
       * For Postman Testing:
       * {
          "userId": "8768a5cc-8297-45bd-acf5-645a8246afc7",
          "amount": 2797,
          "phoneNumber": "254114900087",
          "firstName": "Jomo",
          "lastName": "Kigo",
          "email": "kigojomo@gmail.com.com",
          "orderItems": [
                {
                  "product_id": "1d6ab955-1278-45e7-a87a-c206161acbfc",
                  "quantity": 2,
                  "price": 2198
                },
                {
                  "product_id": "5f8bbbe7-1826-4b00-a0fc-ec069e59a7ad",
                  "quantity": 1,
                  "price": 599
                }
            ]
          }
       *
       * @returns {Promise<Response>} A promise that resolves to the response of the fetch call.
       */
      const res = await fetch('/api/payments/mpesa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.userId,
          amount: total,
          phoneNumber,
          firstName: user?.first_name,
          lastName: user?.last_name,
          email: user?.email,
          orderItems: cart.map((item) => ({
            product_id: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Payment initiation failed');

      showToast(
        'Payment request sent!\nComplete the transaction to place your order.',
        'success'
      );

      if (data.redirectUrl) {
        router.push(data.redirectUrl);
      }

      console.log(data);
    } catch (error) {
      showToast('Payment failed. Please try again', 'error');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h4 className="text-2xl font-semibold">complete your checkout</h4>
      <span style={{ display: 'block', textAlign: 'center' }} className=''>
        <Link href="https://intasend.com/security" target="_blank" className='flex justify-center'>
          <Image
            src="https://intasend-prod-static.s3.amazonaws.com/img/trust-badges/intasend-trust-badge-with-mpesa-hr-light.png"
            width={375}
            height={375}
            alt="IntaSend Secure Payments (PCI-DSS Compliant)"
          />
        </Link>
        <strong>
          <a
            style={{
              display: 'block',
              color: '#454545',
              textDecoration: 'none',
              fontSize: '0.8em',
              marginTop: '0.6em',
            }}
            href="https://intasend.com/security"
            target="_blank">
            Secured by IntaSend Payments
          </a>
        </strong>{' '}
      </span>
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
            You&apos;ll receive a payment prompt on your phone. Enter your
            M-Pesa PIN to complete the transaction.
          </p>
        </div>

        <CtaButton
          label={
            loading ? 'Processing...' : `Pay Ksh ${total.toLocaleString()}`
          }
          icon={loading ? <Loader2 className="animate-spin" /> : undefined}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default MpesaForm;
