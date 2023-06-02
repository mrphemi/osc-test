import { useState } from "react";

const useQuantity = (initialQuantity?: number) => {
  const [quantity, setQuantity] = useState(
    initialQuantity ? initialQuantity : 1
  );

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity === 1) return;
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  return {
    quantity,
    incrementQuantity,
    decrementQuantity,
    setQuantity,
  };
};

export default useQuantity;
