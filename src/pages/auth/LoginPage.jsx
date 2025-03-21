import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../context/Auth/AuthContext";

const LoginPage = () => {
  const getUserApi = `${import.meta.env.VITE_SECRET_KEY_URI}/auth/login`;

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  // Get the path the user was trying to access
  const from = location.state?.from?.pathname || "/";

  const submitButtonHandler = async (e) => {
    e.preventDefault();
    setError(null);
    const { email, password } = credentials;

    try {
      const response = await fetch(getUserApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Check for error status codes
      if (response.status === 400 || response.status === 404) {
        setError("Invalid credentials");
        return;
      }

      const data = await response.json();

      if (response.ok && data.authToken) {
        await login(data.authToken); // Call context login
        const usertype = data.user.usertype;
        
        // If they were redirected from a protected route, send them back there
        // Otherwise, redirect based on user type
        if (from !== "/") {
          navigate(from);
        } else if (usertype === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Fetch or parsing error:", error.message);
      setError("Connection error. Please try again later.");
    }
  };
  const changeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="w-full md:w-1/2">
            <img
              src="/signup-wall.jpg"
              alt="Registration"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
              Login
            </h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form className="space-y-4" onSubmit={submitButtonHandler}>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  name="email"
                  value={credentials.email}
                  onChange={changeHandler}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  name="password"
                  value={credentials.password}
                  onChange={changeHandler}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  className="absolute top-10 right-3 flex items-center text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <p className="text-sm cursor-pointer">
                Forget Password Or Email?
              </p>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Login
                </button>
              </div>
            </form>
            <p className="text-center pt-2">
              Don’t Have An Account?{" "}
              <Link to="/register" className="text-[#2563eb] font-extrabold">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
