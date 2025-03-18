import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submitButtonHandler = async (e) => {
    e.preventDefault();
    console.log("Form submission triggered");
  };

  const changeHandler = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Register - Super Book</title>
      </Helmet>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
              Create An Account
            </h2>
            <form className="space-y-4" onSubmit={submitButtonHandler}>
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  name="name"
                  value={credentials.name}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {/* Email */}
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

              {/* Password */}
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-2 ">
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
              {/* Confirm Password */}
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  value={credentials.confirmPassword}
                  onChange={changeHandler}
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
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
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Register
                </button>
              </div>
            </form>
            <p className="text-center pt-2">
              Already A Registered User{" "}
              <Link to="/login" className="text-[#2563eb] font-extrabold">
                {" "}
                Login
              </Link>
            </p>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <img
              src="/signup-wall.jpg"
              alt="Registration"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
