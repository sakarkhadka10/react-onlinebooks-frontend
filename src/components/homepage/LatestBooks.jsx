import React from "react";
import ShopPage from "../../pages/shop/ShopPage";

const LatestBooks = () => {
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
      <main className="mt-6">
        <ShopPage />
      </main>
    </>
  );
};

export default LatestBooks;
