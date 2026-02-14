'use client';

export function LavaBackground() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <div className="lava-blob lava-blob-1" />
      <div className="lava-blob lava-blob-2" />
      <div className="lava-blob lava-blob-3" />
      <div className="lava-blob lava-blob-4" />
      <div className="lava-blob lava-blob-5" />
      <div className="lava-blob lava-blob-6" />
    </div>
  );
}
