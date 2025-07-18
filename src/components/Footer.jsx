import React, { useRef, useState, useEffect } from "react";

export default function Footer() {
  return (
    <footer className="bg-[#1e1b4b] text-[#e0e7ff] py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <p className="mb-4 md:mb-0">
          &copy; 2025 VigilDigital. Todos los derechos reservados.
        </p>
        <div className="flex space-x-6">
          <a
            href="https://wa.me/34694201981"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hover:text-indigo-300 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.52 3.48A11.9 11.9 0 0012 0C5.373 0 0 5.373 0 12c0 2.117.552 4.12 1.6 5.875L0 24l6.375-1.575A11.923 11.923 0 0012 24c6.627 0 12-5.373 12-12 0-3.192-1.247-6.186-3.48-8.52zM12 22.125a10.02 10.02 0 01-5.062-1.39l-.362-.22-3.78.935.978-3.676-.236-.374A9.955 9.955 0 012.025 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.107-7.516c-.264-.132-1.56-.77-1.8-.859-.24-.089-.415-.132-.59.133-.173.264-.668.859-.82 1.036-.15.176-.3.198-.564.066-.264-.132-1.114-.41-2.123-1.312-.785-.698-1.315-1.562-1.47-1.825-.15-.264-.016-.406.116-.537.12-.119.264-.31.396-.465.132-.155.176-.264.264-.44.088-.176.044-.33-.022-.46-.066-.132-.59-1.42-.808-1.943-.213-.51-.43-.44-.59-.448-.152-.007-.33-.008-.505-.008-.176 0-.46.066-.7.33-.24.264-.915.894-.915 2.176 0 1.28.937 2.517 1.068 2.693.132.176 1.846 2.87 4.48 4.025.626.27 1.114.43 1.493.55.627.198 1.197.17 1.65.103.503-.073 1.56-.637 1.78-1.252.22-.615.22-1.143.154-1.252-.066-.11-.24-.176-.503-.308z" />
            </svg>
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61576959064306"
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

          {/* Email */}
          <a
            href="mailto:info@vigildigital.es"
            aria-label="Email"
            className="hover:text-indigo-300 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          </a>

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
  );
}
