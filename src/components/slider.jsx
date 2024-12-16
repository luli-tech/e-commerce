import React, { useState } from "react";
import { useSelector } from "react-redux";
import { fetchProducts } from "../store/store";
import { useEffect } from "react";
const Slider = () => {

  let { productData } = useSelector(state => state.bazzar)

  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? productData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === productData.length - 1 ? 0 : prev + 1));
  };
  useEffect(() => {
    setTimeout(() => {
      handleNext()
    }, 1000)
  }, [productData.length])

  console.log(productData)
  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {/* Slides */}
      {productData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
          <img
            src={slide.image}
            alt={slide.caption}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex flex-col justify-center px-8 sm:px-20 text-white space-y-4">
            <h1 className="text-3xl md:text-5xl font-extrabold">
              {slide.title}
            </h1>
            <p className="text-sm md:text-lg">{slide.description}</p>
            <h5>${slide.price}</h5>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <div className="absolute top-1/2 left-5 -translate-y-1/2 z-20">
        <button
          onClick={handlePrev}
          className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-md hover:bg-white hover:scale-110 transition-transform duration-300"
        >
          ←
        </button>
      </div>
      <div className="absolute top-1/2 right-5 -translate-y-1/2 z-20">
        <button
          onClick={handleNext}
          className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-md hover:bg-white hover:scale-110 transition-transform duration-300"
        >
          →
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {productData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all ${currentSlide === idx ? "bg-white" : "bg-gray-500/60"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
