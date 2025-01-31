import { supabase } from '@/lib/supabase/client';
import ProductGrid from '../components/ProductGrid';
import SplitTitle from '../components/SplitTitle';

export default async function ProductsPage() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .limit(10);

  return (
    <>
      <section className="flex flex-col gap-4 pt-0">

        <SplitTitle text="our collection" />

        {!error && products.length && (
          <ProductGrid products={products} />
        )}

        {error && <div>Error loading products: {error.message}</div>}

        {!products?.length && <div>No products found.</div>}
      </section>
    </>
  );
}
