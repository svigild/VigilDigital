import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const form = useRef();
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    from_email: "",
    message: "",
  });

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
          setFormData({ name: "", from_email: "", message: "" });
          setSending(false);
        },
        (error) => {
          console.error(error);
          setStatus({
            type: "error",
            message: "Error al enviar el formulario, intenta de nuevo.",
          });
          setSending(false);
        }
      );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
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
        required
        placeholder="Tu nombre"
        minLength={2}
        maxLength={50}
        value={formData.name}
        onChange={handleChange}
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        aria-describedby="name-error"
      />
      {formData.name.trim() &&
        (formData.name.length < 2 || formData.name.length > 50) && (
          <p id="name-error" className="text-sm text-red-600" role="alert">
            El nombre debe tener entre 2 y 50 caracteres.
          </p>
        )}

      <label htmlFor="from_email" className="font-semibold text-indigo-900">
        Correo electrónico
      </label>
      <input
        type="email"
        id="from_email"
        name="from_email"
        required
        placeholder="tucorreo@ejemplo.com"
        value={formData.from_email}
        onChange={handleChange}
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        aria-describedby="email-error"
      />
      {formData.from_email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email) && (
          <p id="email-error" className="text-sm text-red-600" role="alert">
            Por favor, introduce un correo válido.
          </p>
        )}

      <label htmlFor="message" className="font-semibold text-indigo-900">
        Mensaje
      </label>
      <textarea
        id="message"
        name="message"
        required
        placeholder="Escribe tu mensaje aquí..."
        rows={6}
        minLength={10}
        maxLength={500}
        value={formData.message}
        onChange={handleChange}
        className="border rounded-md px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-400"
        aria-describedby="message-error"
      />
      {formData.message.trim() &&
        (formData.message.length < 10 || formData.message.length > 500) && (
          <p id="message-error" className="text-sm text-red-600" role="alert">
            El mensaje debe tener entre 10 y 500 caracteres.
          </p>
        )}

      <button
        type="submit"
        disabled={
          sending ||
          !(
            formData.name.length >= 2 &&
            formData.name.length <= 50 &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email) &&
            formData.message.length >= 10 &&
            formData.message.length <= 500
          )
        }
        className="bg-indigo-700 text-white font-semibold rounded-md py-3 px-6 mt-4 shadow-md hover:bg-indigo-800 transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {sending ? "Enviando..." : "Enviar mensaje"}
      </button>

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
  );
}
