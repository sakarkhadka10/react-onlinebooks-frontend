import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { createSlug } from "../../utils/helpers";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/features/cart/cartSlice";

const BooksCards = (book) => {
  // Redux
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isInCart = cartItems.some((items) => items._id === book._id);

  const currentQuantityInCart =
    cartItems.find((item) => item._id === book._id)?.quantity || 0;

  const handleAddToCart = () => {
    if (currentQuantityInCart >= book.stock) {
      toast.error(`Sorry, only ${book.stock} items available in stock`);
      return;
    }

    const price = book.price;
    const discount = book.discount || 0;
    const newPrice = price - (price * discount) / 100;

    dispatch(
      addToCart({
        ...book,
        quantity: 1,
        newPrice,
      })
    );
  };
  const discountPrice = book ? book.price * (book.discount / 100) : 0;
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(book));
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const titleSlug = createSlug(book?.title);

  return (
    <div className="flex-none w-[300px] bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      <Link to={`/shop/${titleSlug}`}>
        {/* Image Container */}
        <div className="relative overflow-hidden group h-[200px]">
          <img
            src={book?.coverImage}
            alt={book?.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
          {/* Category Badge */}
          {book.category && (
            <div className="absolute top-2 left-2">
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                {book?.category}
              </span>
            </div>
          )}
          {/* Discount Badge */}
          {book?.discount > 0 && (
            <div className="absolute top-2 right-2">
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                {book?.discount}% OFF
              </span>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-4 space-y-3">
          {/* Title and Author */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
              {book?.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-1">
              By {book?.author}
            </p>
          </div>

          {/* Price and Rating */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600">
                {book.discount > 0 ? (
                  <span>Rs. {(book.price - discountPrice).toFixed(2)}</span>
                ) : (
                  <span>Rs. {book.price}</span>
                )}
              </span>
              <sup className="text-lg font-bold text-gray-500 line-through">
                {book.discount > 0 && book.price}
              </sup>
            </div>
            <div className="flex items-center">{renderStars(book?.rating)}</div>
          </div>
        </div>
      </Link>

      {/* Button and Stock Container */}
      <div className="px-4 pb-4 flex items-center justify-between">
        <button
          onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
          disabled={!isInCart && book.stock <= 0}
          className={`${
            !isInCart && book.stock <= 0
              ? "bg-gray-400 cursor-not-allowed"
              : isInCart
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white px-3 py-1 rounded-md text-sm transition-colors duration-200`}
        >
          {isInCart
            ? "Remove"
            : book.stock <= 0
            ? "Out of Stock"
            : "Add to Cart"}
        </button>

        {/* Stock Information */}
        {book.stock <= 0 ? (
          <span className="hidden">Out of Stock</span>
        ) : book.stock <= 5 ? (
          <span className="text-yellow-500 text-sm font-semibold">
            Only {book.stock} left
          </span>
        ) : (
          <span className="text-green-500 text-sm font-semibold">
            In Stock ({book.stock})
          </span>
        )}
      </div>
    </div>
  );
};

export default BooksCards;
