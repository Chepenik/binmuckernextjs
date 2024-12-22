// src/app/layout.tsx
import React from 'react';

export const metadata = {
  title: 'binmucker.com',
  description: 'Showcase of memes, finance tools, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
