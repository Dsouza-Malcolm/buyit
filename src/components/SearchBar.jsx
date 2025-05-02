import React, { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import useSearchBarStore from "@/services/store/useSearchBarStore";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import updateSearchParams from "@/utils/updateSearchParams";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import CategorySidebar from "./Category";

const SearchBar = () => {
  const { setSearchQuery } = useSearchBarStore();
  const [localQuery, setLocalQuery] = useState("");
  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(updateSearchParams({ search: localQuery }));

    const timeout = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 300);

    return () => clearTimeout(timeout);
  }, [localQuery, setSearchQuery, setSearchParams]);

  return (
    <div className="flex flex-col gap-2 px-2 py-4 max-w-sm flex-1 mx-auto">
      <Label className="text-sm text-zinc-700 font-medium">Search</Label>

      <div className="relative">
        <div className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-blue-600 p-1.5 rounded-md">
          <Search className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search products"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="pl-10 rounded-lg border border-zinc-300 focus:outline-none focus-visible:ring-0 focus-visible:border-blue-600 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition-all bg-white py-2 max-w-sm w-full font-outfit"
            />

            <div className="md:hidden px-4 flex justify-end">
              <Sheet>
                <SheetTrigger className="sm:hidden">
                  <SlidersHorizontal />
                </SheetTrigger>
                <SheetContent side="left" className="w-[80%]">
                  <CategorySidebar />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
