import CartButton from '@/app/components/CartButton';
import FavsButton from '@/app/components/FavsButton';
import GalleryCarousel from '@/app/components/GalleryCarousel';
import HorizontalGallery from '@/app/components/HorizontalGallery';
import { supabase } from '@/lib/supabase/client';
import { Product } from '@/types/declarations';
import { PostgrestError } from '@supabase/supabase-js';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return <div>Error loading product: {error.message}</div>;
  }

  const { data: similarProducts, error: similarError } = await supabase
    .from('products')
    .select('*')
    .neq('id', id)
    .limit(4) as { data: Product[], error: PostgrestError | null };

  return (
    <>
      <section className="p-0 md:pt-12 md:px-12 flex flex-col md:flex-row md:gap-6">
        <div className="w-full md:w-1/2 h-fit md:order-2">
          <GalleryCarousel images={product.images} />
        </div>

        <div className="details w-full md:w-1/2 md:aspect-[4/3] px-4 flex flex-col gap-6">
          <div className="w-full flex flex-col gap-1">
            <h2 className="capitalize hidden md:flex">{product.name}</h2>
            <h3 className="capitalize md:hidden">{product.name}</h3>
            <p className="capitalize ml-2 pl-2 border-l-4 border-accent">
              ksh {product.price.toLocaleString()}
            </p>
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="text-xs opacity-50">About:</p>
            <p className="text-sm">{product.description}</p>
          </div>

          <hr className="" />

          <div className="buttons w-full flex flex-col gap-4">
            <CartButton
              product={product}
              showText
              className="w-full md:w-full"
            />
            <FavsButton
              product={product}
              showText
              className="w-full md:w-full"
            />
          </div>
        </div>
      </section>

      <hr className="border-foreground-faded my-8 md:my-2" />

      <section className="md:pt-0  flex flex-col gap-6 ">
        <h3 className="capitalize">you may also like</h3>

        <HorizontalGallery products={similarProducts} />

        {similarError && (
          <div>Error loading similar products: {similarError.message}</div>
        )}
      </section>
    </>
  );
}
