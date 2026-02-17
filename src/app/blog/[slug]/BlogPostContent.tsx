'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

const markdownComponents: Components = {
  h1: (props) => (
    <h1 className="text-3xl font-bold text-white mt-10 mb-4" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-2xl font-semibold text-white mt-8 mb-3" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-xl font-semibold text-white mt-6 mb-2" {...props} />
  ),
  p: (props) => (
    <p className="text-gray-300 leading-relaxed mb-4" {...props} />
  ),
  a: ({ href, ...rest }) => (
    <a
      href={href}
      className="text-neon-cyan hover:underline"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...rest}
    />
  ),
  ul: (props) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300 ml-2" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-300 ml-2" {...props} />
  ),
  li: (props) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-neon-cyan/40 pl-4 py-2 my-4 text-gray-400 italic"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-sm font-mono text-neon-cyan"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="bg-white/5 border border-white/10 rounded-xl p-4 overflow-x-auto mb-4 text-sm"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="text-white font-semibold" {...props} />
  ),
  em: (props) => (
    <em className="text-gray-200 italic" {...props} />
  ),
  hr: () => (
    <hr className="border-white/10 my-8" />
  ),
};

export function BlogPostContent({ content }: { content: string }) {
  return (
    <div>
      <ReactMarkdown components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
