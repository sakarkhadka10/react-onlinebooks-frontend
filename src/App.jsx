import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./app.css";
import Footer from "./components/Footer";
import ScrollToTop from "./utils/ScrollToTop";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <title>Super Book</title>
        <meta
          name="description"
          content="Your trusted source for quality books since 2020"
        />
      </Helmet>
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
