import useCartStore from "@/services/store/useCartStore";
import { currencyFormatter } from "@/utils/formatter";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";

const CartDetails = ({ items }) => {
  const { addToCart, removeFromCart } = useCartStore();
  if (items.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Your cart is empty!
      </p>
    );
  }

  const total = items.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <div className="space-y-6">
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 border border-zinc-200 rounded-lg p-4 shadow-sm"
          >
            <img
              src={item.images?.[0]}
              alt={item.title}
              className="w-16 h-16 object-cover rounded-md border"
            />
            <div className="flex-1 space-y-2">
              <p className="font-medium text-zinc-800">{item.title}</p>
              <div className="flex justify-between items-center">
                <p className="font-semibold mt-1 font-outfit">
                  {currencyFormatter(item.price)}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    className="p-1 border rounded bg-zinc-800 "
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Minus className="w-4 h-4 stroke-white" />
                  </button>
                  <p className="font-medium font-outfit">{item.quantity}</p>
                  <button
                    className="p-1 border rounded bg-zinc-800 "
                    onClick={() => addToCart(item)}
                  >
                    <Plus className="w-4 h-4 stroke-white" />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center px-1">
        <span className="font-medium text-zinc-800">Total:</span>
        <span className="font-semibold text-blue-600 font-outfit">
          {currencyFormatter(total)}
        </span>
      </div>

      {/* <Button className="w-full bg-blue-600 hover:bg-blue-700">
        Proceed to Checkout
      </Button> */}
    </div>
  );
};

export default CartDetails;
