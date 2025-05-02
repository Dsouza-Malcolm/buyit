import { create } from "zustand";

const useSearchBarStore = create((set) => ({
  searchQuery: "",

  setSearchQuery: (query) => set(() => ({ searchQuery: query ?? "" })),
  resetSearchQuery: () => set({ searchQuery: "" }),
}));

export default useSearchBarStore;
