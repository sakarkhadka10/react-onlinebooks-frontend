import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-hot-toast";
import { FaMoneyBillWave, FaArrowLeft } from "react-icons/fa";

const CheckOutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const isAgreed = watch("terms", false);

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => {
    return acc + (item.newPrice || parseFloat(item.price.replace("$", "")));
  }, 0);
  const shipping = subtotal > 50 ? 0 : 4.99;
  const tax = subtotal * 0.07;
  const totalPrice = (subtotal + shipping + tax).toFixed(2);

  const onSubmit = (data) => {
    // Store shipping info in state to use with payment
    setShippingInfo(data);
    // Move to payment step
    setCheckoutStep(2);
  };

  const [checkoutStep, setCheckoutStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState(null);

  const handleOrderComplete = () => {
    // Generate a random order ID
    const newOrderId =
      "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderId(newOrderId);

    // Clear cart
    dispatch(clearCart());

    // Show success message
    toast.success("Order placed successfully!");

    // Set order as complete
    setOrderComplete(true);
  };

  // If cart is empty, redirect to cart page
  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Add some items to your cart before checking out.
          </p>
          <Link to="/shop">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold inline-flex items-center hover:bg-blue-700">
              <FaArrowLeft className="mr-2" /> Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Order complete screen
  if (orderComplete) {
    return (
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Order Confirmed!
          </h2>
          <p className="text-gray-600 mb-4">Thank you for your purchase.</p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-mono font-medium">{orderId}</p>
          </div>
          <Link to="/shop">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen p-6 bg-gray-100">
      <div className="container max-w-screen-lg mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Checkout</h1>
          <div className="text-sm breadcrumbs">
            <ul className="flex space-x-2">
              <li
                className={
                  checkoutStep >= 1
                    ? "text-blue-600 font-medium"
                    : "text-gray-500"
                }
              >
                Shipping
              </li>
              <li className="text-gray-400">&gt;</li>
              <li
                className={
                  checkoutStep >= 2
                    ? "text-blue-600 font-medium"
                    : "text-gray-500"
                }
              >
                Payment
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Main checkout form */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {checkoutStep === 1 && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Shipping Information
                  </h2>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          {...register("name", {
                            required: "Name is required",
                          })}
                          className="h-10 border rounded px-4 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          className="h-10 border rounded px-4 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        {...register("phone", {
                          required: "Phone number is required",
                        })}
                        className="h-10 border rounded px-4 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+123 456 7890"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        {...register("address", {
                          required: "Address is required",
                        })}
                        className="h-10 border rounded px-4 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.address.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          {...register("city", {
                            required: "City is required",
                          })}
                          className="h-10 border rounded px-4 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.city.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          State
                        </label>
                        <input
                          type="text"
                          id="state"
                          {...register("state", {
                            required: "State is required",
                          })}
                          className="h-10 border rounded px-4 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.state && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.state.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="zipcode"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Zipcode
                        </label>
                        <input
                          type="text"
                          id="zipcode"
                          {...register("zipcode", {
                            required: "Zipcode is required",
                          })}
                          className="h-10 border rounded px-4 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.zipcode && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.zipcode.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        {...register("country", {
                          required: "Country is required",
                        })}
                        className="h-10 border rounded px-4 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.country && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.country.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center mt-4">
                      <input
                        type="checkbox"
                        id="terms"
                        {...register("terms", {
                          required: "You must agree to the terms",
                        })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="terms"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-blue-600 hover:underline"
                        >
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-blue-600 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    {errors.terms && (
                      <p className="text-red-500 text-xs">
                        {errors.terms.message}
                      </p>
                    )}

                    <div className="flex justify-end mt-6">
                      <button
                        type="submit"
                        disabled={!isAgreed}
                        className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {checkoutStep === 2 && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Payment Method
                  </h2>

                  <div className="mb-6">
                    <div className="flex flex-col space-y-3">
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={true}
                          className="h-5 w-5 text-blue-600"
                        />
                        <div className="ml-3 flex items-center">
                          <FaMoneyBillWave className="text-green-600 mr-2" />
                          <span className="font-medium">Cash on Delivery</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={handleOrderComplete}
                    disabled={!isAgreed}
                    className={`w-full py-3 rounded-md font-medium text-white ${
                      !isAgreed
                        ? "bg-gray-400"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    Complete Order
                  </button>

                  <button
                    onClick={() => setCheckoutStep(1)}
                    className="mt-4 text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <FaArrowLeft className="mr-2" /> Back to Shipping
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order summary */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Order Summary
              </h2>

              <div className="max-h-80 overflow-y-auto mb-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex py-2 border-b">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="text-sm font-medium">{item.title}</h3>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity || 1}
                      </p>
                      <p className="text-sm font-medium">
                        ${item.newPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-2 border-t">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOutPage;
