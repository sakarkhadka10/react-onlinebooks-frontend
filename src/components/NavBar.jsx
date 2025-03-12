import { useState } from "react";
import {
  FaBars,
  FaCircleUser,
  FaMagnifyingGlass,
  FaXmark,
} from "react-icons/fa6";
const NavBar = () => {
  const navItems = ["Home", "Orders", "About"];
  const [navOpen, setNavOpen] = useState(false);

  const searchButtonClicked = () => {
    console.log("Search Button Clicked");
  };
  return (
    <>
      <header className="max-w-screen-2xl mx-auto px-4 py-6 ">
        {/* Mobile Device Menu System */}
        <nav className="lg:hidden flex justify-between items-center">
          <button onClick={() => setNavOpen(!navOpen)}>
            <FaBars className="text-2xl" />
          </button>
          <div>
            <img src="/logo.png" alt="logo" />
          </div>
          <div className="text-2xl">
            <FaCircleUser />
          </div>
        </nav>

        {/* Mobile Side Panle For Menu */}
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
                <img src="/logo-dark.webp" alt="logo" />
              </div>
              <div className="text-2xl">
                <button onClick={() => setNavOpen(!navOpen)}>
                  <FaXmark />
                </button>
              </div>
            </div>
            {/* Serch Section */}
            <div className="mt-6 relative">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search For Books.."
                className="text-[var(--color-light)] border-white border rounded-md w-full px-4 py-2 h-auto"
              />
              <button onClick={() => searchButtonClicked()}>
                <FaMagnifyingGlass className="absolute top-3 right-3 text-xl" />
              </button>
            </div>
            <nav className="py-7 h-full">
              <ul className="text-2xl uppercase flex flex-col justify-center gap-4 ">
                {navItems.map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ul>
            </nav>
          </div>
        </div>

        {/* Desktop Device Menu System */}
        <nav className="hidden lg:block">
          <div className="flex gap-4 justify-between items-center">
            <div className="flex items-center justify-between gap-6">
              <img src="/logo.png" alt="logo" />
              <div className="relative">
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search For Books.."
                  className="border rounded-md text-[var(--color-dark)] px-3 py-1 h-auto w-full"
                />
                <FaMagnifyingGlass className="absolute top-2 right-2 text-lg" />
              </div>
            </div>
            <div className="flex items-center justify-between gap-10">
              <ul className="flex gap-4 text-md font-semibold uppercase">
                {navItems.map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ul>
              <div className="flex items-center gap-7">
                <button className="flex items-center gap-1.5 cursor-pointer font-bold">
                  <img src="/icons/cart.png" alt="cart" className="w-6" />
                  ()
                </button>
                <button className="px-4 py-2 bg-amber-100 rounded-lg font-bold cursor-pointer uppercase">
                  Account
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
