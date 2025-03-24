import { useState } from "react";
import { Link } from "react-router-dom";

const LoginProfile = ({ handleLogout, user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userType = user?.usertype || "user";

  return (
    <div className="relative flex items-center gap-4 z-50">
      {/* Container for both button and dropdown to handle hover */}
      <div
        className="relative"
        onMouseEnter={() => setIsDropdownOpen(true)} // Show dropdown on hover over the entire area
        onMouseLeave={() => setIsDropdownOpen(false)} // Hide dropdown when mouse leaves the area
      >
        {/* Profile image button */}
        <button className=" text-white px-4 py-2 rounded-lg cursor-pointer font-bold  flex items-center">
          <img
            className="w-11 h-11 rounded-full"
            src="/profiles/profile1.webp"
            alt={user?.name}
          />
        </button>

        {/* Dropdown menu, positioned below the button with increased gap */}
        {isDropdownOpen && userType === "admin" && (
          <div className="absolute right-0 mt-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
            <ul className="py-2">
              <li>
                <span className="block px-4 py-2 font-bold">
                  {`Welcome, ${
                    user?.fname ||
                    user?.name ||
                    user?.email?.split("@")[0] ||
                    "Admin"
                  }`}
                </span>
              </li>
              {/* Show Administration only if usertype is "admin" */}
              <li>
                <Link
                  to="/admin"
                  className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2 text-blue-500">•</span> Administration
                </Link>
              </li>
              <li>
                <a
                  href="/user-profile"
                  className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">👤</span> Profile
                </a>
              </li>

              <li>
                <a
                  href="/products"
                  className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">📦</span> Add Product
                </a>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* Dropdown menu, positioned below the button with increased gap */}
        {isDropdownOpen && userType === "user" && (
          <div className="absolute right-0 mt-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
            <ul className="py-2">
              <li>
                <span className="block px-4 py-2 font-bold">
                  {`Welcome, ${
                    user?.fname ||
                    user?.name ||
                    user?.email?.split("@")[0] ||
                    "User"
                  }`}
                </span>
              </li>
              <li>
                <Link
                  to={"/user-profile"}
                  className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">👤</span> Profile
                </Link>
              </li>
              <li>
                <Link
                  to={"/orders"}
                  className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">🛒</span> Orders
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center cursor-pointer"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Welcome text (optional, you can uncomment and style as needed) */}
    </div>
  );
};

export default LoginProfile;
