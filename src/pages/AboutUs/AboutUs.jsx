import React from "react";
import { FaBook, FaShippingFast, FaUsers, FaHandshake } from "react-icons/fa";
import AnimatedButton from "../../components/ui/AnimatedButton";

const AboutPage = () => {
  return (
    <>
      <title>About Us - Super Books</title>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-100 to-amber-200 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
            Our Story
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Welcome to Super Books, where our passion for literature meets our
            commitment to providing quality books at affordable prices.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/about-books-store.webp"
              alt="Our Bookstore"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our Mission & Vision
            </h2>
            <p className="text-gray-600 mb-6">
              Founded in 2025, Super Books began with a simple mission: to make
              reading accessible to everyone. We believe that books have the
              power to educate, inspire, and transform lives.
            </p>
            <p className="text-gray-600 mb-6">
              Our vision is to create a community of book lovers who share our
              passion for literature and learning. We strive to offer a curated
              selection of books across various genres, ensuring there's
              something for every reader.
            </p>
            <div className="flex space-x-4">
              <AnimatedButton name="Our Team" active={true} />
              <AnimatedButton name="Join Us" />
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-amber-500 text-4xl mb-4 flex justify-center">
                <FaBook />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Quality
              </h3>
              <p className="text-gray-600">
                We carefully select each book to ensure the highest quality for
                our readers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-amber-500 text-4xl mb-4 flex justify-center">
                <FaShippingFast />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Reliability
              </h3>
              <p className="text-gray-600">
                Fast shipping and dependable service you can count on every
                time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-amber-500 text-4xl mb-4 flex justify-center">
                <FaUsers />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Community
              </h3>
              <p className="text-gray-600">
                Building a community of readers who share our love for books.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-amber-500 text-4xl mb-4 flex justify-center">
                <FaHandshake />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Integrity
              </h3>
              <p className="text-gray-600">
                Honest pricing and transparent business practices in everything
                we do.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-amber-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Join Our Book-Loving Community
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Subscribe to our newsletter for the latest book recommendations,
            special offers, and literary events.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="ring-white flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
