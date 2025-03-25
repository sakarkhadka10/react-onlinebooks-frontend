import { useContext, useState, useEffect } from "react";
import {
  FaArrowRight,
  FaBars,
  FaCircleUser,
  FaMagnifyingGlass,
  FaXmark,
} from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginProfile from "./ui/NavBar/LoginProfile";
import { AuthContext } from "../context/Auth/AuthContext";
import { fetchCart } from "../redux/features/cart/cartSlice";

const NavBar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Orders", path: "/orders" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" },
    { name: "Contact", path: "/contact" },
  ];
  const [navOpen, setNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Auth For User Profile
  const authCtx = useContext(AuthContext);
  const { user, isLoggedIn, logout } = authCtx;
  const handleLogout = () => {
    logout(); // Use context logout
    navigate("/login");
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCart());
    }
  }, [isLoggedIn, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setNavOpen(false);
    }
  };

  // Cart Feature Using Redux
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <>
      <header className="max-w-screen-2xl mx-auto px-4 py-6 ">
        {/* Mobile Device Menu System */}
        <nav className="lg:hidden flex justify-between items-center">
          <button onClick={() => setNavOpen(!navOpen)}>
            <FaBars className="text-2xl" />
          </button>

          <Link className="/">
            <img src="/logo.png" alt="logo" />
          </Link>

          {isLoggedIn ? (
            <LoginProfile handleLogout={handleLogout} user={user} />
          ) : (
            <Link to="/login">
              <button className="bg-amber-100 px-4 py-2 rounded-lg cursor-pointer font-bold">
                <span>Account</span>
              </button>
            </Link>
          )}
        </nav>

        {/* Mobile Side Panel For Menu */}
        {/* Overlays */}
        <div className="lg:hidden">
          <div
            className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${
              navOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
          <div
            className={`fixed top-0 left-0 h-full w-[280px] bg-[var(--color-dark)] text-[var(--color-light)] px-4 py-4 
          transform transition-all duration-300 ease-in-out z-55
          ${navOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex justify-between items-center ">
              <div>
                <Link to="/">
                  <img src="/logo.png" alt="logo" />
                </Link>
              </div>
              <div className="text-2xl">
                <button onClick={() => setNavOpen(!navOpen)}>
                  <FaXmark />
                </button>
              </div>
            </div>
            {/* Mobile Search Section */}
            <form onSubmit={handleSearch} className="mt-6 relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  name="search"
                  id="mobile-search"
                  placeholder="Search For Books.."
                  className="text-[var(--color-light)] bg-transparent border-white border rounded-md w-full px-4 py-2 h-auto pl-10 focus:outline-none focus:ring-2 focus:ring-white/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-light)]" />
                {searchQuery && (
                  <button
                    type="button"
                    className="absolute right-10 top-1/2 transform -translate-y-1/2 text-[var(--color-light)]"
                    onClick={() => setSearchQuery("")}
                  >
                    <FaXmark />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-light)] hover:text-white"
                >
                  <FaArrowRight />
                </button>
              </div>
            </form>
            <nav className="py-7 h-full">
              <ul className="text-2xl uppercase flex flex-col justify-center gap-4 ">
                {navItems.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to={item.path} onClick={() => setNavOpen(false)}>
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        {/* Desktop Device Menu System */}
        <nav className="hidden lg:block">
          <div className="flex gap-4 justify-between items-center">
            <div className="flex items-center justify-between gap-6">
              <Link className="/">
                <img src="/logo.png" alt="logo" />
              </Link>
              {/* Desktop Search Form */}
              <form onSubmit={handleSearch} className="relative w-64">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="search"
                    id="desktop-search"
                    placeholder="Search For Books.."
                    className="border border-gray-300 rounded-md text-[var(--color-dark)] px-3 py-2 h-auto pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  {searchQuery && (
                    <button
                      type="button"
                      className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setSearchQuery("")}
                    >
                      <FaXmark />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                  >
                    <span className="sr-only">Search</span>
                    <FaArrowRight />
                  </button>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-between gap-10">
              <ul className="flex gap-4 text-md font-semibold uppercase">
                {navItems.map((item, index) => (
                  <Link to={item.path} key={index}>
                    <li className="cursor-pointer">{item.name}</li>
                  </Link>
                ))}
              </ul>
              <div className="flex items-center gap-7">
                <Link to="/cart">
                  <button className="flex items-center gap-1.5 cursor-pointer font-bold">
                    <img src="/icons/cart.png" alt="cart" className="w-6" />(
                    {cartItems.length > 0 ? (
                      <span>{cartItems.length}</span>
                    ) : (
                      <span>0</span>
                    )}
                    )
                  </button>
                </Link>
                {isLoggedIn ? (
                  <LoginProfile handleLogout={handleLogout} user={user} />
                ) : (
                  <Link to="/login">
                    <button className="bg-amber-100 px-4 py-2 rounded-lg cursor-pointer font-bold">
                      <span>Account</span>
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
