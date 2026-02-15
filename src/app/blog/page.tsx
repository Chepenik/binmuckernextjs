import React from 'react';
import Link from 'next/link';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { getAllPosts } from '@/lib/blog';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="heading-display text-[#E6EEF3] mb-4">Blog</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Thoughts on Bitcoin, building in public, and the tools I create along the way.
          </p>
          <div className="mt-6 h-[2px] w-32 mx-auto rounded-full bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent" />
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block card-premium"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span className="text-gray-700">&middot;</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-neon-cyan transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider
                                   bg-white/5 text-gray-400 border border-white/10
                                   group-hover:bg-neon-cyan/10 group-hover:text-neon-cyan
                                   group-hover:border-neon-cyan/30
                                   transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
