'use client';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '../Input';
import CtaButton from '../CtaButton';
import Link from 'next/link';
import { LoaderCircle, LogIn } from 'lucide-react';

export default function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        options: {
          data: {
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
          },
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      router.push('/auth/check-email');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <form onSubmit={handleSignup} className="w-full space-y-6">
        <div className="space-y-4">

          <Input
            id="first_name"
            name="first_name"
            type="text"
            placeholder="First name"
            required
          />

          <Input
            id="last_name"
            name="last_name"
            type="text"
            placeholder="Last name"
            required
          />

          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />

          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <CtaButton
          label={loading ? 'Creating account...' : 'Sign Up'}
          hideIcon
          icon={
            loading ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <LogIn size={16} />
            )
          }
          type="submit"
          disabled={loading}
        />
      </form>

      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-primary hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
