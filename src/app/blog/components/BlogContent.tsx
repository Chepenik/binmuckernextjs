'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Clock, Sparkles } from 'lucide-react';
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

function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-12"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block relative rounded-3xl p-8 md:p-10 overflow-hidden
                   bg-gradient-to-br from-cyber-800/80 via-cyber-black/90 to-night-purple/50
                   border border-gold-500/40 backdrop-blur-xl
                   shadow-[0_0_50px_rgba(255,215,0,0.1),inset_0_1px_0_rgba(255,215,0,0.1)]
                   hover:shadow-[0_0_60px_rgba(255,215,0,0.15)] transition-all duration-500"
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px]
                        bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gold-500/50 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-neon-cyan/50 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-neon-cyan/50 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gold-500/50 rounded-br-lg" />

        {/* Background glows */}
        <div className="absolute top-0 right-0 w-72 h-72
                        bg-gradient-radial from-gold-500/15 to-transparent
                        blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56
                        bg-gradient-radial from-neon-cyan/10 to-transparent
                        blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Featured badge */}
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full
                          bg-gold-500/10 border border-gold-500/30">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">
              Latest Post
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3
                         group-hover:text-gold-300 transition-colors duration-300
                         drop-shadow-[0_0_20px_rgba(255,215,0,0.15)]">
            {post.title}
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6 max-w-3xl
                        group-hover:text-gray-200 transition-colors duration-300">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
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

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider
                             bg-gold-500/10 text-gold-400 border border-gold-500/30
                             group-hover:bg-gold-500/20
                             transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Read arrow */}
          <div className="absolute top-8 right-8 md:top-10 md:right-10">
            <ArrowUpRight
              className="text-gold-500/50 group-hover:text-gold-400
                         group-hover:translate-x-1 group-hover:-translate-y-1
                         transition-all duration-300"
              size={24}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

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
  const [featured, ...rest] = posts;

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
          {/* Featured Post */}
          {featured && <FeaturedPostCard post={featured} />}

          {/* Remaining Posts */}
          {rest.length > 0 && (
            <>
              {/* Section Header */}
              <div className="mb-10 flex items-center gap-4">
                <div className="w-1 h-12 bg-neon-cyan/60 rounded-full shadow-[0_0_10px_rgba(0,194,255,0.3)]" />
                <div>
                  <h2 className="heading-section text-white">
                    More <span className="text-neon-cyan">Posts</span>
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">Keep reading</p>
                </div>
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {rest.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </motion.div>
            </>
          )}
        </>
      )}
    </main>
  );
}
