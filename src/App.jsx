import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./app.css";
import Footer from "./components/Footer";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
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
      </div>
    </>
  );
}

export default App;
