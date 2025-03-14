import React from "react";
import { Link } from "react-router-dom";

const ProductCategorySection = () => {
  return (
    <div className="my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-14">
        <ProductCategoryCard
          title="New Release"
          buttonText="Shop Now"
          bgColor="bg-amber-100"
          textColor="text-gray-800"
          image="/books.webp"
          link={"/shop"}
        />
        <ProductCategoryCard
          title="Pre-order Now"
          buttonText="Reserve"
          bgColor="bg-blue-100"
          textColor="text-gray-800"
          image="/books.webp"
          link={"/shop"}
        />
        <ProductCategoryCard
          title="Top Rated"
          buttonText="Explore"
          bgColor="bg-green-100"
          textColor="text-gray-800"
          image="/books.webp"
          link={"/shop"}
        />
      </div>
    </div>
  );
};

export default ProductCategorySection;

const ProductCategoryCard = ({
  title,
  buttonText,
  bgColor,
  textColor,
  image,
  link,
}) => {
  return (
    <section
      className={`${bgColor} ${textColor} max-w-full h-auto rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 duration-300`}
    >
      <div className="flex flex-col md:flex-row justify-between items-center p-4">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-3">{title}</h2>
          <Link to={link}>
            <button className="cursor-pointer px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-300">
              {buttonText}
            </button>
          </Link>
        </div>
        <div className="w-full md:w-1/2 md:max-w-[150px]">
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
      </div>
    </section>
  );
};
