import { useEffect, useState, useRef } from "react";
import {
  FaShoppingCart,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const TopSellingCard = () => {
  const [books, setBooks] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    fetch("/booksdata.json")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

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

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      carouselRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg -ml-4"
      >
        <FaChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg -mr-4"
      >
        <FaChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scroll-smooth scrollbar-hide gap-6 px-4 py-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {books.map((book) => (
          <div
            key={book.id}
            className="flex-none w-[280px] bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden group h-[200px]">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              {/* Discount Badge */}
              {book.discount > 0 && (
                <div className="absolute top-2 right-2">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    {book.discount}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* Content Container */}
            <div className="p-4 space-y-3">
              {/* Title and Author */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-1">
                  By {book.author}
                </p>
              </div>

              {/* Price and Rating */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-blue-600">
                    {book.price}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    $
                    {(parseFloat(book.price.replace("$", "")) * 1.2).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center">
                  {renderStars(book.rating)}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(book.id)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors duration-300"
              >
                <FaShoppingCart className="text-lg" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingCard;
