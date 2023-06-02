"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useReadLocalStorage } from "usehooks-ts";

import { getCart, updateCart, deleteCartItem } from "@/lib/api";

import CartItem from "./CartItem";

const Cart = () => {
  const cartId = useReadLocalStorage("cartId") as string;

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartTotal, setCartTotal] = useState("");
  const [loading, setLoading] = useState(true);

  const deriveCartTotalString = (amount: string, currencyCode: string) => {
    return setCartTotal(`${amount} ${currencyCode}`);
  };

  const retrieveCart = async () => {
    if (!cartId) {
      setLoading(false);
      return;
    }

    const { cart } = await getCart(cartId);

    const amount = cart.estimatedCost.totalAmount.amount;
    const currencyCode = cart.estimatedCost.totalAmount.currencyCode;

    setCartItems(cart.lines.edges);
    deriveCartTotalString(amount, currencyCode);
    setLoading(false);
  };

  // Todo: replace this with swr or react query
  useEffect(() => {
    retrieveCart();
  }, []);

  const updateCartItem = async (
    lineId: string,
    variantId: string,
    quantity: number
  ) => {
    const cart = await updateCart(cartId, lineId, variantId, quantity);

    const amount = cart.cartLinesUpdate.cart.estimatedCost.totalAmount.amount;
    const currencyCode =
      cart.cartLinesUpdate.cart.estimatedCost.totalAmount.currencyCode;

    setCartItems(cart.cartLinesUpdate.cart.lines.edges);
    deriveCartTotalString(amount, currencyCode);
  };

  const deleteItem = async (lineId: string) => {
    const cart = await deleteCartItem(cartId, lineId);

    const amount = cart.cartLinesRemove.cart.estimatedCost.totalAmount.amount;
    const currencyCode =
      cart.cartLinesRemove.cart.estimatedCost.totalAmount.currencyCode;

    setCartItems(cart.cartLinesRemove.cart.lines.edges);
    deriveCartTotalString(amount, currencyCode);
  };

  const cartHasItems = cartItems.length > 0;

  return (
    <div>
      {cartHasItems && (
        <>
          <h1 className="text-6xl font-bold">Cart</h1>
          <ul className="mt-10 space-y-8">
            {cartItems.map((item) => (
              <CartItem
                item={item}
                key={item.node.id}
                onUpdateCartItem={updateCartItem}
                onDeleteCartItem={deleteItem}
              />
            ))}
          </ul>
          {cartTotal && (
            <h2 className="font-bold text-5xl mt-20">Subtotal: {cartTotal}</h2>
          )}
        </>
      )}

      {!cartHasItems && !loading && (
        <div className="space-y-10 text-center">
          <h1 className="text-6xl font-bold">Your cart is empty.</h1>
          <Link
            href="/"
            className="text-lg font-medium py-4 px-8 bg-gray-800 text-white inline-block"
          >
            Continue shopping
          </Link>
        </div>
      )}

      {loading && (
        <h1 className="text-4xl font-bold text-center">Loading Cart....</h1>
      )}
    </div>
  );
};

export default Cart;
