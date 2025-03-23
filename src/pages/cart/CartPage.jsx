import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  updateQuantity,
} from "../../redux/features/cart/cartSlice";
import { FaTrash, FaArrowLeft, FaCreditCard, FaPaypal } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { createSlug } from "../../utils/helpers";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.newPrice || 0);
  }, 0);

  const handleRemoveItem = (itemId) => {
    const itemToRemove = { _id: itemId };
    dispatch(removeFromCart(itemToRemove));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared successfully");
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <>
        <div className="container mx-auto px-4 py-16 min-h-[60vh]">
          <div className="text-center animate-fadeIn">
            <div className="mb-8">
              <img
                src="/empty-cart.svg"
                alt="Empty Cart"
                className="w-64 mx-auto animate-scaleIn"
              />
            </div>
            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/shop">
              <button className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold inline-flex items-center hover:bg-blue-700 active:scale-95 transition-all">
                <FaArrowLeft className="mr-2" /> Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center animate-slideDown">
          Your Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="lg:w-2/3 animate-slideRight">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  Items ({cartItems.length})
                </h2>
                <button
                  onClick={handleClearCart}
                  className="text-red-500 hover:text-red-700 flex items-center"
                >
                  <FaTrash className="mr-2" /> Clear Cart
                </button>
              </div>

              <div className="divide-y">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="p-4 flex flex-col sm:flex-row gap-4 animate-fadeIn"
                  >
                    <div className="sm:w-1/4">
                      <div className="bg-gray-100 rounded-lg overflow-hidden h-40 flex items-center justify-center">
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="h-full object-contain p-2 hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    </div>

                    <div className="sm:w-3/4 flex flex-col justify-between">
                      <div>
                        <Link
                          to={`/shop/${item._id}/${createSlug(item.title)}`}
                        >
                          <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                            {item.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 text-sm">
                          By {item.author}
                        </p>

                        {item.discount > 0 && (
                          <div className="mt-1">
                            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                              {item.discount}% OFF
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-center">
                          <div className="flex border rounded overflow-hidden">
                            <button
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                              onClick={() =>
                                handleQuantityChange(
                                  item._id,
                                  (item.quantity || 1) - 1
                                )
                              }
                            >
                              -
                            </button>
                            <span className="px-4 py-1 border-x">
                              {item.quantity || 1}
                            </span>
                            <button
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                              onClick={() =>
                                handleQuantityChange(
                                  item._id,
                                  (item.quantity || 1) + 1
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-bold text-lg">
                            $
                            {item.newPrice
                              ? item.newPrice.toFixed(2)
                              : parseFloat(item.price.replace("$", "")).toFixed(
                                  2
                                )}
                          </span>
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="text-red-500 hover:text-red-700 hover:scale-110 active:scale-90 transition-transform"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-gray-50 border-t">
                <Link to="/shop">
                  <button className="text-blue-600 hover:text-blue-800 flex items-center">
                    <FaArrowLeft className="mr-2" /> Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-1/3 animate-slideLeft">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
              <div className="p-4 bg-gray-50 border-b">
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>

              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-lg font-bold text-blue-600">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all"
                  >
                    Proceed to Checkout
                  </button>
                </div>

                <div className="mt-4">
                  <div className="text-center text-gray-600 mb-2">
                    or checkout with
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center justify-center bg-gray-100 py-2 rounded-lg hover:bg-gray-200">
                      <FaCreditCard className="mr-2" /> Card
                    </button>
                    <button className="flex items-center justify-center bg-blue-100 text-blue-800 py-2 rounded-lg hover:bg-blue-200">
                      <FaPaypal className="mr-2" /> PayPal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
