import React, { useRef } from "react";
import BooksCards from "../ui/BooksCards";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";
import { Link } from "react-router-dom";

const TopSelling = () => {
  const { data: books = [] } = useFetchAllBooksQuery();
  const carouselRef = useRef(null);
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
  const getTopSellingBooks = (data, count = 8) => {
    const topSelling = data.filter((book) => book.topselling === true);
    return topSelling.slice(0, count);
  };
  const getTopSellingBooksLatest = getTopSellingBooks(books);
  return (
    <>
      <section className="mt-5 lg:mt-10 px-4 mb-10">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Top Selling Books</h1>
          </div>
          <div>
            <Link to="/shop">
              <button className="btn-dark">View All</button>
            </Link>
          </div>
        </header>
        <main className="mt-6">
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={() => scroll("left")}
              className="absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg -ml-4"
            >
              <FaChevronLeft className="w-6 h-6 text-gray-800" />
            </button>

            <button
              onClick={() => scroll("right")}
              className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg -mr-4"
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
              {getTopSellingBooksLatest.map((book) => (
                <BooksCards
                  key={book._id}
                  _id={book._id}
                  coverImage={book.coverImage}
                  title={book.title}
                  author={book.author}
                  price={book.price}
                  rating={book.rating}
                  discount={book.discount}
                  category={book.category}
                />
              ))}
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default TopSelling;
