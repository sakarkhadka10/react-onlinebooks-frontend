import { Link } from "react-router-dom";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { createSlug } from "../../utils/helpers";

const BooksCards = ({ id, image, title, author, price, rating, discount }) => {
  const handleAddToCart = (bookId) => {
    console.log(`Added book ${bookId} to cart`);
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

  const titleSlug = createSlug(title);

  return (
    <div className="flex-none w-[300px] bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      <Link to={`/shop/${titleSlug}`}>
        {/* Image Container */}
        <div className="relative overflow-hidden group h-[200px]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-2 right-2">
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                {discount}% OFF
              </span>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-4 space-y-3">
          {/* Title and Author */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
              {title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-1">By {author}</p>
          </div>

          {/* Price and Rating */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-blue-600">{price}</span>
              <span className="text-sm text-gray-500 line-through">
                ${(parseFloat(price.replace("$", "")) * 1.2).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center">{renderStars(rating)}</div>
          </div>
        </div>
      </Link>
      
      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <button
          onClick={() => handleAddToCart(id)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors duration-300"
        >
          <FaShoppingCart className="text-lg" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default BooksCards;
