"use client";

import React from "react";
import { MapPin, Phone, Mail } from "lucide-react"; // Install: npm i lucide-react

export default function About() {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-12 bg-gradient-to-br from-purple-50 to-white">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-800">
          About Us
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          We provide home bike repair services for all major motorcycle brands,
          ensuring fast, reliable and professional maintenance.
        </p>
      </div>

      {/* Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Map with hover effect */}
        <div className="rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition duration-300">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.941236041035!2d73.89088814607382!3d17.36656046105436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc18b1cf326692d%3A0x66894809eb84ad8b!2sA%20K%20MOTORS!5e0!3m2!1sen!2sin!4v1758436022472!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            // referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Address / Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-purple-800 mb-6">
            AK MOTORS
          </h2>

          <div className="space-y-5 text-gray-700">
            <p className="flex items-start">
              <MapPin className="w-6 h-6 text-purple-600 mr-3 shrink-0" />
              Shop No 1,
              <br />
              Karad-Chiplun Rd,opp . Umiya Traders
              <br />
              Patan,Satara, Maharashtra 415206
            </p>

            <p className="flex items-center">
              <Phone className="w-6 h-6 text-purple-600 mr-3 shrink-0" />
              +91 9168012871
            </p>

            <p className="flex items-center">
              <Mail className="w-6 h-6 text-purple-600 mr-3 shrink-0" />
              akmotors@gmail.com
            </p>

            <p className="pt-2 text-gray-600 leading-relaxed">
              Our skilled technicians ensure quality bike servicing at your
              doorstep. Book a service and experience a hassle-free repair!
            </p>
          </div>

          {/* Call-to-Action */}
          <div className="mt-8">
            <a
              href="tel:+9168012871"
              className="inline-block px-6 py-3 bg-purple-700 text-white font-semibold rounded-full shadow-md hover:bg-purple-800 transition"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
