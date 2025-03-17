import React, { useEffect, useMemo, useState } from "react";
import BooksCards from "../ui/BooksCards";

const TrendingBooks = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("/booksdata.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const getFeatureBooks = books.filter((book) => book.isfeature === true);

  const getFeatureLatestBooks = useMemo(() => {
    return [...getFeatureBooks].sort((a, b) => b.id - a.id).slice(0, 8);
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
            key={book.id}
            id={book.id}
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

export default TrendingBooks;
