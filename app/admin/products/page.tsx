// app/admin/products/page.tsx

import AdminProductGrid from '@/app/components/admin/AdminProductGrid';
import { getProducts } from '@/lib/supabase/queries';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default async function AdminProductsPage() {
  const products = await getProducts();
  
  return (
    <>
      <section className="max-h-screen overflow-scroll scrollbar-custom pt-0">
        <h3 className="uppercase">Products</h3>

        <AdminProductGrid products={products} className='mb-28' />

        <Link
          href="/admin/products/add"
          className="w-fit px-4 aspect-square bg-accent rounded-full flex items-center justify-center md:hover:rotate-90 transition-all duration-300 fixed bottom-4 right-4 md:bottom-12 md:right-12 z-20 shadow-2xl">
          <Plus className="text-background" />
        </Link>
      </section>
    </>
  );
}
