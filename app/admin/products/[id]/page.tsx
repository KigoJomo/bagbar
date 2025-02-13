import { getProductById } from '@/lib/supabase/queries';
import Image from 'next/image';

export default async function AdminProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const product = await getProductById(id);

  return (
    <>
      <section className="">
        <h3 className="uppercase">Product</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={1000}
              height={1000}
              className="w-full"
            />
          </div>
          <div className="w-full">
            <h2 className="capitalize">{product.name}</h2>
            <p className="capitalize">ksh {product.price.toLocaleString()}</p>
            <p className="text-sm">{product.description}</p>
          </div>
        </div>
      </section>
    </>
  );
}
