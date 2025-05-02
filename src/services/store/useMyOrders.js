import { create } from "zustand";

const getInitialOrders = () => {
  const data = sessionStorage.getItem("myOrders");
  return data ? JSON.parse(data) : [];
};

const useMyOrders = create((set) => ({
  myOrders: getInitialOrders(),

  placeNewOrder: (order) =>
    set((state) => {
      const updatedOrders = [...state.myOrders, order];

      sessionStorage.setItem("myOrders", JSON.stringify(updatedOrders));

      return { myOrders: updatedOrders };
    }),
}));

export default useMyOrders;
