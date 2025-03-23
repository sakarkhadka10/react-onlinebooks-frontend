import React, { useMemo } from "react";
import BooksCards from "../ui/BooksCards";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";
import { Link } from "react-router-dom";

const LatestBooks = () => {
  const { data: books = [] } = useFetchAllBooksQuery();

  const getLatestBooks = useMemo(() => {
    return [...books].sort((a, b) => b._id - a._id).slice(0, 8);
  }, [books]);

  return (
    <>
      <header className="flex justify-between items-center mt-10 lg:mt-16 px-4">
        <div>
          <h1 className="text-2xl font-bold">Latest Books</h1>
        </div>
        <div>
          <Link to="/shop">
            <button className="btn-dark">View All</button>
          </Link>
        </div>
      </header>
      <main className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-6">
        {getLatestBooks.map((book) => (
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
            stock={book.stock}
          />
        ))}
      </main>
    </>
  );
};

export default LatestBooks;
