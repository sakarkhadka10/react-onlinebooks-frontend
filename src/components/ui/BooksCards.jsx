import { Link } from "react-router-dom";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { createSlug } from "../../utils/helpers";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/features/cart/cartSlice";

const BooksCards = (book) => {
  // Redux
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isInCart = cartItems.some((items) => items._id === book._id);

  const handleAddToCart = () => {
    // Calculate newPrice based on price and discount
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
            <div className=" flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600">
                Rs.{" "}
                {book.discount > 0 ? (
                  <span>{(book.price - discountPrice).toFixed(2)}</span>
                ) : (
                  book.price
                )}
              </span>
              <sup className=" text-lg font-bold text-gray-500 line-through">
                {book.discount > 0 && book.price}
              </sup>
            </div>
            <div className="flex items-center">{renderStars(book?.rating)}</div>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        {isInCart ? (
          <button
            onClick={() => handleRemoveFromCart()}
            className="w-full cursor-pointer bg-pink-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 "
          >
            <FaShoppingCart className="text-lg" />
            <span>Remove From Cart</span>
          </button>
        ) : (
          <button
            onClick={() => handleAddToCart()}
            className="w-full cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 "
          >
            <FaShoppingCart className="text-lg" />
            <span>Add to Cart</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BooksCards;
