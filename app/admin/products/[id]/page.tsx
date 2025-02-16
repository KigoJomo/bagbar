// app/admin/products/[id]/page.tsx

import { getProductById } from '@/lib/supabase/queries';
import AdminProductActions from '@/app/components/Admin/AdminProductActions';

export default async function AdminProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  return <AdminProductActions product={product} />;
}
