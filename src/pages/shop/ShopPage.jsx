import React, { useEffect, useState } from "react";
import BooksCards from "../../components/ui/BooksCards";

const ShopPage = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("/booksdata.json")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4 place-items-center">
      {books.map((book) => {
        return (
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
        );
      })}
    </div>
  );
};

export default ShopPage;
