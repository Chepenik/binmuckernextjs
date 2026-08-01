import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article>
      <Link href={`/blog/${post.slug}`} className="blog-post-card ui-card ui-card-interactive">
        <div className="article-meta">
          <Clock size={14} aria-hidden="true" />
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </div>
        <div className="blog-post-title-row">
          <h2>{post.title}</h2>
          <ArrowUpRight size={19} aria-hidden="true" />
        </div>
        <p>{post.description}</p>
        <div className="blog-post-tags" aria-label="Topics">
          {post.tags.map((tag) => <span key={tag} className="ui-chip">{tag}</span>)}
        </div>
      </Link>
    </article>
  );
}

export function BlogContent({ posts }: { posts: BlogPost[] }) {
  return (
    <main>
      <div className="site-shell route-main">
        <header className="route-hero">
          <p className="route-eyebrow">Daily practice · longer thoughts</p>
          <h1 className="route-title">Writing that helps the ideas hold still.</h1>
          <p className="route-lede">
            Essays about Bitcoin, building, AI, health, and the lessons that become clearer after writing them down.
          </p>
        </header>

        <section aria-labelledby="latest-posts">
          <div className="ui-section-heading">
            <div>
              <p className="route-eyebrow">From the notebook</p>
              <h2 id="latest-posts">Latest writing</h2>
            </div>
            <p>{posts.length} {posts.length === 1 ? 'article' : 'articles'}</p>
          </div>

          {posts.length === 0 ? (
            <div className="ui-card blog-empty-state">No posts yet. The daily writing continues on Medium.</div>
          ) : (
            <div className="ui-grid-2">
              {posts.map((post) => <PostCard key={post.slug} post={post} />)}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
