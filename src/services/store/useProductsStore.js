import { create } from "zustand";
import api from "@/services/api/axiosConfig";

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  selectedProduct: null,
  productOpen: false,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/products");
      set({ products: response.data, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch products", loading: false });
      console.error(err);
    }
  },

  openProduct: (product) =>
    set(() => ({ selectedProduct: product, productOpen: true })),
  closeProduct: () =>
    set(() => ({ selectedProduct: null, productOpen: false })),
}));

export default useProductStore;
