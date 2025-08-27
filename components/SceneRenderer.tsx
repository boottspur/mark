'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { registerScenes, sceneRegistry } from '@/components/scenes';
import { SceneFooter } from '@/components/SceneFooter';
import { LoadingScene } from '@/components/LoadingScene';
import { Scene } from '@/types/scene';

function SceneContent() {
  const searchParams = useSearchParams();
  const [currentScene, setCurrentScene] = useState<Scene | null>(null);
  const [loadStartTime, setLoadStartTime] = useState(Date.now());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Register all scenes on mount
    registerScenes();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    setLoadStartTime(Date.now());
    
    const sceneId = searchParams.get('scene');
    
    let scene: Scene | undefined;
    
    if (sceneId) {
      // Try to get specific scene
      scene = sceneRegistry.get(sceneId);
    }
    
    if (!scene) {
      // Get random scene, preferring AI but falling back if needed
      try {
        scene = sceneRegistry.getRandom(false);
      } catch {
        // If no scenes available, wait a bit and try again
        setTimeout(() => {
          scene = sceneRegistry.getRandom(false);
          if (scene) setCurrentScene(scene);
        }, 100);
        return;
      }
    }
    
    setCurrentScene(scene);
  }, [searchParams, mounted]);

  const debugMode = searchParams.get('debug') === 'true';
  const loadTime = Date.now() - loadStartTime;

  if (!mounted || !currentScene) {
    return <LoadingScene />;
  }

  const SceneComponent = currentScene.component;

  return (
    <>
      <SceneComponent 
        text="MARK" 
        primaryColor="#ff006e"
        seed={searchParams.get('seed') || undefined}
      />
      <SceneFooter
        scenes={sceneRegistry.getAll()}
        currentSceneId={currentScene.id}
        debugMode={debugMode}
        loadTime={loadTime}
      />
    </>
  );
}

export function SceneRenderer() {
  return (
    <Suspense fallback={<LoadingScene />}>
      <SceneContent />
    </Suspense>
  );
}