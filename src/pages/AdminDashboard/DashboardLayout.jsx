import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, Link, useNavigate } from "react-router-dom";
import getbaseUrl from "../../utils/baseUrl";
import Loading from "../../components/ui/Loading";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth/AuthContext";
import {
  FaBook,
  FaChartLine,
  FaEdit,
  FaPlus,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";

const DashboardLayout = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getbaseUrl()}/api/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) return <Loading />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <p className="text-sm text-gray-400 mt-1">
            Welcome, {user?.fname || "Admin"}
          </p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin"
                className="flex items-center p-2 rounded hover:bg-gray-700"
              >
                <FaChartLine className="mr-3" /> Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/admin/manage-books"
                className="flex items-center p-2 rounded hover:bg-gray-700"
              >
                <FaBook className="mr-3" /> Manage Books
              </Link>
            </li>
            <li>
              <Link
                to="/admin/add-book"
                className="flex items-center p-2 rounded hover:bg-gray-700"
              >
                <FaPlus className="mr-3" /> Add Book
              </Link>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="flex items-center p-2 rounded hover:bg-gray-700 w-full text-left"
              >
                <FaSignOutAlt className="mr-3" /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
