import { Link } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";

export default function BlogCard({ post }) {
  return (
    <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col gap-3">
      <img
        src={post.image}
        alt={post.title}
        className="rounded-lg w-full h-48 object-cover"
      />
      <h3 className="text-xl font-bold text-indigo-800">{post.title}</h3>
      <p className="text-gray-600 text-sm">{post.excerpt}</p>
      <Link
        to={`/blog/${post.id}`}
        className="mt-auto text-indigo-600 font-medium hover:underline"
      >
        Leer más →
      </Link>
    </article>
  );
}
