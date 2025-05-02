import useProductStore from "@/services/store/useProductsStore";
import updateSearchParams from "@/utils/updateSearchParams";
import { motion } from "framer-motion";
import React from "react";
import { useSearchParams } from "react-router-dom";
import AddToCart from "./cart/AddToCart";
import { Badge } from "./ui/badge";
import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const ProductCard = React.memo(({ product }) => {
  const openProduct = useProductStore((state) => state.openProduct);
  const [_, setSearchParams] = useSearchParams();

  const handleProductClick = () => {
    openProduct(product);
    setSearchParams(updateSearchParams({ product: product.id }));
  };

  return (
    <motion.div
      whileTap={{ scale: 0.8 }}
      className="relative w-full max-w-sm mx-auto shadow-md hover:shadow-xl transition duration-300 rounded-xl overflow-hidden p-0 gap-0"
      onClick={handleProductClick}
    >
      <AddToCart product={product} />

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
