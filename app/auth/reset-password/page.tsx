'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Input } from '@/app/components/Input'
import CtaButton from '@/app/components/CtaButton'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = await supabase.auth.updateUser({ password })
    
    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('Password updated successfully!')
      setTimeout(() => router.push('/'), 2000)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto space-y-6 py-12">
      <h1 className="text-2xl font-bold text-center">Reset Password</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="password"
          type="password"
          label="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {message && (
          <p className={`text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}

        <CtaButton
          label={loading ? "Updating..." : "Reset Password"}
          type="submit"
          disabled={loading}
        />
      </form>
    </div>
  )
}