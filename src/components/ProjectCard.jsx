import React, { useRef, useState, useEffect } from "react";

export default function ProjectCard({ image, title, description, techs }) {
  return (
    <div className="min-w-full flex justify-center px-6">
      <div className="grid md:grid-cols-2 gap-6 items-center bg-white rounded-2xl shadow-lg overflow-hidden max-w-6xl">
        <img
          src={image}
          alt={title}
          width="600"
          height="400"
          className="w-full h-full object-cover max-h-[500px]"
          loading="lazy"
        />
        <div className="p-6 text-left">
          <h2 className="text-2xl font-bold mb-4 text-indigo-900">{title}</h2>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {techs.map((tech) => (
              <span
                key={tech}
                className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
