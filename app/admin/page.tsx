import { supabase } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'
import ProductForm from '../components/admin/ProductForm';

export default async function AdminPage() {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
    redirect('/login')
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ProductForm />
    </div>
  )
}