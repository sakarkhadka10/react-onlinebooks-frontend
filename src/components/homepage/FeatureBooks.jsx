import React, { useMemo } from "react";
import BooksCards from "../ui/BooksCards";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";
import { Link } from "react-router-dom";

const TrendingBooks = () => {
  const { data: books = [] } = useFetchAllBooksQuery();

  const getFeatureBooks = books.filter((book) => book.isfeature === true);

  const getFeatureLatestBooks = useMemo(() => {
    return [...getFeatureBooks].sort((a, b) => b._id - a._id).slice(0, 8);
  }, [getFeatureBooks]);
  return (
    <>
      <header className="flex justify-between items-center mt-5 lg:mt-10 px-4 mb-10">
        <div>
          <h1 className="text-2xl font-bold">Feature Books</h1>
        </div>
        <div>
          <Link to="/shop">
            <button className="btn-dark">View All</button>
          </Link>
        </div>
      </header>
      <main className="grid grid-cols-1 md:gird-cols-2 lg:grid-cols-4 place-items-center gap-6">
        {getFeatureLatestBooks.map((book) => (
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
      </main>
    </>
  );
};

export default TrendingBooks;
