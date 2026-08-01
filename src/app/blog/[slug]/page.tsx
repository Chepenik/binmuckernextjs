import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { BlogPostContent } from './BlogPostContent';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/og';

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
      url: `https://www.binmucker.com/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: ['Conor Chepenik'],
      tags: post.tags,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Binmucker`,
      description: post.description,
      images: [OG_IMAGE_URL],
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        author: {
          '@type': 'Person',
          name: 'Conor Chepenik',
          url: 'https://www.binmucker.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Binmucker LLC',
          url: 'https://www.binmucker.com',
        },
        url: `https://www.binmucker.com/blog/${slug}`,
        mainEntityOfPage: `https://www.binmucker.com/blog/${slug}`,
        image: OG_IMAGE_URL,
        keywords: post.tags,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.binmucker.com/' },
          { '@type': 'ListItem', position: 2, name: 'Writing', item: 'https://www.binmucker.com/blog' },
          { '@type': 'ListItem', position: 3, name: post.title },
        ],
      },
    ],
  };

  return (
    <div className="site-page">
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }}
        />

        <div className="site-shell route-main route-main-narrow">
          <Link href="/blog" className="ui-back-link">&larr; Back to writing</Link>

          <article>
            <header className="article-header">
              <p className="route-eyebrow">Binmucker writing</p>
              <h1 className="article-title">{post.title}</h1>
              <div className="article-meta">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readingTime}</span>
              </div>
              <div className="blog-post-tags" aria-label="Topics">
              {post.tags.map((tag) => (
                <span key={tag} className="ui-chip">{tag}</span>
              ))}
              </div>
            </header>

            <BlogPostContent content={post.content} />
          </article>

          <div className="article-footer-link">
            <Link href="/blog" className="ui-button-secondary">Back to all writing</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
