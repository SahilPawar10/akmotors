import React from "react";
import Navbar from "../components/Navbar";
import ImportedHome from "../components/Home";
import Service from "../components/Service";
import ServiceChecklist from "@/pages/service-checklist";
import About from "@/pages/about";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="w-full">
        {/* <div className="w-full"> */}

        <section id="home-page" className="min-h-screen">
          <ImportedHome />{" "}
        </section>
        <section id="services" className="min-h-screen">
          <Service />
          <ServiceChecklist />
        </section>

        <section id="about" className="min-h-screen">
          <About />
        </section>

        {/* <Service />
        <About /> */}
        {/* </div> */}
      </main>
    </div>
  );
};

export default Home;
