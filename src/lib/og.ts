// Shared Open Graph image — the single source of truth for rich social previews.
//
// Next.js does NOT deep-merge metadata: when a child route declares its own
// `openGraph` object it replaces the root's entirely, dropping the inherited
// image. So every page that sets `openGraph` must re-declare `images` with this
// constant, or its shared links render as a bare URL with no preview card.
export const OG_IMAGE_URL = 'https://i.nostr.build/lWaH02jqNNEXV0B1.jpg';

export const OG_IMAGE = {
  url: OG_IMAGE_URL,
  width: 1200,
  height: 630,
  alt: 'Binmucker by Conor Chepenik. Tools, writing, Bitcoin, and internet experiments.',
};
