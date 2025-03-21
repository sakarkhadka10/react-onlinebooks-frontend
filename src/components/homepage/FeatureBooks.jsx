import React, { useMemo } from "react";
import BooksCards from "../ui/BooksCards";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

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
          <button className="btn-dark">View All</button>
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
          />
        ))}
      </main>
    </>
  );
};

export default TrendingBooks;
