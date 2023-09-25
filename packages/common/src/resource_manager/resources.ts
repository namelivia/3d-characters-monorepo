import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

export type Resources = {
  models3d: string[];
};

export type Model3d = {
  gltf: GLTF;
  key: string;
};

export type Song = {
  data: AudioBuffer;
  key: string;
};
