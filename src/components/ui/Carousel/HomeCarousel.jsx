import { useState, useEffect } from "react";
import "./carousel.css";

const HomeCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1776&auto=format&fit=crop",
      title: "New Arrivels",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1776&auto=format&fit=crop",
      title: "Tranding Books",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1776&auto=format&fit=crop",
      title: "Best Offers",
    },
  ];

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 15000); // Change slide every 15 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${
              index === currentSlide ? "active" : ""
            }`}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            <img src={slide.image} alt={slide.title} />
            <div className="slide-heading">
              <h1>{slide.heading}</h1>
            </div>
            <div className="slide-content">
              <h2>{slide.title}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button className="carousel-btn prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="carousel-btn next" onClick={nextSlide}>
        &#10095;
      </button>

      {/* Dots Navigation */}
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeCarousel;
