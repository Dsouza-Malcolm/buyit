import useCartStore from "@/services/store/useCartStore";
import { ShoppingCart } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const AddToCart = ({ product }) => {
  const { addToCart, cartItems } = useCartStore();

  const handleAddToCard = (e) => {
    e.stopPropagation();
    toast.info("Product added to Cart");
    addToCart(product);
  };

  const isInCart = cartItems.some((item) => item.id === product.id);

  return (
    <Button
      size="icon"
      variant="ghost"
      className="absolute top-3 right-3 z-10 bg-white/70 backdrop-blur-md hover:bg-white shadow-md"
      onClick={handleAddToCard}
    >
      {isInCart ? (
        <ShoppingCart className="w-5 h-5 stroke-blue-600 stroke-3" />
      ) : (
        <Plus className="w-5 h-5 text-gray-800" />
      )}
    </Button>
  );
};

export default AddToCart;
