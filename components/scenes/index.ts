import { sceneRegistry } from '@/lib/scene-registry';
import { MarqueeScene } from './MarqueeScene';
import { RadarPingScene } from './RadarPingScene';
import { GlitchScene } from './GlitchScene';
import { EmojiRainScene } from './EmojiRainScene';
import { SpotlightScene } from './SpotlightScene';
import { AIMarkupScene } from './AIMarkupScene';

// Register all scenes
export function registerScenes() {
  // AI scene (highest weight, preferred)
  sceneRegistry.register({
    id: 'ai-markup',
    name: 'AI Generated',
    component: AIMarkupScene,
    weight: 10, // Much higher weight
    requiresAPI: true,
  });

  // Non-AI scenes (fallbacks)
  sceneRegistry.register({
    id: 'marquee',
    name: 'Marquee',
    component: MarqueeScene,
    weight: 1,
  });

  sceneRegistry.register({
    id: 'radar',
    name: 'Radar Ping',
    component: RadarPingScene,
    weight: 1,
  });

  sceneRegistry.register({
    id: 'glitch',
    name: 'Glitch',
    component: GlitchScene,
    weight: 1,
  });

  sceneRegistry.register({
    id: 'emoji-rain',
    name: 'Emoji Rain',
    component: EmojiRainScene,
    weight: 1,
  });

  sceneRegistry.register({
    id: 'spotlight',
    name: 'Spotlight',
    component: SpotlightScene,
    weight: 1,
  });
}

export { sceneRegistry };