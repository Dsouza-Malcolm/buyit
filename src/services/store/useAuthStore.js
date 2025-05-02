import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/config/firebase";

const useAuthStore = create(
  devtools((set, get) => ({
    user: null,
    loading: true,

    login: async (email, password) => {
      await signInWithEmailAndPassword(auth, email, password);
    },

    signup: async (email, password) => {
      await createUserWithEmailAndPassword(auth, email, password);
    },

    logout: async () => {
      await signOut(auth);
      set({ user: null });
    },

    listenToAuth: () => {
      onAuthStateChanged(auth, (user) => {
        console.log(user);
        set({ user, loading: false });
      });
    },

    isAuthenticated: () => !!get().user,
  }))
);

export default useAuthStore;
