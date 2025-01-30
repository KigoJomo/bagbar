'use client'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/context/AuthContext'

export default function ProductForm() {
  const { isAdmin } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAdmin) return
    
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    
    const { error } = await supabase.from('products').insert({
      name: formData.get('name'),
      price: parseFloat(formData.get('price') as string),
      description: formData.get('description'),
      images: [formData.get('image')]
    })

    if (!error) alert('Product added!')
  }

  if (!isAdmin) return <div>Unauthorized</div>

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Product Name" required />
      <input name="price" type="number" step="0.01" required />
      <textarea name="description" required />
      <input name="image" type="file" accept="image/*" />
      <button type="submit">Add Product</button>
    </form>
  )
}