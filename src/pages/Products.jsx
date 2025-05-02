import Category from "@/components/Category";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import SkeletonProductCard from "@/components/SkeletonProductCard";
import useCategoryStore from "@/services/store/useCategoryStore";
import useProductStore from "@/services/store/useProductsStore";
import useSearchBarStore from "@/services/store/useSearchBarStore";
import searchFilterHandler from "@/utils/searchFilterHandler";
import { AnimatePresence, motion } from "framer-motion";
import { Frown } from "lucide-react";
import { useEffect } from "react";

const Products = () => {
  const { products, loading } = useProductStore();
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const search = useSearchBarStore((state) => state.searchQuery);

  useEffect(() => {
    useProductStore.getState().fetchProducts();
  }, []);

  const filteredProducts = searchFilterHandler(
    { category: selectedCategory, search },
    products
  );

  // Fixed animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-2 lg:gap-8 w-full pb-20">
        <div className="md:w-4/12 lg:w-2/12">
          <div className="hidden md:block">
            <Category />
          </div>
        </div>
        <div className="md:w-8/12 lg:w-10/12 space-y-4">
          <SearchBar />

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory.name + search}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-8 justify-center mx-4"
            >
              {Array.from({ length: 5 }, (_, i) => (
                <SkeletonProductCard key={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-2 lg:gap-8 w-full pb-20">
      <div className="md:w-4/12 lg:w-2/12">
        <div className="hidden md:block">
          <Category />
        </div>
      </div>
      <div className="md:w-8/12 lg:w-10/12 space-y-4">
        <SearchBar />

        {filteredProducts.length === 0 && (
          <div className="flex justify-center">
            <div className="flex flex-col gap-4 items-center text-2xl">
              <Frown className="size-12 stroke-blue-600" />
              Nothing related :(
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory.name + search}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-8 justify-center mx-4"
          >
            {filteredProducts.length > 0 &&
              filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  layout
                  layoutId={`product-${product.id}`}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Products;
