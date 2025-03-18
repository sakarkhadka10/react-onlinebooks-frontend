import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginProfile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userType = "user";

  return (
    <div className="relative flex items-center gap-4 z-50">
      {/* Container for both button and dropdown to handle hover */}
      <div
        className="relative"
        onMouseEnter={() => setIsDropdownOpen(true)} // Show dropdown on hover over the entire area
        onMouseLeave={() => setIsDropdownOpen(false)} // Hide dropdown when mouse leaves the area
      >
        {/* Profile image button */}
        <button className=" px-4 py-2 rounded-lg cursor-pointer font-bold  flex items-center">
          <img
            className="w-11 h-11 rounded-full"
            src="/profiles/profile1.webp"
            alt="user"
          />
        </button>

        {/* Dropdown menu, positioned below the button with increased gap */}
        {isDropdownOpen && userType === "admin" && (
          <div className="absolute right-0 mt-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
            <ul className="py-2">
              <li>
                <span className="block px-4 py-2 font-bold">{`Welcome, Sakar`}</span>
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
                  href="/profile"
                  className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">👤</span> Profile
                </a>
              </li>
              <li>
                <a
                  href="/transactions"
                  className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">🛒</span> Transactions
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">📦</span> Products
                </a>
              </li>

              <li>
                <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
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
                <span className="block px-4 py-2 font-bold">{`Welcome, User Sakar`}</span>
              </li>
              <li>
                <Link
                  to={"/usersprofile"}
                  className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">👤</span> Profile
                </Link>
              </li>
              <li>
                <Link
                  to={"/userscollection"}
                  className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">👤</span> Collections
                </Link>
              </li>
              <li>
                <a
                  href="/transactions"
                  className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">🛒</span> Transactions
                </a>
              </li>
              <li>
                <a
                  href="/invoice"
                  className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">📦</span> Invoice
                </a>
              </li>
              <li>
                <a
                  href="/coupons"
                  className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">📦</span> Coupons
                </a>
              </li>
              <li>
                <button className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center">
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
