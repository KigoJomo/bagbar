import { supabase } from '@/lib/supabase/client';

export default async function ProductsPage() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .limit(10);

  console.log('Products:', products);
  console.log('Error:', error);

  return (
    <>
      <section className="flex flex-col gap-4">
        <h2>Products</h2>
        <hr />

        {!error && products.length && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products?.map((product) => (
              <div key={product.id} className="w-full">
                <h3>{product.name}</h3>
                <p>ksh {product.price}</p>
              </div>
            ))}
          </div>
        )}

        {error && <div>Error loading products: {error.message}</div>}

        {!products?.length && <div>No products found.</div>}
      </section>
    </>
  );
}
