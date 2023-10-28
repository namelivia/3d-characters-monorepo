import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

class BasicScene {
  setScenario = (scenario: GLTF): LoadedBasicScene => {
    return new LoadedBasicScene(scenario);
  };
}

class LoadedBasicScene {
  scenario: GLTF;
  constructor(scenario: GLTF) {
    this.scenario = scenario;
  }
}

export { BasicScene, LoadedBasicScene };
