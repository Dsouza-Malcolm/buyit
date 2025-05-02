import { create } from "zustand";

const getInitialCart = () => {
  const cartItems = sessionStorage.getItem("cartItems");
  return cartItems ? JSON.parse(cartItems) : [];
};

const useCartStore = create((set) => ({
  cartItems: getInitialCart(),
  cartOpen: false,

  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cartItems.find(
        (item) => item.id === product.id
      );

      let updatedCartItems;

      if (existingProduct) {
        updatedCartItems = state.cartItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.price * (item.quantity + 1),
              }
            : item
        );
      } else {
        updatedCartItems = [
          ...state.cartItems,
          { ...product, quantity: 1, totalPrice: product.price },
        ];
      }

      sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return { cartItems: updatedCartItems };
    }),

  removeFromCart: (productId) =>
    set((state) => {
      const existingProduct = state.cartItems.find(
        (item) => item.id === productId
      );

      if (!existingProduct) return { cartItems: state.cartItems };

      let updatedCartItems;

      if (existingProduct.quantity <= 1) {
        updatedCartItems = state.cartItems.filter(
          (item) => item.id !== productId
        );
      } else {
        updatedCartItems = state.cartItems.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: item.totalPrice - item.price,
              }
            : item
        );
      }

      sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return { cartItems: updatedCartItems };
    }),

  clearCart: () => {
    sessionStorage.setItem("cartItems", JSON.stringify([]));
    set(() => ({ cartItems: [] }));
  },

  openCart: () => set(() => ({ cartOpen: true })),
  closeCart: () => set(() => ({ cartOpen: false })),
}));

export default useCartStore;
