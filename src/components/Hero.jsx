import { motion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import ilustracion from "../static/ilustracion.png";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-indigo-900 via-indigo-700 to-indigo-900 overflow-hidden">
      {/* Overlay blur difuminado */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-indigo-700 to-indigo-900 opacity-90"></div>
      <div className="absolute inset-0 bg-[url('/path-to-your-background.jpg')] bg-cover bg-center blur-sm opacity-30"></div>

      <div className="relative container mx-auto px-6 py-32 flex flex-col md:flex-row items-center gap-16 max-w-7xl text-white select-none">
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 space-y-8"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight drop-shadow-2xl tracking-tight">
            Lleva tu <span className="text-indigo-400">web</span> y <br />
            redes sociales al{" "}
            <span className="underline decoration-indigo-400">
              siguiente nivel
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-lg text-indigo-200 drop-shadow-md">
            Diseño moderno, gestión experta y resultados que transforman tu
            negocio.
          </p>

          <motion.a
            href="#contacto"
            initial={{ scale: 0.9 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px 5px rgba(99,102,241,0.7)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 font-bold px-10 py-4 rounded-xl shadow-lg text-white text-lg tracking-wide hover:brightness-110"
          >
            Quiero mi presupuesto
          </motion.a>

          {/* Testimonio */}
          <p className="mt-12 text-indigo-300 italic max-w-md">
            “Desde que trabajamos con VigilDigital, nuestro tráfico web y
            engagement en redes sociales se dispararon. Totalmente
            recomendados.”
            <br />
            <span className="font-semibold text-indigo-400">
              — Ana P., CEO Startup
            </span>
          </p>
        </motion.div>

        {/* Imagen hero */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2"
        >
          <img
            src={ilustracion}
            alt="Ilustración profesional"
            className="rounded-3xl object-contain max-w-full mx-auto"
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* Logos clientes o prueba social(aun no tenemos clientes) */}
      {/* 
      <div className="hidden md:flex justify-center items-center gap-12 mt-20 px-6">
        {["Logo1", "Logo2", "Logo3", "Logo4"].map((logo) => (
          <img
            key={logo}
            src={`/logos/${logo.toLowerCase()}.svg`}
            alt={`${logo} logo`}
            className="h-12 opacity-60 hover:opacity-100 transition-opacity duration-300"
            loading="lazy"
          />
        ))}
      </div>
      */}
    </section>
  );
}
