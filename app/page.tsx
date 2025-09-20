import React from "react";
import Navbar from "../components/Navbar";
import ImageCarousel from "../components/ImageCarousel";
import LogoSection from "../components/LogoSection";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2">
          <LogoSection />
        </div>
        <div className="w-full md:w-1/2">
          <ImageCarousel />
        </div>
      </main>
    </div>
  );
};

export default Home;
