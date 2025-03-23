import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFetchAllBooksQuery, useDeleteBookMutation } from "../../redux/features/books/booksApi";
import { FaEdit, FaTrash, FaSearch, FaPlus } from "react-icons/fa";
import Loading from "../../components/ui/Loading";
import { toast } from "react-hot-toast";

const ManageBooks = () => {
  const { data: books = [], isLoading, refetch } = useFetchAllBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted successfully");
      refetch();
      setConfirmDelete(null);
    } catch (error) {
      toast.error("Failed to delete book");
      console.error("Delete error:", error);
    }
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Books</h1>
        <Link 
          to="/admin/add-book" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FaPlus className="mr-2" /> Add New Book
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Search books by title, author or category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Books Table */}
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">Book Title</th>
              <th scope="col" className="py-3 px-6">Author</th>
              <th scope="col" className="py-3 px-6">Category</th>
              <th scope="col" className="py-3 px-6">Price</th>
              <th scope="col" className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <tr key={book._id} className="bg-white border-b hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        src={book.coverImage} 
                        alt={book.title} 
                        className="w-10 h-10 mr-3 object-cover rounded"
                        onError={(e) => {e.target.src = "https://via.placeholder.com/40"}}
                      />
                      {book.title}
                    </div>
                  </td>
                  <td className="py-4 px-6">{book.author}</td>
                  <td className="py-4 px-6">{book.category}</td>
                  <td className="py-4 px-6">${book.price.toFixed(2)}</td>
                  <td className="py-4 px-6 flex space-x-2">
                    <Link 
                      to={`/admin/edit-book/${book._id}`} 
                      className="font-medium text-blue-600 hover:underline"
                    >
                      <FaEdit className="text-lg" />
                    </Link>
                    <button 
                      onClick={() => setConfirmDelete(book._id)} 
                      className="font-medium text-red-600 hover:underline"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b">
                <td colSpan="5" className="py-4 px-6 text-center">
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this book? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDelete(confirmDelete)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
