import React from "react";
import ShopPage from "../../pages/shop/ShopPage";

const TrendingBooks = () => {
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
        <ShopPage items={{ featured: true, count: 4 }} />
      </main>
    </>
  );
};

export default TrendingBooks;
