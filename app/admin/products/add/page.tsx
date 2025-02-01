'use client'
import ProductForm from '@/app/components/admin/ProductForm'
import { useToast } from '@/context/toast-context';
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AddProductPage() {
  const { showToast } = useToast()
  const router = useRouter()
  const [error, setError] = useState('')

  const handleSubmit = async (productData: {
    name: string;
    description: string;
    price: number;
    images: string[];
  }) => {
    try {
      const { error } = await supabase
        .from('products')
        .insert([{
          name: productData.name,
          description: productData.description,
          price: productData.price,
          images: productData.images,
        }]);
  
      if (error) throw error;
  
      showToast('Product added successfully!', 'success');
      router.push('/products');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product');
      console.error('Submission error:', err);
    }
  };

  return (
    <section className="">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
      <ProductForm onSubmit={handleSubmit} error={error} />
    </section>
  )
}