import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-[#2d2824] text-[var(--color-light)]  py-8 space-y-1">
        <div className="lg:flex justify-between items-center px-4 lg:px-12 py-2 text-center">
          <div className="text-xl lg:text-lg mb-6 space-y-4">
            <h1 className="text-4xl font-extrabold">Super Books</h1>
            <p>
              Kathmandu Nepal, <br />
              New Road <br />
              superbooks@gmail.com
              <br />
              +977 9841234567
            </p>
          </div>

          <div className="flex justify-center md:justify-evenly gap-4 lg:gap-16">
            <div>
              <h1 className="text-xl font-bold mb-4">Quick Links</h1>
              <span className="text-md">
                <ul className="flex flex-col gap-2">
                  <li>Home</li>
                  <li>Shop</li>
                  <li>Orders</li>
                  <li>About</li>
                </ul>
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold mb-4">Socials</h1>
              <span className="text-md">
                <ul className="flex flex-col gap-2">
                  <li>Facebook</li>
                  <li>Instagram</li>
                  <li>Tiktok</li>
                  <li>Youtube</li>
                </ul>
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold mb-4">Legal</h1>
              <span className="text-md">
                <ul className="flex flex-col gap-2">
                  <li>Terms & Services</li>
                  <li>Privacy Policy</li>
                  <li>Cookie Policy</li>
                </ul>
              </span>
            </div>
          </div>
        </div>

        <hr className="w-[90vw] mx-auto my-6 border-1" />
        <p className="text-center px-4">
          © 2025 Super Books. All rights reserved. Designed By. Sakar Khadka
        </p>
      </footer>
    </>
  );
};

export default Footer;
