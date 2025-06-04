import { blogPosts } from "../data/blogPosts";
import BlogCard from "../components/BlogCard";
import React, { useRef, useState, useEffect } from "react";

export default function Blog() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-900">
        Blog
      </h1>
      <div className="grid md:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
