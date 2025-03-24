import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaBox,
  FaSpinner,
  FaSync,
  FaChevronDown,
  FaChevronUp,
  FaImage,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFetchUserOrdersQuery } from "../../redux/features/orders/ordersApi";

const OrdersPage = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useFetchUserOrdersQuery();

  const toggleOrderExpansion = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const handleImageError = (itemId) => {
    setImageErrors((prev) => ({
      ...prev,
      [itemId]: true,
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-blue-600 text-4xl" />
      </div>
    );
  }

  if (isError) {
    const errorMessage = "Failed to fetch your orders";
    toast.error("Failed to fetch your orders");

    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {errorMessage}
          </h2>
          <div className="flex gap-4 justify-center">
            <button
              onClick={refetch}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center"
            >
              <FaSync className="mr-2" /> Retry
            </button>
            <Link to="/login">
              <button className="bg-gray-600 text-white py-2 px-4 rounded-lg">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <FaBox className="text-gray-400 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            No orders found
          </h2>
          <p className="text-gray-500 mb-6">
            You haven't placed any orders yet.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={refetch}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center"
            >
              <FaSync className="mr-2" /> Refresh
            </button>
            <Link to="/shop">
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg">
                Start Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <title>Orders - Super Books</title>

      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Order Header - Always visible */}
              <div
                className="p-4 bg-gray-50 border-b flex justify-between items-center cursor-pointer"
                onClick={() => toggleOrderExpansion(order._id)}
              >
                <div className="flex items-center">
                  {expandedOrder === order._id ? (
                    <FaChevronUp className="text-gray-500 mr-2" />
                  ) : (
                    <FaChevronDown className="text-gray-500 mr-2" />
                  )}
                  <div>
                    <h2 className="text-lg font-semibold">
                      Order #{order._id.substring(order._id.length - 8)}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">
                    Rs. {order.totalAmount.toFixed(2)}
                  </div>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Order Details - Only visible when expanded */}
              {expandedOrder === order._id && (
                <div className="p-4 border-t border-gray-100 transition-all duration-300">
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-700 mb-2">Items</h3>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0 flex items-center justify-center">
                            {imageErrors[item._id] ? (
                              <FaImage className="text-gray-400 text-2xl" />
                            ) : (
                              <img
                                src={item.coverImage}
                                alt={item.title}
                                className="w-full h-full object-contain"
                                onError={() => handleImageError(item._id)}
                                loading="lazy"
                              />
                            )}
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">{item.title}</h4>
                            <div className="flex justify-between text-sm text-gray-500">
                              <span>Qty: {item.quantity}</span>
                              <span>Rs. {item.price.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-medium text-gray-700 mb-2">
                      Shipping Information
                    </h3>
                    <p className="text-gray-600">
                      {order.customer.name}
                      <br />
                      {order.shippingAddress.address}
                      <br />
                      {order.shippingAddress.city}
                      <br />
                      {order.customer.phone}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={refetch}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center"
          >
            <FaSync className="mr-2" /> Refresh Orders
          </button>
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
