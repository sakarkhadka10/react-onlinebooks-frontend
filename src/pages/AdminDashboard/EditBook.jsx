import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useFetchBookByIdQuery,
  useUpdateBookMutation,
} from "../../redux/features/books/booksApi";
import { toast } from "react-hot-toast";
import {
  FaBook,
  FaArrowLeft,
  FaSave,
  FaUpload,
  FaSpinner,
} from "react-icons/fa";
import Loading from "../../components/ui/Loading";
import axios from "axios";

const EditBook = () => {
  const imageAPI = import.meta.env.VITE_SECRET_KEY_URI;
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading } = useFetchBookByIdQuery(id);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
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

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        description: book.description || "",
        price: book.price || "",
        category: book.category || "",
        coverImage: book.coverImage || "",
        stock: book.stock || "",
        discount: book.discount || 0,
        rating: book.rating || 0,
        topselling: book.topselling || false,
        isfeature: book.isfeature || false,
      });

      if (book.coverImage) {
        setImagePreview(book.coverImage);
      }
    }
  }, [book]);

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
            name === "discount" ||
            name === "rating"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    const fileType = file.type.split("/")[0];
    if (fileType !== "image") {
      toast.error("Please upload an image file");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to cloudinary
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(`${imageAPI}/upload/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData((prev) => ({
        ...prev,
        coverImage: response.data.url,
      }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateBook({ id, ...formData }).unwrap();
      toast.success("Book updated successfully!");
      navigate("/admin/manage-books");
    } catch (error) {
      toast.error("Failed to update book");
      console.error("Update book error:", error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FaBook className="mr-2" /> Edit Book
        </h1>
        <button
          onClick={() => navigate("/admin/manage-books")}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Back to Books
        </button>
      </div>

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
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science">Science</option>
              <option value="Technology">Technology</option>
              <option value="History">History</option>
              <option value="Biography">Biography</option>
              <option value="Self-Help">Self-Help</option>
              <option value="Business">Business</option>
              <option value="Children">Children</option>
              <option value="Other">Other</option>
            </select>
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

          {/* Cover Image Upload */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="coverImage"
            >
              Cover Image *
            </label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center">
                  <FaUpload className="mr-2" />
                  {uploading ? "Uploading..." : "Upload Image"}
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                    disabled={uploading}
                  />
                </label>
                {uploading && (
                  <FaSpinner className="animate-spin text-blue-500" />
                )}
              </div>

              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-40 object-cover rounded border"
                  />
                </div>
              )}

              {formData.coverImage && (
                <input
                  type="text"
                  value={formData.coverImage}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                  readOnly
                />
              )}
            </div>
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

          {/* Top Selling */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="topselling"
              name="topselling"
              checked={formData.topselling}
              onChange={handleChange}
              className="mr-2"
            />
            <label
              className="text-gray-700 text-sm font-bold"
              htmlFor="topselling"
            >
              Top Selling
            </label>
          </div>

          {/* Featured */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isfeature"
              name="isfeature"
              checked={formData.isfeature}
              onChange={handleChange}
              className="mr-2"
            />
            <label
              className="text-gray-700 text-sm font-bold"
              htmlFor="isfeature"
            >
              Featured
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="submit"
            disabled={isUpdating}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          >
            {isUpdating ? (
              <>Loading...</>
            ) : (
              <>
                <FaSave className="mr-2" /> Update Book
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
