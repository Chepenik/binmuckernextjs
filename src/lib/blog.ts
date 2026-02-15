import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    return getPostBySlug(slug);
  });

  return posts
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const safeSlug = slug.replace(/[^a-zA-Z0-9_-]/g, '');
  if (!safeSlug || safeSlug !== slug) return null;

  const filePath = path.join(BLOG_DIR, `${safeSlug}.mdx`);
  if (!path.resolve(filePath).startsWith(path.resolve(BLOG_DIR))) return null;
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  const dateStr = data.date ?? '';
  const parsedDate = new Date(dateStr);
  const validDate = isNaN(parsedDate.getTime())
    ? new Date().toISOString().split('T')[0]
    : dateStr;

  return {
    slug,
    title: data.title ?? slug,
    date: validDate,
    description: data.description ?? '',
    tags: data.tags ?? [],
    readingTime: stats.text,
    content,
  };
}
