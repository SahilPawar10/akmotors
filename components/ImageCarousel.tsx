"use client";
import React, { useState, useEffect } from "react";
const images: string[] = [
  "/LandingPage/wash1 (1).jpeg",
  "/LandingPage/wash2.jpeg",
  "/LandingPage/wash3.jpeg",
];

const ImageCarousel: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[30rem] flex justify-center items-center">
      <img
        src={images[index]}
        alt={`carousel-${index}`}
        className="object-cover rounded-lg shadow-lg w-full h-full transition duration-500 ease-in-out"
      />
    </div>
  );
};

export default ImageCarousel;
