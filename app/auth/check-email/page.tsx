'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function CheckEmailPage() {
  const router = useRouter()

  useEffect(() => {
    const checkConfirmation = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email_confirmed_at) {
        router.push('/')
      }
    }

    const interval = setInterval(checkConfirmation, 5000)
    return () => clearInterval(interval)
  }, [router])

  return (
    <section className="py-24 flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
      <p className="text-foreground-light">
        We&apos;ve sent a confirmation link to your email address.
        <br />
        Please click the link to complete your registration.
      </p>
    </section>
  )
}