import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

const loadGLTF = async (path: string): Promise<GLTF> => {
  const loader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.load(
      path,
      (data) => resolve(data),
      () => null,
      reject
    );
  });
};

export { loadGLTF };
