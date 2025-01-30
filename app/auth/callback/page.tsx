'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function CallbackPage() {
  const router = useRouter()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.push('/')
      }
    })
  }, [router])

  return (
    <section className="py-24 flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Redirecting...</h1>
      <p>Please wait while we authenticate your account</p>
    </section>
  )
}