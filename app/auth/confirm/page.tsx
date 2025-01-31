'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import CtaButton from '@/app/components/CtaButton'

export default function ConfirmPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('Verifying email...')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user?.email_confirmed_at) {
        setMessage('Email already verified!')
        setSuccess(true)
      }
      setLoading(false)
    }
    
    checkSession()
  }, [])

  const resendConfirmation = async () => {
    setLoading(true)
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: (await supabase.auth.getUser()).data.user?.email || ''
    })

    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('Confirmation email resent! Check your inbox.')
    }
    setLoading(false)
  }

  return (
    <section className="py-24 flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Email Confirmation</h1>
      
      <div className="space-y-4">
        <p className="text-foreground-light">{message}</p>
        
        {!success && (
          <CtaButton
            label={loading ? "Processing..." : "Resend Confirmation"}
            onClick={resendConfirmation}
            disabled={loading}
          />
        )}

        <button
          onClick={() => router.push('/')}
          className="text-primary hover:underline"
        >
          Return to homepage
        </button>
      </div>
    </section>
  )
}