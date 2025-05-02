import useCartStore from "@/services/store/useCartStore";
import useProductStore from "@/services/store/useProductsStore";
import updateSearchParams from "@/utils/updateSearchParams";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const ProductCard = React.memo(({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const openProduct = useProductStore((state) => state.openProduct);
  const [_, setSearchParams] = useSearchParams();

  const handleProductClick = () => {
    openProduct(product);
    setSearchParams(updateSearchParams({ product: product.id }));
  };

  const handleAddToCard = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      whileTap={{ scale: 0.8 }}
      className="relative w-full max-w-sm mx-auto shadow-md hover:shadow-xl transition duration-300 rounded-xl overflow-hidden p-0 gap-0"
      onClick={handleProductClick}
    >
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-3 right-3 z-10 bg-white/70 backdrop-blur-md hover:bg-white shadow-md"
        onClick={handleAddToCard}
      >
        <Plus className="w-5 h-5 text-gray-800" />
      </Button>

      <CardHeader className="p-0 relative">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-56 object-cover"
        />

        <Badge variant={"secondary"} className="absolute top-4 left-2">
          {product.category.name}
        </Badge>
        <div className="px-4 space-y-2">
          <CardTitle className="text-base font-semibold line-clamp-2 text-zinc-800">
            {product.title}
          </CardTitle>
          <CardDescription>
            <span className="line-clamp-1">{product.description}</span>{" "}
            <span className="text-xs text-zinc-950 font-medium hover:underline cursor-pointer">
              read more...
            </span>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="py-4 px-4 flex flex-col justify-between h-full">
        <p className="text-xs mb-1 text-zinc-500">Price</p>
        <p className="text-zinc-600 font-outfit">$ {product.price}</p>
      </CardContent>
    </motion.div>
  );
});

export default ProductCard;
