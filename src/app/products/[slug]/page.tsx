import { getProduct } from "@/lib/api";

import SingleProduct from "@/components/SingleProduct";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { product } = await getProduct(params.slug);
  // const outOfStock = product.availableForSale === 0;

  return (
    <>
      <main className="container my-10">
        <SingleProduct product={product} />
      </main>
    </>
  );
}
