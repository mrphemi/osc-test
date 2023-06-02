import Image from "next/image";
import Link from "next/link";

import { useUpdateEffect } from "usehooks-ts";

import useQuantity from "@/hooks/useQuantity";
import QuantitySelect from "./QuantitySelect";

interface CartItemProps {
  item: any;
  onUpdateCartItem: (
    lineId: string,
    variantId: string,
    quantity: number
  ) => void;
  onDeleteCartItem: (lineId: string) => void;
}

const CartItem = ({
  item,
  onUpdateCartItem,
  onDeleteCartItem,
}: CartItemProps) => {
  const price = item.node.merchandise.price.amount;
  const image = item.node.merchandise.product.featuredImage.url;
  const itemQuantity = item.node.quantity;
  const title = item.node.merchandise.product.title;
  const handle = item.node.merchandise.product.handle;
  const itemId = item.node.merchandise.id;
  const lineId = item.node.id;

  const { quantity, incrementQuantity, decrementQuantity } =
    useQuantity(itemQuantity);

  // Runs after mount when item quantity changes
  useUpdateEffect(() => {
    onUpdateCartItem(lineId, itemId, quantity);
  }, [quantity]);

  return (
    <li className="flex flex-col md:flex-row justify-between gap-8">
      <div className="flex gap-x-8">
        <Link href={`/products/${handle}`}>
          <Image src={image} width={150} height={150} alt="image" />
        </Link>
        <div className="space-y-2">
          <h2 className="font-medium text-lg">{title}</h2>
          <p className="text-grey-600">per unit: {price}</p>
          <button onClick={() => onDeleteCartItem(lineId)}>Delete</button>
        </div>
      </div>

      <div className="space-y-4 md:self-end">
        <QuantitySelect
          quantity={quantity}
          decrementQuantity={decrementQuantity}
          incrementQuantity={incrementQuantity}
        />
        <p className="text-xl font-medium">${parseFloat(price) * quantity}</p>
      </div>
    </li>
  );
};

export default CartItem;
