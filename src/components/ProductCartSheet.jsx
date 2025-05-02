import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Button } from "./ui/button";
import useCartStore from "@/services/store/useCartStore";
import useProductStore from "@/services/store/useProductsStore";
import ProductDetails from "./ProductDetails";
import CartDetails from "./CartDetails";
import { ScrollArea } from "./ui/scroll-area";
import { useSearchParams, useNavigate } from "react-router-dom";
import updateSearchParams from "@/utils/updateSearchParams";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const ProductCartSheet = () => {
  const { cartItems, addToCart } = useCartStore();
  const { selectedProduct, productOpen, closeProduct } = useProductStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const isCartOpen = searchParams.get("cart") === "open";

  const handleClose = () => {
    if (productOpen) {
      closeProduct();
      setSearchParams(updateSearchParams({ product: null }));
    }
    if (isCartOpen) {
      setSearchParams(updateSearchParams({ cart: null }));
    }
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct);
    toast.info(`Added to cart`);
  };

  return (
    <Sheet open={productOpen || isCartOpen} onOpenChange={handleClose}>
      <SheetContent className="flex flex-col gap-0">
        <SheetHeader>
          <SheetTitle>
            {productOpen ? "Product Details" : isCartOpen ? "Cart" : ""}
          </SheetTitle>
          <SheetDescription>
            {productOpen
              ? "View product details and add to your cart."
              : isCartOpen
              ? "Review your items and proceed to checkout."
              : ""}
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-auto">
          <div className="grid gap-4 p-4">
            {productOpen ? (
              <ProductDetails product={selectedProduct} />
            ) : isCartOpen ? (
              <CartDetails items={cartItems} />
            ) : null}
          </div>
        </ScrollArea>
        <SheetFooter>
          {productOpen ? (
            <SheetClose asChild>
              <Button onClick={handleAddToCart} className="bg-blue-600">
                <div className="flex items-center gap-2">
                  <ShoppingCart /> Add To Cart
                </div>
              </Button>
            </SheetClose>
          ) : isCartOpen ? (
            <Button
              type="button"
              className="bg-blue-600"
              onClick={() => {
                setSearchParams(updateSearchParams({ cart: null }));
                navigate("/checkout");
              }}
              disabled={cartItems.length === 0}
            >
              Checkout
            </Button>
          ) : null}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ProductCartSheet;
