import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

class BasicScene {
  scenario: GLTF | null;
  constructor() {
    this.scenario = null;
  }

  setScenario = (scenario: GLTF) => {
    this.scenario = scenario;
  };
}
export default BasicScene;
