import React, { useEffect, useState } from "react";
import BooksCards from "../../components/ui/BooksCards";

const ShopPage = ({ items }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/booksdata.json")
      .then((res) => res.json())
      .then((data) => {
        const sortedBooks = [...data].sort((a, b) => b.id - a.id);
        setBooks(sortedBooks);
      })
      .catch(error => console.error("Error fetching books:", error));
  }, []);

  const getLatestBooks = (data, count = 8) => {
    const sortedBooks = [...data].sort((a, b) => b.id - a.id);
    return sortedBooks.slice(0, count);
  };

  const getTopSellingBooks = (data, count = 8) => {
    const topSelling = data.filter(book => book.topselling === true);
    return topSelling.slice(0, count);
  };

  const getFeatureBooks = (data, count = 8) => {
    const featured = data.filter(book => book.isfeature === true);
    return featured.slice(0, count);
  };

  // Determine which books to display based on items prop
  let productsToDisplay = books;
  
  if (items?.latest) {
    productsToDisplay = getLatestBooks(books, items.count);
  } else if (items?.topSelling) {
    productsToDisplay = getTopSellingBooks(books, items.count);
  } else if (items?.featured) {
    productsToDisplay = getFeatureBooks(books, items.count);
  } else if (items) {
    productsToDisplay = items;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4 place-items-center">
      {productsToDisplay.map((book) => {
        return (
          <BooksCards
            key={book?.id}
            id={book?.id}
            image={book?.image}
            title={book?.title}
            author={book?.author}
            price={book?.price}
            rating={book?.rating}
            discount={book?.discount}
          />
        );
      })}
    </div>
  );
};

export default ShopPage;
