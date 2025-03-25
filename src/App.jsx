import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./app.css";
import Footer from "./components/Footer";
import ScrollToTop from "./utils/ScrollToTop";
import { Toaster } from "react-hot-toast";
import { useEffect, useContext, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext } from './context/Auth/AuthContext';
import { fetchCart } from './redux/features/cart/cartSlice';

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

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
        <main className="min-h-screen max-h-screen-2xl mx-auto">
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
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
