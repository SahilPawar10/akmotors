"use client";

import React from "react";

const checklist = [
  "Air Filter Cleaning",
  "Vehicle Washing/ Eco Wash",
  "Disc Brake Oil Check/Top-Up",
  "Brake Drum Cleaning & Adjustment",
  "Chain Lubrication",
  "Nut and Bold Adjustments",
  "Brake Shoe/Pad Roughing",
  "Brake Drum Cleaning & Adjustment",
  "Air Filter Cleaning",
  "Tyre Pressure Check",
  "Clutch Cable Lubrication",
  "Engine Oil Checking/Replacement",
  "Mirror Adjustment",
  "Self Motor Checking",
  "Carburetor Cleaning",
  "Accelerator Cable Lubrication",
  "Spark Plug Cleaning",
  "Vehicle Polishing",
  "Sanitization",
  "Race Cable Lubrication",
];

export default function ServiceChecklist() {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-10 bg-white">
      {/* Heading */}
      <div className="text-center max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-800">
          General Bike Service Check-list:
        </h1>
        <p className="text-gray-700 mt-4">
          <span className="font-semibold text-purple-800">AK MOTORS</span>{" "}
          provides excellent bike repair services at home for motorcycles of all
          models and brands including Honda, Suzuki, Hero, Vespa, Yamaha, TVS,
          Bajaj, etc.
        </p>
      </div>

      {/* Checklist Items */}
      <div
        className="
  grid 
  grid-cols-1         /* mobile: 1 column */
  sm:grid-cols-2      /* ≥640px: 2 columns */
  lg:grid-cols-4      /* ≥1024px: 4 columns */
  gap-4 
  max-w-6xl 
  mx-auto
"
      >
        {checklist.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-100 rounded-full px-5 py-3 text-center shadow-sm
                 text-purple-800 font-medium hover:shadow-md transition"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
