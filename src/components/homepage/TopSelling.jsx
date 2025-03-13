import BooksCards from "../ui/TopSellingCard";

const TopSelling = () => {
  return (
    <>
      <section className="mt-5 lg:mt-10 px-4 mb-10">
        <header className="flex justify-between items-center ">
          <div>
            <h1 className="text-2xl font-bold">Top Selling Books</h1>
          </div>
          <div>
            <button className="btn-dark">View All</button>
          </div>
        </header>
        <main className="mt-6">
          <BooksCards />
        </main>
      </section>
    </>
  );
};

export default TopSelling;
