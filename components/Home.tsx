"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";

const ImportedHome: React.FC = () => {
  const images = [
    "/LandingPage/amitshandfoldedphoto.png",
    "/LandingPage/oglogo.jpeg",
    "/LandingPage/wash3.jpeg",
    "/LandingPage/wash1 (1).jpeg",
  ];

  const slogans = ["Repair", "Rebuild", "Ride"];
  const [currentImage, setCurrentImage] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const imgInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(imgInterval);
  }, []);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % slogans.length);
    }, 2000);
    return () => clearInterval(textInterval);
  }, []);

  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-1">
      <motion.div
        className="relative mx-auto py-10 md:py-16 lg:px-42 flex flex-col-reverse md:flex-row items-center justify-between  overflow-hidden"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(90deg, #f9fafb, #fef2f2, #f9fafb, #e0f2fe)",
          backgroundSize: "200% 200%",
        }}
      >
        {/* ---- Text Section ---- */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left space-y-4 sm:space-y-6 relative z-10 px-2 sm:px-6 md:px-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Optional small greeting */}
          <p className="text-base sm:text-lg md:text-xl lg:text-3xl text-gray-900 font-medium">
            Hi 👋! Welcome to{" "}
            <span className="font-bold italic">AK MOTORS</span>
          </p>

          {/* Main animated headline */}
          <h1 className="text-3xl sm:text-4xl leading-relaxed md:text-5xl font-bold">
            We{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-red-500 inline-block"
              >
                {slogans[currentWord]}
              </motion.span>
            </AnimatePresence>{" "}
            Your Bike .
          </h1>

          {/* Description */}
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
            Keep your bike smooth and safe with our expert service and repairs.
            We offer reliable maintenance, quick fixes, and quality care to
            ensure your ride performs at its best. Book a service today and
            enjoy hassle-free biking!
          </p>

          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 20px rgba(239,68,68,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 bg-red-500 text-white text-sm sm:text-base rounded-full shadow-lg hover:bg-red-600 transition"
          >
            Book a Service
          </motion.button>
        </motion.div>

        {/* ---- Image Section ---- */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0 relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ rotate: 1, scale: 1.02 }}
        >
          <div
            className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-[27.5rem] lg:h-[27.5rem]
                   flex-shrink-0 rounded-full overflow-hidden shadow-2xl border-4 border-white z-10"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[currentImage]}
                  alt="Bike Service"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating Logo */}
          <motion.div
            className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 z-20"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/LandingPage/newLogo.png"
              alt="BikeFix Logo"
              width={180} // scaled down for mobile
              height={60}
              className="drop-shadow-lg"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ImportedHome;
