// app/admin/products/page.tsx

import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminProductsPage() {
  return (
    <>
      <section className="">
        <h2 className="uppercase">Products</h2>

        {/* AdminProductGrid goes here */}

        <Link
          href="/admin/products/add"
          className="w-fit px-4 aspect-square bg-accent rounded-full flex items-center justify-center md:hover:rotate-90 transition-all duration-300 fixed bottom-4 right-4 md:bottom-12 md:right-12">
          <Plus className="text-background" />
        </Link>
      </section>
    </>
  );
}
