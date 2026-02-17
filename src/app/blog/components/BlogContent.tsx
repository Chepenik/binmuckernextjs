'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Clock } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

function PostCard({ post }: { post: BlogPost }) {
  return (
    <motion.article variants={itemVariants}>
      <Link
        href={`/blog/${post.slug}`}
        className="group block card-premium h-full"
      >
        {/* Hover gradient overlay */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br
                     from-neon-cyan/10 via-neon-blue/5 to-neon-purple/10
                     opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        <div className="relative z-10">
          {/* Date & reading time */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Clock className="w-3.5 h-3.5" />
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

          {/* Title with arrow */}
          <div className="flex justify-between items-start mb-2">
            <h2 className="font-semibold text-white text-lg pr-4
                           group-hover:text-neon-cyan transition-colors duration-300">
              {post.title}
            </h2>
            <ArrowUpRight
              className="text-gray-600 group-hover:text-neon-cyan
                         group-hover:translate-x-1 group-hover:-translate-y-1
                         transition-all duration-300 flex-shrink-0"
              size={20}
            />
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4
                        group-hover:text-gray-300 transition-colors duration-300">
            {post.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider
                           bg-white/5 text-gray-400 border border-white/10
                           group-hover:bg-neon-cyan/10 group-hover:text-neon-cyan
                           group-hover:border-neon-cyan/30 group-hover:shadow-[0_0_10px_rgba(0,194,255,0.15)]
                           transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Decorative dots */}
          <div className="flex gap-1 mt-4 justify-end">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-700
                            group-hover:bg-neon-cyan group-hover:shadow-[0_0_6px_rgba(0,194,255,0.6)]
                            transition-all duration-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-700
                            group-hover:bg-neon-cyan/70 group-hover:shadow-[0_0_6px_rgba(0,194,255,0.4)]
                            transition-all duration-300 delay-75" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-700
                            group-hover:bg-neon-cyan/40 group-hover:shadow-[0_0_6px_rgba(0,194,255,0.2)]
                            transition-all duration-300 delay-150" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function BlogContent({ posts }: { posts: BlogPost[] }) {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-3 mb-8 glass-dark px-5 py-2.5 rounded-full border border-white/10">
          <BookOpen className="w-5 h-5 text-neon-cyan/70" />
          <span className="text-sm font-medium text-gray-400">
            Ideas worth thinking about twice
          </span>
          <BookOpen className="w-5 h-5 text-neon-cyan/70" />
        </div>

        <h1 className="heading-display text-[#E6EEF3] mb-4 drop-shadow-[0_0_30px_rgba(0,194,255,0.15)]">
          Blog
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Thoughts on Bitcoin, AI, exponential change, building in public, and the tools I create along the way.
        </p>
        <div className="mt-6 h-[2px] w-32 mx-auto rounded-full bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent" />
      </motion.div>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No posts yet. Check back soon!</p>
        </div>
      ) : (
        <>
          {/* Section Header */}
          <div className="mb-10 flex items-center gap-4">
            <div className="w-1 h-12 bg-neon-cyan/60 rounded-full shadow-[0_0_10px_rgba(0,194,255,0.3)]" />
            <div>
              <h2 className="heading-section text-white">
                Latest <span className="text-neon-cyan">Posts</span>
              </h2>
              <p className="text-gray-500 text-sm mt-1">{posts.length} {posts.length === 1 ? 'article' : 'articles'}</p>
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </motion.div>
        </>
      )}
    </main>
  );
}
