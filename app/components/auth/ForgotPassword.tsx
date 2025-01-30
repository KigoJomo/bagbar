'use client'
import { supabase } from '@/lib/supabase/client'

export default function ForgotPassword() {
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    
    const { error } = await supabase.auth.resetPasswordForEmail(
      formData.get('email') as string,
      { redirectTo: `${location.origin}/auth/reset-password` }
    )

    if (!error) alert('Check your email for reset link!')
  }

  return (
    <form onSubmit={handleReset}>
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit">Send Reset Link</button>
    </form>
  )
}