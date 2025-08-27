export interface SceneProps {
  text?: string;
  primaryColor?: string;
  secondaryColor?: string;
  seed?: string;
  message?: string;
}

export interface Scene {
  id: string;
  name: string;
  component: React.ComponentType<SceneProps>;
  weight?: number; // Higher weight = more likely to be selected
  requiresAPI?: boolean; // Does this scene need API access?
}

export interface SceneRegistryType {
  scenes: Scene[];
  register: (scene: Scene) => void;
  get: (id: string) => Scene | undefined;
  getRandom: (excludeAPI?: boolean) => Scene;
  getAll: () => Scene[];
}