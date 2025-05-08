import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useMyOrders from "@/services/store/useMyOrders";
import {
  Box,
  Calendar,
  ChevronLeft,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const MyOrdersPage = () => {
  const orders = useMyOrders((state) => state.myOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleBack = () => {
    setSelectedOrder(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const pageTransition = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.2 },
    },
  };

  if (orders.length === 0) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <motion.div
          className="sm:max-w-md mx-4 sm:mx-auto p-8 text-center bg-white rounded-2xl shadow-sm border border-zinc-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-blue-500 mb-6"
          >
            <ShoppingBag className="w-10 h-10" />
          </motion.div>
          <h2 className="text-xl font-bold text-zinc-700 mb-2">
            No Orders Yet
          </h2>
          <p className="text-zinc-500 mb-6">
            You haven't placed any orders yet.
          </p>
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 hover:scale-105"
          >
            <Link to="/products">Start Shopping</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl sm:mx-auto px-4 py-8 mx-2 min-h-dvh my-10">
      <AnimatePresence mode="wait">
        {!selectedOrder ? (
          <motion.div
            key="order-list"
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <motion.div
              className="flex gap-3 items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Box className="stroke-blue-600 w-6 h-6" />
              <h2 className="text-2xl font-bold text-zinc-700">My Orders</h2>
            </motion.div>

            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <Card
                    className="p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer bg-white border border-zinc-100 overflow-hidden gap-2"
                    onClick={() => handleViewOrder(order)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-1">
                          <Package className="w-4 h-4 text-blue-500" />
                          <span className="font-medium text-zinc-700">
                            Order #{order.id}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {new Date(order.placedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 my-2 scrollbar-hide">
                      {order.items &&
                        order.items.slice(0, 4).map((item, index) => (
                          <motion.div
                            key={index}
                            className="relative flex-shrink-0"
                            whileHover={{ scale: 1.05 }}
                          >
                            <img
                              src={
                                item.images?.[0] ||
                                `/api/placeholder/80/80?text=Item${index + 1}`
                              }
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded-md border border-zinc-100"
                            />
                            {order.items.length > 4 && index === 3 && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md text-white font-bold">
                                +{order.items.length - 3}
                              </div>
                            )}
                          </motion.div>
                        ))}
                    </div>

                    <Separator className="my-2" />

                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <p className="text-xs font-medium text-zinc-500">
                          Total Amount:
                        </p>
                        <p className="text-lg font-semibold text-blue-600 font-outfit">
                          ${parseFloat(order.totalAmount).toFixed(2)}
                        </p>
                      </div>

                      <motion.div
                        className="mt-4 text-right"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-blue-200 text-blue-600 hover:bg-blue-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewOrder(order);
                          }}
                        >
                          View Details
                        </Button>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="order-details"
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div whileHover={{ x: -5 }} className="inline-block">
              <Button
                onClick={handleBack}
                variant="ghost"
                className="mb-6 text-sm hover:bg-blue-50 text-blue-600 flex items-center gap-1 pl-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Orders
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-6 space-y-5 shadow-md rounded-2xl gap-0 border border-zinc-100 bg-white overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm text-zinc-500">Order Placed</span>
                    <div className="font-medium text-zinc-700">
                      {new Date(selectedOrder.placedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm text-zinc-500">Order ID</span>
                    <div className="font-medium text-zinc-700">
                      #{selectedOrder.id}
                    </div>
                  </div>
                </div>

                <Separator />

                <h3 className="text-xl font-semibold text-zinc-700 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-blue-500" />
                  Order Summary
                </h3>

                <motion.div
                  className="space-y-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {selectedOrder.items.map((item, index) => (
                    <motion.div
                      key={item.id || index}
                      variants={itemVariants}
                      className="flex items-center gap-4 border rounded-xl p-4 bg-zinc-50 hover:bg-blue-50 transition-colors duration-200"
                      whileHover={{
                        y: -2,
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <img
                          src={
                            item.images?.[0] ||
                            `/api/placeholder/80/80?text=Item${index + 1}`
                          }
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg border border-zinc-200"
                        />
                      </motion.div>
                      <div className="flex-1">
                        <p className="font-medium text-zinc-800 line-clamp-1">
                          {item.title}
                        </p>
                        <div className="flex items-center text-xs text-zinc-500 mt-1 gap-3">
                          <span>Qty: {item.quantity}</span>
                          {item.color && (
                            <span className="flex items-center gap-1">
                              Color:
                              <span
                                className="inline-block w-3 h-3 rounded-full border"
                                style={{ backgroundColor: item.color }}
                              ></span>
                              {item.colorName}
                            </span>
                          )}
                          {item.size && <span>Size: {item.size}</span>}
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-blue-600 font-outfit">
                        ${parseFloat(item.totalPrice).toFixed(2)}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center text-sm text-zinc-600">
                    <span>Subtotal</span>
                    <span className="font-outfit">
                      $
                      {parseFloat(
                        selectedOrder.totalAmount -
                          (selectedOrder.shipping || 0)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-zinc-600 mt-2">
                    <span>Shipping</span>
                    <span className="font-outfit">
                      ${parseFloat(selectedOrder.shipping || 0).toFixed(2)}
                    </span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between items-center text-lg font-bold text-blue-700">
                    <span>Total</span>
                    <span className="font-outfit">
                      ${parseFloat(selectedOrder.totalAmount).toFixed(2)}
                    </span>
                  </div>
                </div>

                {selectedOrder.deliveryAddress && (
                  <div className="bg-zinc-50 p-4 rounded-xl">
                    <h4 className="font-medium text-zinc-700 mb-2 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-zinc-500" />
                      Delivery Address
                    </h4>
                    <p className="text-sm text-zinc-600">
                      {selectedOrder.deliveryAddress}
                    </p>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-sm border-zinc-200"
                    >
                      Track Order
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-blue-600 hover:bg-blue-700 text-sm">
                      Download Invoice
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyOrdersPage;
