import React from "react";

const TrendingBooks = () => {
  return (
    <>
      <header className="flex justify-between items-center mt-5 lg:mt-10 px-4 mb-10">
        <div>
          <h1 className="text-2xl font-bold">Trending Books</h1>
        </div>
        <div>
          <button className="btn-dark">View All</button>
        </div>
      </header>
    </>
  );
};

export default TrendingBooks;
