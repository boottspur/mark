'use client';

import dynamic from 'next/dynamic';

const SceneRenderer = dynamic(
  () => import('@/components/SceneRenderer').then(mod => mod.SceneRenderer),
  { 
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-6xl font-bold animate-pulse">
          LOADING...
        </div>
      </div>
    )
  }
);

export default function MarkPage() {
  return (
    <div className="scenes-page">
      <SceneRenderer />
    </div>
  );
}