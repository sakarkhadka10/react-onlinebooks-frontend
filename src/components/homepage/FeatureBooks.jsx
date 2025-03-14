import React, { useEffect, useState } from "react";
import ShopPage from "../../pages/shop/ShopPage";

const TrendingBooks = () => {
  const [book, setBooks] = useState([]);
  useEffect(() => {
    fetch("/booksdata.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);
  const featureProduct = book.filter((book) => book.isfeature === true);
  const featureProductToDisplay = featureProduct.slice(0, 4);
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
      <main>
        <ShopPage items={featureProductToDisplay} />
      </main>
    </>
  );
};

export default TrendingBooks;
