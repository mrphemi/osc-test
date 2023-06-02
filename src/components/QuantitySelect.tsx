interface QuantitySelectProps {
  quantity: number;
  decrementQuantity: () => void;
  incrementQuantity: () => void;
}

const QuantitySelect = ({
  quantity,
  decrementQuantity,
  incrementQuantity,
}: QuantitySelectProps) => {
  return (
    <div className="inline-flex items-center gap-x-10 text-gray-600 font-semibold p-4 border border-gray-600">
      <button
        onClick={decrementQuantity}
        className="bg-gray-800 rounded-full w-8 h-8 text-white"
      >
        -
      </button>
      <p className="w-6">{quantity}</p>
      <button
        onClick={incrementQuantity}
        className="bg-gray-800 rounded-full w-8 h-8 text-white"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelect;
