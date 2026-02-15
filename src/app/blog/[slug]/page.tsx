import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { mdxComponents } from '../components/mdx-components';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${post.title} | Binmucker`,
      description: post.description,
      url: `https://binmucker.com/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: ['Conor Chepenik'],
      tags: post.tags,
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Conor Chepenik',
      url: 'https://binmucker.com',
    },
    publisher: {
      '@type': 'Organization',
      name: "Binmucker's LLC",
      url: 'https://binmucker.com',
    },
    url: `https://binmucker.com/blog/${slug}`,
    keywords: post.tags,
  };

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }}
        />

        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-neon-cyan
                     transition-colors duration-300 mb-8"
        >
          &larr; Back to Blog
        </Link>

        <article>
          <header className="mb-10">
            <h1 className="heading-display text-[#E6EEF3] mb-4">{post.title}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
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
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider
                             bg-white/5 text-gray-400 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />
          </header>

          <div>
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>

        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <Link
            href="/blog"
            className="text-sm text-gray-500 hover:text-neon-cyan transition-colors duration-300"
          >
            &larr; Back to all posts
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
