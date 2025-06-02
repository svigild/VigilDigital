import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import ilustracion from "./static/ilustracion.png";
import friends from "./static/friends.png";
import diseño from "./static/diseño.svg";
import mantenimiento from "./static/mantenimiento.svg";
import social from "./static/social.svg";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import proyecto1 from "./static/proyecto1.png";
import proyecto2 from "./static/proyecto2.png";
import proyecto3 from "./static/proyecto3.png";

export default function App() {
  const form = useRef();
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    from_email: "",
    message: "",
  });

  // Para resaltar el menú activo
  const [activeSection, setActiveSection] = useState("servicios");

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3; // Total de proyectos

  // Cambia automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  // Validación controlada
  const validateForm = () => {
    if (formData.name.trim().length < 2 || formData.name.trim().length > 50) {
      setStatus({
        type: "error",
        message: "El nombre debe tener entre 2 y 50 caracteres.",
      });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.from_email)) {
      setStatus({
        type: "error",
        message: "Por favor, introduce un correo válido.",
      });
      return false;
    }
    if (
      formData.message.trim().length < 10 ||
      formData.message.trim().length > 500
    ) {
      setStatus({
        type: "error",
        message: "El mensaje debe tener entre 10 y 500 caracteres.",
      });
      return false;
    }
    return true;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSending(true);
    setStatus(null);

    emailjs
      .sendForm(
        "service_ynx2hjk",
        "template_tzyptnl",
        form.current,
        "dvOhxCeV16T3MWlwf"
      )
      .then(
        () => {
          setStatus({
            type: "success",
            message: "¡Formulario enviado con éxito!",
          });
          e.target.reset();
          setFormData({ name: "", from_email: "", message: "" });
          setSending(false);
        },
        (error) => {
          setStatus({
            type: "error",
            message: "Error al enviar el formulario, intenta de nuevo.",
          });
          console.error(error);
          setSending(false);
        }
      );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Función para detectar sección activa con scroll
  useEffect(() => {
    const sections = ["servicios", "sobre-mi", "proyectos", "contacto"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200; // Offset para mejor detección

      for (let i = sections.length - 1; i >= 0; i--) {
        const elem = document.getElementById(sections[i]);
        if (elem && elem.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú al hacer click fuera (fondo semitransparente)
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Scroll suave global */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 via-white to-indigo-50 text-gray-800">
        {/* Header */}
        <header className="bg-[#1e1b4b] text-[#e0e7ff] sticky top-0 z-50 shadow-md">
          <div className="container mx-auto flex justify-between items-center py-4 px-6">
            <h1 className="text-2xl font-extrabold tracking-tight">
              VigilDigital
            </h1>

            <nav className="relative">
              {/* Botón hamburguesa */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
                className="md:hidden text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 rounded"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>

              {/* Fondo semitransparente detrás del menú móvil */}
              {menuOpen && (
                <div
                  onClick={closeMenu}
                  className="fixed inset-0 bg-black/50 z-30 md:hidden"
                  aria-hidden="true"
                ></div>
              )}

              {/* Menú móvil lateral */}
              <div
                className={`fixed top-0 right-0 h-full w-64 bg-[#1e1b4b] text-[#e0e7ff] shadow-lg transform transition-transform duration-300 ease-in-out z-40 md:hidden ${
                  menuOpen ? "translate-x-0" : "translate-x-full"
                }`}
                role="dialog"
                aria-modal="true"
              >
                <button
                  onClick={() => setMenuOpen(false)}
                  className="absolute top-4 right-4 focus:outline-none"
                  aria-label="Cerrar menú"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="flex flex-col mt-20 space-y-6 px-6">
                  {["servicios", "sobre-mi", "proyectos", "contacto"].map(
                    (sec) => (
                      <a
                        key={sec}
                        href={`#${sec}`}
                        onClick={() => setMenuOpen(false)}
                        className={`hover:underline ${
                          activeSection === sec ? "underline font-bold" : ""
                        }`}
                      >
                        {sec === "sobre-mi"
                          ? "Sobre nosotros"
                          : sec.charAt(0).toUpperCase() + sec.slice(1)}
                      </a>
                    )
                  )}
                </div>
              </div>

              {/* Menú desktop */}
              <ul className="hidden md:flex space-x-8 font-semibold">
                {["servicios", "sobre-mi", "proyectos", "contacto"].map(
                  (sec) => (
                    <li key={sec}>
                      <a
                        href={`#${sec}`}
                        className={`hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded ${
                          activeSection === sec ? "underline font-bold" : ""
                        }`}
                      >
                        {sec === "sobre-mi"
                          ? "Sobre nosotros"
                          : sec.charAt(0).toUpperCase() + sec.slice(1)}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="flex-grow bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-300 text-indigo-900 flex flex-col justify-center items-center text-center px-4 py-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
            Tu web y redes sociales, al siguiente nivel
          </h2>
          <p className="text-lg md:text-xl max-w-xl mb-8 drop-shadow-md">
            Desarrollamos páginas web modernas y gestionamos tus redes sociales
            para que tu negocio crezca sin complicaciones.
          </p>
          <a
            href="#contacto"
            className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-md shadow-md hover:bg-indigo-100 transition"
          >
            Solicita tu presupuesto
          </a>

          {/* Ilustración */}
          <img
            src={ilustracion}
            alt="Ilustración"
            className="w-full max-w-md object-contain"
            loading="lazy"
          />
        </section>

        {/* Servicios */}
        <section
          id="servicios"
          className="container mx-auto px-6 py-16 max-w-5xl"
          aria-label="Servicios ofrecidos"
        >
          <h3 className="text-3xl font-extrabold text-center mb-12 text-indigo-900">
            Servicios
          </h3>
          <div className="grid md:grid-cols-3 gap-10">
            <article className="border rounded-lg p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 bg-white">
              <img
                src={diseño}
                alt="Icono Diseño y Desarrollo Web"
                className="mx-auto mb-4 w-20 h-20"
                loading="lazy"
              />
              <h4 className="text-xl font-semibold mb-3 text-indigo-700">
                Diseño y Desarrollo Web
              </h4>
              <p>
                Creamos páginas web personalizadas, responsivas y optimizadas
                para que tu negocio destaque en internet.
              </p>
            </article>

            <article className="border rounded-lg p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 bg-white cursor-default">
              <img
                src={mantenimiento}
                alt="Icono Mantenimiento y Soporte"
                className="mx-auto mb-4 w-20 h-20"
                loading="lazy"
              />
              <h4 className="text-xl font-semibold mb-3 text-indigo-700">
                Mantenimiento y Soporte
              </h4>
              <p>
                Ofrecemos mantenimiento continuo y soporte técnico para que tu
                página web siempre funcione sin problemas, esté actualizada y
                segura.
              </p>
            </article>

            <article className="border rounded-lg p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 bg-white">
              <img
                src={social}
                alt="Icono Gestión de Redes Sociales"
                className="mx-auto mb-4 w-20 h-20"
                loading="lazy"
              />
              <h4 className="text-xl font-semibold mb-3 text-indigo-700">
                Gestión de Redes Sociales
              </h4>
              <p>
                Potenciamos tu presencia en redes sociales para atraer más
                clientes y fidelizarlos con contenido relevante y profesional.
              </p>
            </article>
          </div>
        </section>

        {/* Sobre nosotros */}
        <section
          id="sobre-mi"
          className="bg-indigo-50 px-6 py-16"
          aria-label="Sobre nosotros"
        >
          <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center gap-10">
            <img
              src={friends}
              alt="Imagen equipo de trabajo"
              className="w-full md:w-1/2 rounded-lg object-cover"
              loading="lazy"
            />
            <div className="md:w-1/2 text-indigo-900">
              <h3 className="text-3xl font-extrabold mb-4">Quiénes somos</h3>
              <p className="mb-4">
                Somos un equipo apasionado por la tecnología y el marketing
                digital. Nuestro objetivo es ayudarte a crecer online con
                soluciones a medida y un trato cercano.
              </p>
              <p>
                Nos enfocamos en resultados reales y medibles, combinando
                creatividad y tecnología para que tu negocio destaque entre la
                competencia.
              </p>
            </div>
          </div>
        </section>

        {/* Sección Proyectos */}
        <section
          id="proyectos"
          className="bg-white py-16 px-6"
          aria-label="Proyectos realizados"
        >
          <div className="container mx-auto max-w-6xl text-center">
            <h3 className="text-3xl font-extrabold text-indigo-900 mb-12">
              Proyectos
            </h3>

            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Proyecto 1 */}
                <div className="min-w-full flex justify-center px-6">
                  <div className="grid md:grid-cols-2 gap-6 items-center bg-white rounded-2xl shadow-lg overflow-hidden max-w-6xl">
                    <img
                      src={proyecto1}
                      alt="Proyecto 1"
                      className="w-full h-full object-cover max-h-[500px]"
                      loading="lazy"
                    />
                    <div className="p-6 text-left">
                      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
                        GameHub
                      </h2>
                      <p className="text-gray-700 mb-4">
                        Aplicación web para la gestión de torneos, foros y
                        bibliotecas de juegos. Permite la interacción entre
                        usuarios mediante la creación de torneos, participación
                        en foros y organización de juegos.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["Spring Boot", "Thymeleaf", "MySQL"].map((tech) => (
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

                {/* Proyecto 2 */}
                <div className="min-w-full flex justify-center px-6">
                  <div className="grid md:grid-cols-2 gap-6 items-center bg-white rounded-2xl shadow-lg overflow-hidden max-w-6xl">
                    <img
                      src={proyecto2}
                      alt="Proyecto 2"
                      className="w-full h-full object-cover max-h-[500px]"
                      loading="lazy"
                    />
                    <div className="p-6 text-left">
                      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
                        Weather App
                      </h2>
                      <p className="text-gray-700 mb-4">
                        Aplicación meteorológica que muestra información del
                        clima en tiempo real gracias a la integración con la API
                        de OpenWeatherMap. Además, incluye imágenes dinámicas
                        relacionadas al clima, obtenidas mediante la API de
                        Unsplash.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["HTML", "CSS", "Bootstrap", "JavaScript"].map(
                          (tech) => (
                            <span
                              key={tech}
                              className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proyecto 3 */}
                <div className="min-w-full flex justify-center px-6">
                  <div className="grid md:grid-cols-2 gap-6 items-center bg-white rounded-2xl shadow-lg overflow-hidden max-w-6xl">
                    <img
                      src={proyecto3}
                      alt="Proyecto 3"
                      className="w-full h-full object-cover max-h-[500px]"
                      loading="lazy"
                    />
                    <div className="p-6 text-left">
                      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
                        SergiDex
                      </h2>
                      <p className="text-gray-700 mb-4">
                        Sitio web temático de Pokémon con múltiples
                        funcionalidades. Permite buscar Pokémon, filtrar por
                        tipos, crear tu propio equipo, consultar la tabla de
                        tipos y más.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "HTML",
                          "CSS",
                          "Bootstrap",
                          "TypeScript",
                          "Angular",
                        ].map((tech) => (
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
              </div>

              {/* Botones navegación */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-indigo-100 transition"
                aria-label="Anterior"
              >
                <ChevronLeft className="text-indigo-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-indigo-100 transition"
                aria-label="Siguiente"
              >
                <ChevronRight className="text-indigo-600" />
              </button>
            </div>
          </div>
        </section>
        {/* Contacto */}
        <section
          id="contacto"
          className="container mx-auto px-6 py-16 max-w-4xl"
          aria-label="Formulario de contacto"
        >
          <h3 className="text-3xl font-extrabold text-center mb-8 text-indigo-900">
            Contacto
          </h3>

          <form
            ref={form}
            onSubmit={sendEmail}
            noValidate
            aria-live="polite"
            aria-describedby="form-status"
            className="flex flex-col gap-6"
          >
            <label htmlFor="name" className="font-semibold text-indigo-900">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Tu nombre"
              required
              minLength={2}
              maxLength={50}
              value={formData.name}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-describedby="name-error"
            />
            {formData.name.trim().length > 0 &&
              (formData.name.trim().length < 2 ||
                formData.name.trim().length > 50) && (
                <p
                  id="name-error"
                  className="text-sm text-red-600"
                  role="alert"
                >
                  El nombre debe tener entre 2 y 50 caracteres.
                </p>
              )}

            <label
              htmlFor="from_email"
              className="font-semibold text-indigo-900"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="from_email"
              name="from_email"
              placeholder="tucorreo@ejemplo.com"
              required
              value={formData.from_email}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-describedby="email-error"
            />
            {formData.from_email.length > 0 &&
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email) && (
                <p
                  id="email-error"
                  className="text-sm text-red-600"
                  role="alert"
                >
                  Por favor, introduce un correo válido.
                </p>
              )}

            <label htmlFor="message" className="font-semibold text-indigo-900">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Escribe tu mensaje aquí..."
              required
              minLength={10}
              maxLength={500}
              value={formData.message}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-describedby="message-error"
              rows={6}
            />
            {formData.message.trim().length > 0 &&
              (formData.message.trim().length < 10 ||
                formData.message.trim().length > 500) && (
                <p
                  id="message-error"
                  className="text-sm text-red-600"
                  role="alert"
                >
                  El mensaje debe tener entre 10 y 500 caracteres.
                </p>
              )}

            {/* Aquí podrías insertar un CAPTCHA si lo integras */}

            <button
              type="submit"
              disabled={
                sending ||
                !(
                  formData.name.trim().length >= 2 &&
                  formData.name.trim().length <= 50 &&
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email) &&
                  formData.message.trim().length >= 10 &&
                  formData.message.trim().length <= 500
                )
              }
              className={`bg-indigo-700 text-white font-semibold rounded-md py-3 px-6 mt-4 shadow-md hover:bg-indigo-800 transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              {sending ? "Enviando..." : "Enviar mensaje"}
            </button>

            {/* Estado general del formulario */}
            {status && (
              <p
                id="form-status"
                className={`mt-4 text-center ${
                  status.type === "error" ? "text-red-600" : "text-green-600"
                } font-semibold`}
                role="alert"
              >
                {status.message}
              </p>
            )}
          </form>
        </section>

        {/* Footer con redes sociales */}
        <footer className="bg-[#1e1b4b] text-[#e0e7ff] py-6">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
            <p className="mb-4 md:mb-0">
              &copy; 2025 VigilDigital. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              {/*
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-indigo-300 transition"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.97-2.48 9.08 9.08 0 01-2.88 1.1 4.48 4.48 0 00-7.64 4.09A12.72 12.72 0 013 4.15a4.48 4.48 0 001.39 6 4.4 4.4 0 01-2.03-.56v.06a4.48 4.48 0 003.6 4.4 4.5 4.5 0 01-2.02.08 4.48 4.48 0 004.18 3.12A9 9 0 012 19.54 12.72 12.72 0 008.29 21c7.55 0 11.68-6.3 11.68-11.75 0-.18-.01-.35-.02-.53A8.18 8.18 0 0023 3z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-indigo-300 transition"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M22.675 0H1.325C.593 0 0 .592 0 1.324v21.352C0 23.407.592 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.311h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.324V1.324C24 .592 23.408 0 22.675 0z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-indigo-300 transition"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.25 2a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
                </svg>
              </a>
              */}
              <a
                href="https://www.linkedin.com/in/sergio-vigil-d%C3%ADaz/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-indigo-300 transition"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.353V9h3.414v1.561h.049c.476-.9 1.635-1.852 3.364-1.852 3.6 0 4.268 2.368 4.268 5.451v6.292zM5.337 7.433c-1.144 0-2.07-.927-2.07-2.07 0-1.143.927-2.07 2.07-2.07 1.144 0 2.07.927 2.07 2.07 0 1.143-.926 2.07-2.07 2.07zm1.778 13.019H3.558V9h3.557v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.728v20.543C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.728C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
