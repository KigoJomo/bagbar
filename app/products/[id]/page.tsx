import { supabase } from "@/lib/supabase/client";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;

  const { data: product, error } = await supabase.from("products").select("*").eq("id", id).single();


  return (
    <>
      <section className="w-full">
        <h1>{product?.name}</h1>
        <p>{product?.description}</p>
        <p>ksh {product?.price}</p>

        {error && <div>An error occurred {error.message}</div>}
      </section>
    </>
  );
}
