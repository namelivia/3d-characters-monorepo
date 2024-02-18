import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

class BasicScene {
  setScenario = (scenario: GLTF): LoadedBasicScene => {
    return new LoadedBasicScene(scenario);
  };
}

class LoadedBasicScene extends BasicScene {
  scenario: GLTF;
  constructor(scenario: GLTF) {
    super();
    this.scenario = scenario;
  }
}

export { BasicScene, LoadedBasicScene };
