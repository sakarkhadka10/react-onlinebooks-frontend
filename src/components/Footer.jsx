import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Orders", path: "/orders" },
    { name: "About", path: "/about" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebook className="mr-2" />,
      url: "https://facebook.com",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="mr-2" />,
      url: "https://instagram.com",
    },
    {
      name: "TikTok",
      icon: <FaTiktok className="mr-2" />,
      url: "https://tiktok.com",
    },
    {
      name: "YouTube",
      icon: <FaYoutube className="mr-2" />,
      url: "https://youtube.com",
    },
  ];

  const legalLinks = [
    { name: "Terms & Services", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Cookie Policy", path: "/cookies" },
  ];

  return (
    <footer
      className="w-full bg-[#2d2824] text-[var(--color-light)] py-12"
      aria-labelledby="footer-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:place-items-center lg:gap-11">
          {/* Company Info */}
          <div className="space-y-6 mb-10 lg:mb-0">
            <Link to="/">
              <h1 className="text-4xl font-extrabold">Super Books</h1>
            </Link>
            <p className="text-base leading-6">
              Your trusted source for quality books since 2020
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-3 text-amber-300" />
                <span>New Road, Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-amber-300" />
                <a
                  href="mailto:superbooks@gmail.com"
                  className="hover:text-amber-300 transition-colors"
                >
                  superbooks@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-3 text-amber-300" />
                <a
                  href="tel:+9779841234567"
                  className="hover:text-amber-300 transition-colors"
                >
                  +977 9841234567
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-10 lg:mt-0">
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="hover:text-amber-300 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="mt-10 lg:mt-0">
            <h3 className="text-xl font-bold mb-6">Connect With Us</h3>
            <ul className="space-y-4">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    className="flex items-center hover:text-amber-300 transition-colors"
                  >
                    {link.icon} {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="mt-10 lg:mt-0">
            <h3 className="text-xl font-bold mb-6">Legal</h3>
            <ul className="space-y-4">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="hover:text-amber-300 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-600 pt-8 flex flex-col md:flex-row md:justify-between md:items-center">
          <p className="text-base">
            &copy; {currentYear} Super Books. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0 text-base">
            Designed by{" "}
            <a
              href="https://sakarkhadka.com.np"
              className="text-amber-300 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sakar Khadka
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
