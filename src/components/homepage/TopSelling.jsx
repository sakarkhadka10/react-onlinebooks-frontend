import React, { useEffect, useState } from "react";
import TopSellingCard from "../ui/TopSellingCard";

const TopSelling = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("/booksdata.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  });
  return (
    <>
      <section className="mt-5 lg:mt-10 px-4 mb-10">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Top Selling Books</h1>
          </div>
          <div>
            <button className="btn-dark">View All</button>
          </div>
        </header>
        <main className="mt-6">
          <TopSellingCard books={books} />
        </main>
      </section>
    </>
  );
};

export default TopSelling;
