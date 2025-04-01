import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { createSlug } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  syncCart,
} from "../../redux/features/cart/cartSlice";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";
import { useAuth } from "../../hooks/useAuth";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: books } = useFetchAllBooksQuery();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { isLoggedIn } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (books && books.length > 0) {
      // Find the book by ID or by slug if ID is actually a slug
      const foundBook = books.find(
        (item) => item._id === id || createSlug(item.title) === id
      );
      setBook(foundBook);
      setLoading(false);
    }
  }, [id, books]);

  const isInCart = book
    ? cartItems.some((item) => item._id === book._id)
    : false;

  const handleAddToCart = () => {
    if (book) {
      // Calculate newPrice based on price and discount
      const price = book.price;
      const discount = book.discount || 0;
      const newPrice = price - (price * discount) / 100;

      // Add to local cart state
      dispatch(
        addToCart({
          ...book,
          quantity: 1,
          newPrice,
        })
      );
      
      // Sync with backend if logged in
      if (isLoggedIn) {
        // Calculate the updated cart items after addition
        const existingItem = cartItems.find(item => item._id === book._id);
        
        let updatedCartItems;
        if (existingItem) {
          // If item already exists, update quantity
          updatedCartItems = cartItems.map(item => 
            item._id === book._id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          );
        } else {
          // If item doesn't exist, add it to cart
          updatedCartItems = [
            ...cartItems, 
            { ...book, quantity: 1, newPrice }
          ];
        }
        
        // Dispatch syncCart with the updated cart items
        dispatch(syncCart(updatedCartItems));
      }
    }
  };

  const discountPrice = book ? book.price * (book.discount / 100) : 0;

  const handleRemoveFromCart = () => {
    if (book) {
      dispatch(removeFromCart(book));

      // Force sync with backend if logged in
      if (isLoggedIn) {
        // Calculate the updated cart items after removal
        const updatedCartItems = cartItems.filter(
          (item) => item._id !== book._id
        );
        
        // Dispatch syncCart with the updated cart items
        dispatch(syncCart(updatedCartItems));
      }
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
    <>
      <title>{book.title} - Super Books</title>
      <div className="container  mx-auto px-4 py-8">
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Book Image */}
            <div className="md:w-1/3 p-6">
              <div className="relative overflow-hidden rounded-lg h-full">
                <img
                  src={book.coverImage}
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
              <p className="text-gray-600 text-lg mb-2">By {book.author}</p>
              <p className="font-semibold text-lg mb-4">
                Category:{" "}
                <span className="font-bold text-xl">{book.category}</span>
              </p>

              <div className="flex items-center mb-4">
                <div className="flex mr-2">{renderStars(book.rating)}</div>
                <span className="text-gray-600">({book.rating} rating)</span>
              </div>

              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-blue-600">
                  {book.discount > 0 ? (
                    <span>Rs. {(book.price - discountPrice).toFixed(2)}</span>
                  ) : (
                    <span>Rs. {book.price}</span>
                  )}
                </span>
                <sup className=" text-lg font-bold text-gray-500 line-through">
                  {book.discount > 0 && book.price}
                </sup>
              </div>

              <div className="prose max-w-none mb-14">
                <p className="text-gray-700">{book.description}</p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="px-4 pb-4 mt-8 ">
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
                <div>
                  <p className="text-green-500 text-sm font-semibold mt-2">
                    Available Stock: {book.stock}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
