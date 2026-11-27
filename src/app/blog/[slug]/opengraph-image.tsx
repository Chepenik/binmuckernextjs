import { ImageResponse } from 'next/og';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

// Per-post social card, rendered once at build time for each post.
// Matches the look of /public/og.png (the site-wide card).
export const alt = 'Binmucker blog post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
// Only posts that exist at build time get a card; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

function formatDate(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? 'Binmucker';
  const date = post ? formatDate(post.date) : '';
  const titleSize = title.length > 60 ? 60 : title.length > 36 ? 70 : 84;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: '#07080b',
          color: '#f5f5f7',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -170,
            top: 45,
            width: 540,
            height: 540,
            borderRadius: 999,
            border: '2px solid rgba(155, 187, 237, 0.55)',
            boxShadow: '0 0 90px rgba(120, 160, 230, 0.35)',
            display: 'flex',
          }}
        />
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 6, color: '#a1a1aa' }}>BINMUCKER · WRITING</div>
        <div
          style={{
            display: 'flex',
            maxWidth: 900,
            fontSize: titleSize,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: -1.5,
          }}
        >
          {title}
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#a1a1aa', gap: 18 }}>
          <span>Conor Chepenik</span>
          {date ? <span style={{ color: '#5b8def' }}>•</span> : null}
          {date ? <span>{date}</span> : null}
          <span style={{ color: '#5b8def' }}>•</span>
          <span>binmucker.com</span>
        </div>
      </div>
    ),
    size,
  );
}
