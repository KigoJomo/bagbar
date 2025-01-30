import { supabase } from '@/lib/supabase/client';
import ProductGrid from '../components/ProductGrid';

export default async function ProductsPage() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .limit(10);

  // console.log('Products:', products);
  // console.log('Error:', error);

  return (
    <>
      <section className="flex flex-col gap-4">

        <div className="flex flex-col">
          <div className="w-full flex items-center">
            <h1 className='uppercase italic text-nowrap hover:not-italic transition-all duration-300'>our</h1>
            <div className="w-full h-[1px] bg-foreground-faded"></div>
          </div>
          <div className="w-full flex items-center -mt-6 md:-mt-28">
            <div className="w-full h-[1px] bg-foreground-faded"></div>
            <h1 className='uppercase italic text-nowrap hover:not-italic transition-all duration-300'>collection</h1>
          </div>
        </div>
        
        {/* <div className="w-full h-[1px] bg-foreground-faded"></div> */}

        {!error && products.length && (
          <ProductGrid products={products} />
        )}

        {error && <div>Error loading products: {error.message}</div>}

        {!products?.length && <div>No products found.</div>}
      </section>
    </>
  );
}
