import React, { useRef, useState, useEffect } from "react";

export default function ServiceCard({ service }) {
  return (
    <div className="flex flex-col rounded-3xl shadow-xl overflow-hidden transform transition-transform hover:scale-105">
      <div className={`bg-gradient-to-r ${service.color} p-8`}>
        <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
        <p className="text-white/90 mb-6">{service.description}</p>
        <p className="text-4xl font-extrabold text-white">
          {service.priceText}
        </p>
      </div>
      <div className="bg-white p-8 flex-grow flex flex-col">
        <ul className="mb-8 space-y-3 text-gray-700 flex-grow">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
