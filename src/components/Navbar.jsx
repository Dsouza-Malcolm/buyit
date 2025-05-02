import useAuthStore from "@/services/store/useAuthStore";
import useCartStore from "@/services/store/useCartStore";
import updateSearchParams from "@/utils/updateSearchParams";
import { ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { cartItems } = useCartStore((state) => state);
  const itemCount = cartItems.length;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleOpenCart = () => {
    setSearchParams(updateSearchParams({ cart: "open" }));
  };

  const location = useLocation();
  const currentPath = location.pathname;
  const isCartOpen = searchParams.get("cart") === "open";

  return (
    <nav className="w-full px-4 py-3 shadow-sm bg-background flex justify-between items-center sticky top-0 z-50 border-b">
      <Link
        to="/"
        className="text-3xl font-black  text-zinc-700 font-play-fair select-none"
      >
        Buy<span className="text-blue-500">it</span>
      </Link>

      <div className="items-center space-x-10 hidden md:flex">
        <Link
          to="/"
          className={cn(
            "text-sm hover:text-blue-600",
            currentPath === "/" ? "text-blue-600 font-semibold" : ""
          )}
        >
          Home
        </Link>
        <Link
          to="/products"
          className={cn(
            "text-sm hover:text-blue-600",
            currentPath === "/products" ? "text-blue-600 font-semibold" : ""
          )}
        >
          Products
        </Link>

        {user && (
          <Link
            className={cn(
              "text-sm hover:text-blue-600",
              currentPath === "/my-orders" ? "text-blue-600 font-semibold" : ""
            )}
            to="my-orders"
          >
            My Orders
          </Link>
        )}

        <div
          onClick={handleOpenCart}
          className={cn(
            "text-sm hover:text-blue-600 cursor-pointer",
            isCartOpen ? "text-blue-600 font-semibold" : ""
          )}
        >
          <div className="relative flex items-center gap-1">
            <div className="relative">
              <ShoppingCart className="size-6 stroke-zinc-700" />
              <AnimatePresence>
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] min-w-[16px] h-[16px] flex items-center justify-center rounded-full px-1"
                >
                  {itemCount}
                </motion.span>
              </AnimatePresence>
            </div>
            <span>Cart</span>
          </div>
        </div>

        {user ? (
          <>
            <span className="text-sm text-gray-600">
              Hi, {user.email.slice(0, 4)}
            </span>
            <Button
              className="cursor-pointer"
              onClick={handleLogout}
              variant="outline"
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </div>

      <div className="md:hidden flex items-center gap-12">
        <div onClick={handleOpenCart} className="relative cursor-pointer">
          <ShoppingCart className="size-6 stroke-zinc-700" />
          {
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] min-w-[16px] h-[16px] flex items-center justify-center rounded-full px-1">
              {itemCount}
            </span>
          }
        </div>

        <Sheet>
          <SheetTrigger>
            <Menu className="size-6 stroke-zinc-700" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[85%] p-6">
            <nav className="flex flex-col gap-6 pt-6">
              <SheetHeader className="px-0">
                <SheetTitle>
                  {user && (
                    <span className="text-gray-600 ">
                      Hi,{" "}
                      <span className="font-play-fair text-xl">
                        {user.email.slice(0, 4)}
                      </span>
                    </span>
                  )}
                </SheetTitle>

                <SheetDescription className="sr-only"></SheetDescription>
              </SheetHeader>

              <Link
                to="/"
                className={cn(
                  "text-lg hover:text-blue-600 ",
                  currentPath === "/" ? "text-blue-600 font-semibold" : ""
                )}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={cn(
                  "text-lg hover:text-blue-600 ",
                  currentPath === "/products"
                    ? "text-blue-600 font-semibold"
                    : ""
                )}
              >
                Products
              </Link>
              {user && (
                <Link
                  className={cn(
                    "text-lg hover:text-blue-600",
                    currentPath === "/my-orders"
                      ? "text-blue-600 font-semibold"
                      : ""
                  )}
                  to="my-orders"
                >
                  My Orders
                </Link>
              )}
            </nav>

            <SheetFooter>
              {user ? (
                <>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => navigate("/login")}
                  className="w-full bg-blue-600"
                >
                  Login
                </Button>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
