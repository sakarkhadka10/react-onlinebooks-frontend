import React, { useEffect, useState } from "react";
import BooksCards from "../../components/ui/BooksCards";
import { FaFilter, FaTimes } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";

const ShopPage = ({ items }) => {
  const [searchParams] = useSearchParams();
  const urlSearchQuery = searchParams.get("search") || "";

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: { min: 0, max: 100 },
    searchQuery: urlSearchQuery,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [maxPrice, setMaxPrice] = useState(100);
  const [sortOption, setSortOption] = useState("newest");

  // Update filters when URL search param changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: urlSearchQuery,
    }));
  }, [urlSearchQuery]);

  useEffect(() => {
    fetch("/booksdata.json")
      .then((res) => res.json())
      .then((data) => {
        const sortedBooks = [...data].sort((a, b) => b.id - a.id);
        setBooks(sortedBooks);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(data.map((book) => book.category || "Uncategorized")),
        ];
        setCategories(uniqueCategories);

        // Find max price for range
        const highestPrice = Math.max(
          ...data.map((book) => parseFloat(book.price.replace("$", "")))
        );
        setMaxPrice(Math.ceil(highestPrice));
        setPriceRange({ min: 0, max: Math.ceil(highestPrice) });
        setFilters((prev) => ({
          ...prev,
          priceRange: { min: 0, max: Math.ceil(highestPrice) },
        }));
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  useEffect(() => {
    let result = [...books];

    // Apply category filter
    if (filters.category !== "all") {
      result = result.filter((book) => book.category === filters.category);
    }

    // Apply price filter
    result = result.filter((book) => {
      const bookPrice = parseFloat(book.price.replace("$", ""));
      return (
        bookPrice >= filters.priceRange.min &&
        bookPrice <= filters.priceRange.max
      );
    });

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    result = sortBooks(result, sortOption);

    setFilteredBooks(result);
  }, [books, filters, items, sortOption]);

  const sortBooks = (data, sortBy) => {
    const sortedData = [...data];

    switch (sortBy) {
      case "newest":
        return sortedData.sort((a, b) => b.id - a.id);
      case "price-low":
        return sortedData.sort(
          (a, b) =>
            parseFloat(a.price.replace("$", "")) -
            parseFloat(b.price.replace("$", ""))
        );
      case "price-high":
        return sortedData.sort(
          (a, b) =>
            parseFloat(b.price.replace("$", "")) -
            parseFloat(a.price.replace("$", ""))
        );
      case "rating":
        return sortedData.sort((a, b) => b.rating - a.rating);
      default:
        return sortedData;
    }
  };

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange({ ...priceRange, [name]: parseInt(value) || 0 });
  };

  const applyPriceFilter = () => {
    setFilters({ ...filters, priceRange });
  };

  const handleSearch = (e) => {
    setFilters({ ...filters, searchQuery: e.target.value });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const resetFilters = () => {
    setPriceRange({ min: 0, max: maxPrice });
    setFilters({
      category: "all",
      priceRange: { min: 0, max: maxPrice },
      searchQuery: "",
    });
    setSortOption("newest");
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6 relative">
        {/* Filter Section - Mobile Toggle */}
        <div className="lg:hidden flex justify-between items-center mb-4 sticky top-0 z-10 bg-white gap-4">
          <button
            onClick={toggleFilters}
            className="flex items-center gap-2 bg-blue-600 text-white px-2 py-1 rounded-md"
          >
            {showFilters ? <FaTimes /> : <FaFilter />}
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search books..."
              value={filters.searchQuery}
              onChange={handleSearch}
              className="border border-gray-300 rounded-md px-3 py-2 w-fit"
            />
          </div>
        </div>

        {/* Fixed Filter Sidebar */}
        <div
          className={`lg:w-1/4 ${
            showFilters ? "block" : "hidden"
          } lg:block bg-white p-4 rounded-lg shadow-md 
          lg:sticky lg:top-4 lg:self-start lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto`}
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Filters</h3>
            <button
              onClick={resetFilters}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md w-fit hover:blue-400 cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Search - Desktop */}
          <div className="mb-6 hidden lg:block">
            <h4 className="font-medium mb-2">Search</h4>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search books..."
                value={filters.searchQuery}
                onChange={handleSearch}
                className="border border-gray-300 rounded-md px-3 py-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              {filters.searchQuery && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setFilters({ ...filters, searchQuery: "" })}
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden relative mb-4">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search books..."
                value={filters.searchQuery}
                onChange={handleSearch}
                className="border border-gray-300 rounded-md px-3 py-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              {filters.searchQuery && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setFilters({ ...filters, searchQuery: "" })}
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="font-medium mb-2">Category</h4>
            <select
              value={filters.category}
              onChange={handleCategoryChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            >
              <option value="all">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Price Range Filter */}
          <div className="mb-6">
            <h4 className="font-medium mb-2">Price Range</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <label className="w-12 text-gray-600">Min:</label>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="min"
                    value={priceRange.min}
                    onChange={handlePriceChange}
                    min="0"
                    max={priceRange.max}
                    className="border border-gray-300 rounded-md pl-7 pr-3 py-2 w-full"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label className="w-12 text-gray-600">Max:</label>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="max"
                    value={priceRange.max}
                    onChange={handlePriceChange}
                    min={priceRange.min}
                    max={maxPrice}
                    className="border border-gray-300 rounded-md pl-7 pr-3 py-2 w-full"
                  />
                </div>
              </div>
              <button
                onClick={applyPriceFilter}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md w-full"
              >
                Apply Price Filter
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Products Grid */}
        <div className="lg:w-3/4 overflow-y-auto">
          {/* Results Summary */}
          <div className="mb-6 flex justify-between items-center sticky top-0 bg-white z-10 py-2">
            <p className="text-gray-600">
              Showing {filteredBooks.length}{" "}
              {filteredBooks.length === 1 ? "book" : "books"}
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-gray-600">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="border border-gray-300 rounded-md px-3 py-1"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Books Grid */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center overflow-hidden">
              {filteredBooks.map((book) => (
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
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-xl text-gray-600 mb-4">
                No books found matching your filters
              </p>
              <button
                onClick={resetFilters}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
