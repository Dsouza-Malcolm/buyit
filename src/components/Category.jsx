import useCategoryStore from "@/services/store/useCategoryStore";
import useSearchBarStore from "@/services/store/useSearchBarStore";
import updateSearchParams from "@/utils/updateSearchParams";
import { Grid2X2Plus } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";

const CategorySidebar = () => {
  const { categories, selectedCategory, setSelectedCategory } =
    useCategoryStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = useSearchBarStore((state) => state.searchQuery);

  useEffect(() => {
    useCategoryStore.getState().fetchCategories();

    if (searchParams.get("category")) {
      setSelectedCategory(searchParams.get("category"));
    }
  }, []);

  const categoryHandler = (id) => {
    setSelectedCategory(id);

    const updatedParams = updateSearchParams({
      category: id === 0 ? null : id,
      search: searchQuery?.trim() || null,
    });

    setSearchParams(updatedParams);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2 font-bold text-zinc-700">
            <Grid2X2Plus className="stroke-blue-600 size-5" /> Categories
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {categories.length > 0 && (
            <li>
              <button
                className={cn(
                  `text-zinc-600 hover:text-blue-600 font-medium cursor-pointer hover:underline`,
                  selectedCategory === 0
                    ? "text-blue-600 underline font-semibold"
                    : ""
                )}
                onClick={() => categoryHandler(0)}
              >
                <span>All</span>
              </button>
            </li>
          )}

          {categories.map((category) => (
            <li key={category.id}>
              <button
                className={cn(
                  `text-zinc-600 hover:text-blue-600 font-medium cursor-pointer hover:underline`,
                  selectedCategory === category.id
                    ? "text-blue-600 underline font-semibold"
                    : ""
                )}
                onClick={() => categoryHandler(category.id)}
              >
                <span>{category.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CategorySidebar;
