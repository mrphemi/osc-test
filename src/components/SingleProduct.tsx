"use client";

import Image from "next/image";
import { useLocalStorage } from "usehooks-ts";

import { createCart, addToCart } from "@/lib/api";
import useQuantity from "@/hooks/useQuantity";

import QuantitySelect from "./QuantitySelect";

interface Props {
  product: any;
}

const SingleProduct = ({ product }: Props) => {
  const { quantity, incrementQuantity, decrementQuantity } = useQuantity();
  const [cartId, setCartId] = useLocalStorage("cartId", "");

  const priceString = `$ ${product.variants.edges[0].node.price.amount} ${product.variants.edges[0].node.price.currencyCode}`;
  const variantId = product.variants.edges[0].node.id;
  const isSoldOut = product.availableForSale;

  /**
   * if cart exists (check localstorage for cart id),
   * add item to cart
   * otherwise, create a new cart and save id to localstorage
   */
  const addItemToCart = async () => {
    if (!cartId) {
      const cart = await createCart(variantId, quantity);
      setCartId(cart.cartCreate.cart.id);
    } else {
      addToCart(cartId, variantId, quantity);
    }
    // Todo: use toast notification for alert
    alert(`Product(${product.title}) added to cart`);
  };

  return (
    <div className="grid xl:grid-cols-2 gap-8">
      <Image
        src={product.featuredImage.url}
        alt={product.title}
        width={500}
        height={500}
        priority
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACmAKYDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAECAwb/xAAYEAEBAQEBAAAAAAAAAAAAAAAAARESAv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDswAAAAAAgMENAwWjQMFoAwAAAAAgAAIAAACgCAyGloHpaWloHo1OloL0ajRoL09Z6egvRqNPQVo1OjQVo1OjQMFo0DBaAVo0tLQPStK0rQO1NpWptBWlqbU6DTS6R0XQNeh0y6PoGujWfR6DTT1np6C9Gp0aC9Gp0aCtCdAK0aRaAtK0WptAWotFqbQFpWptTaCuh0z0dA06Ppl0NBtPRyspTlBrKqVlKqUGmnqJT0F6NTp6CtCQCyoKgVTadTQTai1VRQTam06i0BaWlaWgrTlRpyguVUrOVUoNZVSs4qA0lOVEVAWaYYGCALFMqCairqaDOorSooM6irqaCKSrCwCOFhyAcXEyKgKi4mKgKiomKgHDBgAADQlECamrsTYDOxFjWxFgMrE2NLE2AzsLGmFgIw5FYeAmRUhyKkApFSHIcgCRUEh4AMYYAAA1wYrCwE2JsXYVgM7E2NLE2AysKxrYnAZ8ly1wuQZ8nyvk+QRhyLw8BMhyKw8BOHh4eAWDFYMAgeAGuDDAJwrFYWAiwrF4WAjCxphYDPBjTBgM8PF4MBGHi8GAnBi8GAnBisGAnBisAJwKANAYAiMAnCxQBOFigCcGKwYBYMVgwE4eHgAsGGATgUQEDICBgGgAAEAAIAAAAAAAGAAAAAAAQAAgAAAAP/9k="
      />

      <div className="space-y-10">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">{product.title}</h1>
          <div className="flex items-center gap-x-8">
            <p className="text-lg font-medium">{priceString}</p>
            {!isSoldOut && (
              <p className="py-1 px-2 bg-gray-800 text-white text-xs rounded-xl">
                Sold Out
              </p>
            )}
          </div>
        </div>

        <p className="max-w-sm text-gray-600">{product.description}</p>

        <div className="space-y-2">
          <p className="text-lg font-semibold">Quantity</p>
          <QuantitySelect
            quantity={quantity}
            decrementQuantity={decrementQuantity}
            incrementQuantity={incrementQuantity}
          />
        </div>

        <button
          className="w-full md:w-auto bg-gray-800 py-4 px-8 text-white font-medium text-lg disabled:cursor-not-allowed"
          disabled={!isSoldOut}
          onClick={addItemToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
