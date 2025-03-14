import React from "react";
import AnimatedButton from "../ui/AnimatedButton";

const MainAds = () => {
  return (
    <header className="w-full h-auto py-8 bg-gradient-to-r from-[#bec8d0] to-[#d0d8e0] overflow-hidden my-12">
      <section className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Book Image */}
        <div className="relative w-full md:w-1/4 flex justify-center md:justify-start">
          <img
            src="/books1.webp"
            alt="Featured Books"
            className="h-auto max-h-[250px] object-contain transform -rotate-6 hover:rotate-0 transition-transform duration-300"
          />
        </div>

        {/* Center Content */}
        <div className="text-center my-8 md:my-0 md:w-2/4">
          <span className="inline-block bg-white px-4 py-1 rounded-full text-gray-700 font-medium mb-3">
            Limited Time Offer
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            10% Off On Selected Books
          </h1>
          <p className="text-gray-700 mb-6 max-w-md mx-auto">
            Expand your library with our curated selection of bestsellers and
            classics at special prices.
          </p>
          <AnimatedButton name="Shop Now" active={true} />
        </div>

        {/* Right Person Image */}
        <div className=" relative w-full md:w-1/4 flex justify-center md:justify-end">
          <img
            src="GirlBook.svg"
            alt="Student with Books"
            className="absolute -top-35 h-auto max-h-[300px] object-contain rounded-lg drop-shadow-lg"
          />
        </div>
      </section>
    </header>
  );
};

export default MainAds;
