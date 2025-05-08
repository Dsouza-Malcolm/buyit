import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useCartStore from "@/services/store/useCartStore";
import useMyOrders from "@/services/store/useMyOrders";
import confetti from "canvas-confetti";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const cartItems = useCartStore((state) => state.cartItems);
  const clearCart = useCartStore((state) => state.clearCart);
  const placeNewOrder = useMyOrders((state) => state.placeNewOrder);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0 || loading) return;
    setLoading(true);

    setTimeout(() => {
      const order = {
        id: Date.now(),
        items: cartItems,
        totalAmount: totalPrice.toFixed(2),
        placedAt: new Date().toISOString(),
      };

      placeNewOrder(order);
      clearCart();

      toast.success(`Thanks! Order Placed`);

      confetti({
        particleCount: 200,
        startVelocity: 30,
        spread: 360,
        ticks: 350,
        origin: { y: 0 },
        gravity: 1.2,
      });

      setTimeout(() => {
        navigate("/products");
      }, 2000);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 min-h-dvh my-10">
      <h2 className="text-2xl font-semibold text-zinc-800">Checkout</h2>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <Card
            key={item.id}
            className="flex items-center flex-row gap-4 p-4 shadow-sm"
          >
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-lg border"
            />
            <div className="w-full space-y-2">
              <p className="text-base font-medium text-zinc-700 line-clamp-2">
                {item.title}
              </p>
              <div className="flex justify-between">
                <p className="text-sm text-zinc-500">Qty: {item.quantity}</p>
                <div className="text-right text-zinc-600 font-outfit">
                  $ {item.totalPrice}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Separator />
      <div className="flex justify-between items-center px-1">
        <p className="text-lg font-medium text-zinc-700">Total</p>
        <p className="text-lg font-semibold text-blue-600 font-outfit">
          $ {totalPrice.toFixed(2)}
        </p>
      </div>

      <div className="text-right">
        <Button
          size="lg"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl w-full flex items-center justify-center gap-2"
          onClick={handlePlaceOrder}
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Processing..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPage;
