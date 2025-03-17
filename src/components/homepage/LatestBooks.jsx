import React, { useEffect, useMemo, useState } from "react";
import BooksCards from "../ui/BooksCards";

const LatestBooks = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("/booksdata.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

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
          <button className="btn-dark">View All</button>
        </div>
      </header>
      <main className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-6">
        {getLatestBooks.map((book) => (
          <BooksCards
            key={book._id}
            _id={book._id}
            image={book.image}
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

export default LatestBooks;
