"use client";

import { useState } from "react";
import {
  FaCalendarCheck,
  FaMotorcycle,
  FaTools,
  FaShieldAlt,
  FaTruck,
  FaBatteryFull,
  FaWrench,
  //   FaTire,
} from "react-icons/fa";

const services = [
  { icon: FaCalendarCheck, label: "Periodic Service", filled: false },
  { icon: FaMotorcycle, label: "Engine Repair", filled: true },
  { icon: FaWrench, label: "Tyres at Home", filled: false },
  { icon: FaTools, label: "Spare Parts", filled: true },
  { icon: FaShieldAlt, label: "Buy Insurance", filled: true },
  { icon: FaWrench, label: "Accidental Repair", filled: false },
  { icon: FaTruck, label: "RSA Services", filled: true },
  { icon: FaBatteryFull, label: "Bike Batteries", filled: false },
];

const Service: React.FC = () => {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Booking request sent for ${phone}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-80 flex flex-col md:flex-row items-center justify-center p-6 gap-10">
      {/* Services Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center p-4 rounded-full border-2 ${
                service.filled
                  ? "bg-purple-600 text-white"
                  : "bg-white text-purple-600 border-purple-600"
              } shadow-md`}
            >
              <Icon size={32} />
              <span className="mt-2 text-sm text-center">{service.label}</span>
            </div>
          );
        })}
      </div>

      {/* Booking Form */}
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
        <h2 className="text-xl font-bold mb-2 text-center">
          All your spare parts are here !
        </h2>
        <p className="text-center mb-4 text-gray-700">
          Get the spare parts or bike service at home at just drop your number
          {/* <span className="font-semibold">Rs.199</span> only. */}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700 transition-colors"
          >
            Book Now
          </button>
        </form>

        <p className="text-center text-purple-700 font-semibold mt-4">
          Call : 9168012871
        </p>
        <p className="text-xs text-center mt-2 text-gray-500">
          by submitting this form you agree to our{" "}
          <span className="text-blue-500 underline">user agreement</span>,{" "}
          <span className="text-blue-500 underline">privacy policy</span> &{" "}
          <span className="text-blue-500 underline">terms & condition</span>
        </p>

        <div className="flex justify-around items-center mt-4">
          <div className="text-center">
            <span className="block text-purple-600 font-bold text-lg">
              4.8/5
            </span>
            <span className="text-sm text-gray-600">Google Reviews</span>
          </div>
          <div className="text-center">
            <span className="block text-purple-600 font-bold text-lg">
              9999+
            </span>
            <span className="text-sm text-gray-600">Happy Customers</span>
          </div>
        </div>
      </div>

      {/* Floating Buttons */}
    </div>
  );
};

export default Service;
