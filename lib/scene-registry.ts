import { Scene, SceneRegistryType } from '@/types/scene';

class SceneRegistry implements SceneRegistryType {
  scenes: Scene[] = [];

  register(scene: Scene) {
    // Prevent duplicate registrations
    if (!this.scenes.find(s => s.id === scene.id)) {
      this.scenes.push(scene);
    }
  }

  get(id: string): Scene | undefined {
    return this.scenes.find(s => s.id === id);
  }

  getRandom(excludeAPI: boolean = false): Scene {
    const availableScenes = excludeAPI 
      ? this.scenes.filter(s => !s.requiresAPI)
      : this.scenes;
    
    if (availableScenes.length === 0) {
      throw new Error('No scenes available');
    }

    // Calculate total weight
    const totalWeight = availableScenes.reduce((sum, scene) => 
      sum + (scene.weight || 1), 0
    );

    // Random number between 0 and totalWeight
    let random = Math.random() * totalWeight;

    // Find the scene based on weighted random
    for (const scene of availableScenes) {
      random -= (scene.weight || 1);
      if (random <= 0) {
        return scene;
      }
    }

    // Fallback (shouldn't reach here)
    return availableScenes[0];
  }

  getAll(): Scene[] {
    return this.scenes;
  }
}

export const sceneRegistry = new SceneRegistry();