import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./app.css";
import Footer from "./components/Footer";
import ScrollToTop from "./utils/ScrollToTop";
import { Toaster } from "react-hot-toast";
import { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext } from './context/Auth/AuthContext';
import { fetchCart } from './redux/features/cart/cartSlice';

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const dispatch = useDispatch();

  // Load cart from backend when app initializes and user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCart());
    }
  }, [isLoggedIn, dispatch]);

  return (
    <>
      <div className="text-[var(--color-dark)] bg-[var(--color-light)]">
        <ScrollToTop />
        <nav>
          <NavBar />
        </nav>
        <main className="min-h-screen max-h-screen-2xl mx-auto ">
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
        <div className="hidden md:block">
          <Toaster
            position="bottom-right"
            toastOptions={{
              success: {
                duration: 3000,
              },
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
