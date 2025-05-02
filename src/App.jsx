import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import ProductsPage from "./pages/Products";
import Checkout from "./pages/Checkout";
import RootLayout from "./layouts/RootLayout";
import MyOrdersPage from "./pages/MyOrders";
import Signup from "./pages/Signup";
import AuthProtected from "./components/AuthProtected";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuthStore from "./services/store/useAuthStore";
import { useEffect } from "react";
import { Spinner } from "./components/LoadingScreen";
import ProductCartSheet from "./components/ProductCartSheet";
import { Toaster } from "./components/ui/sonner";
import NotFound from "./components/NotFound";

function App() {
  const listenToAuth = useAuthStore((state) => state.listenToAuth);
  const isLoading = useAuthStore((state) => state.loading);

  useEffect(() => {
    listenToAuth();
  }, [listenToAuth]);

  if (isLoading)
    return (
      <div className="h-dvh w-full flex items-center justify-center">
        <Spinner className="stroke-blue-600" size="large" />
      </div>
    );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={RootLayout}>
          <Route index Component={Home} />

          <Route Component={ProtectedRoute}>
            <Route path="/checkout" Component={Checkout} />
            <Route path="/my-orders" Component={MyOrdersPage} />
          </Route>

          <Route Component={AuthProtected}>
            <Route path="login" Component={Login} />
            <Route path="signup" Component={Signup} />
          </Route>
        </Route>

        <Route Component={AppLayout}>
          <Route path="/products" Component={ProductsPage} />
          <Route path="/cart" Component={ProductsPage} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ProductCartSheet />
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
