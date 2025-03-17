import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { createSlug } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { slug } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/booksdata.json")
      .then((res) => res.json())
      .then((data) => {
        // Find the book by comparing slugs
        const foundBook = data.find((item) => createSlug(item.title) === slug);
        setBook(foundBook);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        setLoading(false);
      });
  }, [slug]);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isInCart = book
    ? cartItems.some((item) => item._id === book._id)
    : false;

  const handleAddToCart = () => {
    if (book) {
      dispatch(addToCart(book));
    }
  };

  const handleRemoveFromCart = () => {
    if (book) {
      dispatch(removeFromCart(book));
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Book Not Found</h2>
          <p className="text-gray-600 mt-2">
            The book you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Book Image */}
          <div className="md:w-1/3 p-6">
            <div className="relative overflow-hidden rounded-lg h-[400px]">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              {book.discount > 0 && (
                <div className="absolute top-4 right-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {book.discount}% OFF
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Book Details */}
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {book.title}
            </h1>
            <p className="text-gray-600 text-lg mb-4">By {book.author}</p>

            <div className="flex items-center mb-4">
              <div className="flex mr-2">{renderStars(book.rating)}</div>
              <span className="text-gray-600">({book.rating} rating)</span>
            </div>

            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl font-bold text-blue-600">
                {book.price}
              </span>
              {book.discount > 0 && (
                <span className="text-xl text-gray-500 line-through">
                  ${(parseFloat(book.price.replace("$", "")) * 1.2).toFixed(2)}
                </span>
              )}
            </div>

            <div className="prose max-w-none mb-6">
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-gray-700 mt-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>

            <div className="px-4 pb-4 mt-8">
              {isInCart ? (
                <button
                  onClick={handleRemoveFromCart}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <FaShoppingCart className="text-lg" />
                  <span>Remove From Cart</span>
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <FaShoppingCart className="text-lg" />
                  <span>Add to Cart</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
