'use client'
import { supabase } from '@/lib/supabase/client'
import { Input } from '../Input'
import CtaButton from '../CtaButton'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle, LogIn } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      })

      if (error) throw error
      router.push('/') 
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  // const handleGoogleLogin = async () => {
  //   await supabase.auth.signInWithOAuth({
  //     provider: 'google',
  //     options: { redirectTo: `${location.origin}/auth/callback` }
  //   })
  // }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <form onSubmit={handleLogin} className="w-full space-y-6">
        <div className="space-y-4">
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
          label={loading ? "Signing in..." : "Login"} 
          hideIcon
          icon={loading? <LoaderCircle size={16} className='animate-spin'/> : <LogIn size={16} />}
          type="submit" 
          disabled={loading}
        />
      </form>

      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-foreground-light" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-foreground-light">OR</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2 border border-foreground-light rounded-none px-4 py-2 hover:bg-foreground-faded transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          <path fill="none" d="M0 0h48v48H0z"/>
        </svg>
        Continue with Google
      </button> */}

      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link 
          href="/auth/signup" 
          className="text-primary hover:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  )
}