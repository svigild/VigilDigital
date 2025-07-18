import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import friends from "./static/friends.png";
import diseño from "./static/diseño.svg";
import mantenimiento from "./static/mantenimiento.svg";
import social from "./static/social.svg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import proyecto1 from "./static/proyecto1.png";
import proyecto2 from "./static/proyecto2.png";
import proyecto3 from "./static/proyecto3.png";
import proyecto4 from "./static/proyecto4.png";
import ServiceCard from "./components/ServiceCard";
import ProjectCard from "./components/ProjectCard";
import ContactForm from "./components/ContactForm";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import FadeInWhenVisible from "./components/FadeInWhenVisible";

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
  const totalSlides = 4; // Total de proyectos

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
    const sections = [
      "servicios",
      "sobre-mi",
      "proyectos",
      "precios",
      "contacto",
    ];
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

  const projects = [
    {
      image: proyecto1,
      title: "GameHub",
      description:
        "App para torneos, foros y biblioteca de juegos. Permite crear torneos y foros.",
      techs: ["Spring Boot", "Thymeleaf", "MySQL"],
    },
    {
      image: proyecto2,
      title: "Weather App",
      description:
        "App meteorológica con OpenWeatherMap y fotos dinámicas de Unsplash.",
      techs: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    },
    {
      image: proyecto3,
      title: "SergiDex",
      description:
        "Sitio temático Pokémon: búsqueda, tipos, equipos y tabla de daños.",
      techs: ["HTML", "CSS", "Bootstrap", "TypeScript", "Angular"],
    },
    {
      image: proyecto4,
      title: "Panadería Vigil",
      description: "Web limpia y sencilla para una panadería local.",
      techs: ["HTML", "TailwindCSS", "React", "Vite"],
    },
  ];

  const services = [
    {
      title: "Impulso Express",
      description:
        "Tu primera web profesional de una sola página. Presencia online rápida, atractiva y efectiva.",
      priceText: "199 €",
      color: "from-pink-500 to-fuchsia-600",
      features: [
        "Diseño moderno y responsive",
        "1 sección (scroll único)",
        "Formulario de contacto",
        "Integración a redes sociales",
        "Entrega rápida en 5 días",
      ],
    },
    {
      title: "Presencia Pro",
      description:
        "Web multipágina para negocios que quieren mostrar más contenido y destacar frente a la competencia.",
      priceText: "349 €",
      color: "from-orange-500 to-amber-500",
      features: [
        "Hasta 4 secciones",
        "Diseño adaptado a tu imagen de marca",
        "Formulario de contacto",
        "Optimización básica para buscadores (SEO)",
        "Dominio + hosting 1 año incluidos",
      ],
    },
    {
      title: "Web a Medida",
      description:
        "Desarrollo web completo con funcionalidades personalizadas para negocios que necesitan más.",
      priceText: "549 €",
      color: "from-emerald-500 to-blue-500",
      features: [
        "Hasta 8 secciones o páginas",
        "Funcionalidades a medida (blog, catálogo, reservas, etc.)",
        "SEO inicial + rendimiento optimizado",
        "Google Analytics instalado",
        "Dominio + hosting incluidos por 1 año",
      ],
    },
  ];

  const firstMenuItemRef = useRef(null);

  useEffect(() => {
    if (menuOpen && firstMenuItemRef.current) {
      firstMenuItemRef.current.focus();
    }
  }, [menuOpen]);

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

            <nav
              className="relative"
              role="navigation"
              aria-label="Menú principal"
            >
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
                  {[
                    "servicios",
                    "sobre-mi",
                    "proyectos",
                    "precios",
                    "contacto",
                  ].map((sec, i) => (
                    <a
                      key={sec}
                      href={`#${sec}`}
                      ref={i === 0 ? firstMenuItemRef : null}
                      onClick={() => setMenuOpen(false)}
                      className={`hover:underline ${
                        activeSection === sec ? "underline font-bold" : ""
                      }`}
                    >
                      {sec === "sobre-mi"
                        ? "Sobre nosotros"
                        : sec.charAt(0).toUpperCase() + sec.slice(1)}
                    </a>
                  ))}
                </div>
              </div>

              {/* Menú desktop */}
              <ul className="hidden md:flex space-x-8 font-semibold">
                {[
                  "servicios",
                  "sobre-mi",
                  "proyectos",
                  "precios",
                  "contacto",
                ].map((sec) => (
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
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <Hero />

        {/* Servicios */}
        <FadeInWhenVisible>
          <section
            id="servicios"
            className="container mx-auto px-6 py-20 max-w-6xl"
            aria-label="Servicios ofrecidos"
          >
            <h3 className="text-4xl font-extrabold text-center mb-16 text-indigo-900 tracking-tight">
              Nuestros Servicios Premium
            </h3>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: diseño,
                  title: "Diseño y Desarrollo Web",
                  description:
                    "Creamos páginas web personalizadas, responsivas y optimizadas para que tu negocio destaque en internet, con un diseño moderno y experiencia intuitiva.",
                },
                {
                  icon: mantenimiento,
                  title: "Mantenimiento y Soporte",
                  description:
                    "Mantenemos tu sitio web seguro, actualizado y funcionando al 100%, para que puedas enfocarte en crecer sin preocupaciones técnicas.",
                },
                {
                  icon: social,
                  title: "Gestión de Redes Sociales",
                  description:
                    "Impulsamos tu presencia digital con estrategias de contenido profesional para atraer y fidelizar clientes en tus redes sociales.",
                },
              ].map(({ icon, title, description }, i) => (
                <article
                  key={i}
                  className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-3 flex flex-col items-center text-center"
                >
                  <div className="flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-indigo-100">
                    <img
                      src={icon}
                      alt={`Icono ${title}`}
                      className="w-14 h-14 object-contain"
                      loading="lazy"
                    />
                  </div>

                  <h4 className="text-2xl font-extrabold mb-4 text-indigo-800 tracking-wide">
                    {title}
                  </h4>

                  <p className="text-gray-700 leading-relaxed text-base max-w-xs">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </FadeInWhenVisible>
        {/* Sobre nosotros */}
        <section
          id="sobre-mi"
          className="bg-white px-6 py-16"
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
          className="py-20 bg-indigo-50 px-6 py-16"
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
                {projects.map((p, i) => (
                  <ProjectCard key={i} {...p} />
                ))}
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

        {/* Precios */}
        <FadeInWhenVisible>
          <section className="py-20 bg-white px-6 py-16" id="precios">
            <h3 className="text-3xl font-extrabold text-indigo-900 mb-12 text-center">
              Planes y Precios
            </h3>
            <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
              Estos son nuestros planes más populares, diseñados para adaptarse
              a las necesidades de distintos tipos de negocios. Todos los planes
              incluyen soporte y personalización.
            </p>
            <div className="max-w-7xl mx-auto px-4 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </section>
        </FadeInWhenVisible>

        {/* Contacto */}
        <FadeInWhenVisible>
          <section
            id="contacto"
            className="container mx-auto px-6 py-16 max-w-4xl"
            aria-label="Formulario de contacto"
          >
            <h3 className="text-3xl font-extrabold text-center mb-8 text-indigo-900">
              Contacto
            </h3>

            <div className="mb-10 bg-indigo-50 border border-indigo-300 rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold text-indigo-900 mb-2">
                Tu tranquilidad, nuestra prioridad
              </h4>
              <p className="text-indigo-700 max-w-xl mx-auto">
                En VigilDigital creemos que la comunicación abierta y rápida con
                nuestros clientes es la clave para ofrecer un servicio
                excepcional...
              </p>
            </div>

            <ContactForm />

            {/* Contacto alternativo: WhatsApp y Email */}
            <div className="mt-16 text-center">
              <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto">
                También puedes contactarnos directamente por WhatsApp o correo
                electrónico:
              </p>
              <div className="flex justify-center gap-8 flex-wrap">
                <a
                  href="https://wa.me/34694201981"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full py-3 px-8 shadow-md transition w-64 justify-center"
                  aria-label="Contactar por WhatsApp al 694 20 19 81"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.52 3.48A11.9 11.9 0 0012 0C5.373 0 0 5.373 0 12c0 2.117.552 4.12 1.6 5.875L0 24l6.375-1.575A11.923 11.923 0 0012 24c6.627 0 12-5.373 12-12 0-3.192-1.247-6.186-3.48-8.52zM12 22.125a10.02 10.02 0 01-5.062-1.39l-.362-.22-3.78.935.978-3.676-.236-.374A9.955 9.955 0 012.025 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.107-7.516c-.264-.132-1.56-.77-1.8-.859-.24-.089-.415-.132-.59.133-.173.264-.668.859-.82 1.036-.15.176-.3.198-.564.066-.264-.132-1.114-.41-2.123-1.312-.785-.698-1.315-1.562-1.47-1.825-.15-.264-.016-.406.116-.537.12-.119.264-.31.396-.465.132-.155.176-.264.264-.44.088-.176.044-.33-.022-.46-.066-.132-.59-1.42-.808-1.943-.213-.51-.43-.44-.59-.448-.152-.007-.33-.008-.505-.008-.176 0-.46.066-.7.33-.24.264-.915.894-.915 2.176 0 1.28.937 2.517 1.068 2.693.132.176 1.846 2.87 4.48 4.025.626.27 1.114.43 1.493.55.627.198 1.197.17 1.65.103.503-.073 1.56-.637 1.78-1.252.22-.615.22-1.143.154-1.252-.066-.11-.24-.176-.503-.308z" />
                  </svg>
                  694 20 19 81
                </a>

                <a
                  href="mailto:info@vigildigital.es"
                  className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full py-3 px-8 shadow-md transition w-64 justify-center"
                  aria-label="Enviar email a info@vigildigital.es"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  info@vigildigital.es
                </a>
              </div>
            </div>
          </section>
        </FadeInWhenVisible>

        {/* Botón flotante de WhatsApp */}
        <motion.a
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          href="https://wa.me/34694201981"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 md:hidden"
          aria-label="Chatea por WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.52 3.48A11.9 11.9 0 0012 0C5.373 0 0 5.373 0 12c0 2.117.552 4.12 1.6 5.875L0 24l6.375-1.575A11.923 11.923 0 0012 24c6.627 0 12-5.373 12-12 0-3.192-1.247-6.186-3.48-8.52zM12 22.125a10.02 10.02 0 01-5.062-1.39l-.362-.22-3.78.935.978-3.676-.236-.374A9.955 9.955 0 012.025 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.107-7.516c-.264-.132-1.56-.77-1.8-.859-.24-.089-.415-.132-.59.133-.173.264-.668.859-.82 1.036-.15.176-.3.198-.564.066-.264-.132-1.114-.41-2.123-1.312-.785-.698-1.315-1.562-1.47-1.825-.15-.264-.016-.406.116-.537.12-.119.264-.31.396-.465.132-.155.176-.264.264-.44.088-.176.044-.33-.022-.46-.066-.132-.59-1.42-.808-1.943-.213-.51-.43-.44-.59-.448-.152-.007-.33-.008-.505-.008-.176 0-.46.066-.7.33-.24.264-.915.894-.915 2.176 0 1.28.937 2.517 1.068 2.693.132.176 1.846 2.87 4.48 4.025.626.27 1.114.43 1.493.55.627.198 1.197.17 1.65.103.503-.073 1.56-.637 1.78-1.252.22-.615.22-1.143.154-1.252-.066-.11-.24-.176-.503-.308z" />{" "}
          </svg>
        </motion.a>

        {/* Footer con redes sociales */}
        <Footer />
      </div>
    </>
  );
}
