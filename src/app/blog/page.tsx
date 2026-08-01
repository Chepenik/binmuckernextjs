import React from 'react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { getAllPosts } from '@/lib/blog';
import { BlogContent } from './components/BlogContent';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="site-page">
      <Header />
      <BlogContent posts={posts} />
      <Footer />
    </div>
  );
}
