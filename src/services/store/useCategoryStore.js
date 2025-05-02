import { create } from "zustand";
import api from "@/services/api/axiosConfig";

const useCategoryStore = create((set) => ({
  categories: [],
  loading: false,
  error: null,
  selectedCategory: 0,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/categories");
      set({ categories: response.data, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch categories", loading: false });
      console.error(err);
    }
  },

  setSelectedCategory: (category) =>
    set(() => ({ selectedCategory: category })),
}));

export default useCategoryStore;
