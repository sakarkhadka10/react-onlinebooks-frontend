import React, { useState } from "react";
import { useAddBookMutation } from "../../redux/features/books/booksApi";
import { toast } from "react-hot-toast";
import { FaBook, FaSave, FaTimes } from "react-icons/fa";

const AddBook = () => {
  const [addBook, { isLoading }] = useAddBookMutation();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    category: "",
    coverImage: "",
    stock: "",
    discount: 0,
    rating: 0,
    topselling: false,
    isfeature: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number" ||
            name === "price" ||
            name === "stock" ||
            name === "pages" ||
            name === "rating" ||
            name === "discount"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addBook(formData).unwrap();
      toast.success("Book added successfully!");
      // Reset form
      setFormData({
        title: "",
        author: "",
        description: "",
        price: "",
        category: "",
        coverImage: "",
        stock: "",
        discount: 0,
        rating: 0,
        topselling: false,
        isfeature: false,
      });
    } catch (error) {
      toast.error("Failed to add book");
      console.error("Add book error:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FaBook className="mr-2" /> Add New Book
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="author"
            >
              Author *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              min="0"
              step="0.01"
            />
          </div>

          {/* Category */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select a category</option>
              <option value="Fiction">Fiction</option>
              <option value="Science">Science</option>
              <option value="Technology">Technology</option>
              <option value="History">History</option>
              <option value="Biography">Biography</option>
              <option value="Self-Help">Romantic</option>
              <option value="Business">Business</option>
              <option value="Children">Children</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Cover Image URL */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="coverImage"
            >
              Cover Image URL *
            </label>
            <input
              type="text"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Stock */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="stock"
            >
              Stock *
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              min="0"
            />
          </div>

          {/* Discount */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="discount"
            >
              Discount (%)
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="0"
              max="100"
            />
          </div>

          {/* Rating */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="rating"
            >
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="0"
              max="5"
              step="0.1"
            />
          </div>

          {/* Featured and Top Selling */}
          <div className="flex space-x-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isfeature"
                name="isfeature"
                checked={formData.isfeature}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                className="ml-2 block text-gray-700 text-sm font-bold"
                htmlFor="isfeature"
              >
                Featured
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="topselling"
                name="topselling"
                checked={formData.topselling}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                className="ml-2 block text-gray-700 text-sm font-bold"
                htmlFor="topselling"
              >
                Top Selling
              </label>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="button"
            onClick={() =>
              setFormData({
                title: "",
                author: "",
                description: "",
                price: "",
                category: "",
                coverImage: "",
                stock: "",
                discount: 0,
                rating: 0,
                topselling: false,
                isfeature: false,
              })
            }
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          >
            <FaTimes className="mr-2" /> Reset
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          >
            {isLoading ? (
              <>Loading...</>
            ) : (
              <>
                <FaSave className="mr-2" /> Save Book
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
