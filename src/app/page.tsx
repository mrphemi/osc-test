import { getProducts } from "@/lib/api";

import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";

export default async function ProductsPage() {
  const { products } = await getProducts();

  const productsList = products.edges;

  return (
    <>
      <Banner />
      <main className="container mt-10">
        <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 my-10">
          {productsList.map((product: any) => (
            <ProductCard
              key={product.node.id}
              title={product.node.title}
              slug={product.node.handle}
              featuredImage={product.node.featuredImage.url}
              price={`$ ${product.node.priceRange.minVariantPrice.amount} ${product.node.priceRange.minVariantPrice.currencyCode}`}
            />
          ))}
        </ul>
      </main>
    </>
  );
}
