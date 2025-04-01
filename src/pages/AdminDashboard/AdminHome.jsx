import React, { useEffect, useState } from "react";
import axios from "axios";
import getbaseUrl from "../../utils/baseUrl";
import Loading from "../../components/ui/Loading";
import { FaBook, FaBoxOpen, FaDollarSign, FaChartLine } from "react-icons/fa";

const AdminHome = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSales: 0,
    totalBooks: 0,
    trendingBooks: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
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
        console.error("Error fetching admin stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <FaBoxOpen className="text-blue-600 text-xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Total Orders</h3>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <FaDollarSign className="text-green-600 text-xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Total Sales</h3>
            <p className="text-2xl font-bold">
              Rs. {stats.totalSales?.toFixed(2) || "0.00"}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <FaBook className="text-purple-600 text-xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Total Books</h3>
            <p className="text-2xl font-bold">{stats.totalBooks}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
