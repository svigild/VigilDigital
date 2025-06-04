import { useParams } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import React, { useRef, useState, useEffect } from "react";

export default function Post() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) return <p className="p-6">Artículo no encontrado.</p>;

  return (
    <section className="container mx-auto px-6 py-16 max-w-3xl">
      <h1 className="text-3xl font-extrabold text-indigo-900 mb-4">
        {post.title}
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Publicado el {new Date(post.date).toLocaleDateString()}
      </p>
      <div
        className="prose prose-indigo max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </section>
  );
}
