import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { getRandomColor } from "../colors/colors";
import { Character, AnimatedCharacter } from "../character/character";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

/* BasicWorld is the world for the character editor.
 * It only has the most basic elements: a scene, a camera, and a renderer.
 */

class BasicWorld {
  scene?: THREE.Scene;
  camera?: THREE.PerspectiveCamera;
  renderer?: THREE.WebGLRenderer;
  mixers: THREE.AnimationMixer[] = [];

  constructor() {
    this.renderer = this.setupRenderer();
  }

  public initialize = () => {
    this.scene = new THREE.Scene();
    this.mixers = [];
    this.camera = this.setupCamera();
    this.setupControls();
    this.setupLight();
  };

  addFloorGrid = (): void => {
    const grid = new THREE.GridHelper(6, 6, getRandomColor(), getRandomColor());
    if (this.scene) {
      this.scene.add(grid);
    }
  };

  setupLight = (): void => {
    const light = new THREE.AmbientLight(0xffffff, 1);
    if (this.scene) {
      this.scene.add(light);
    }
  };

  setupCamera = (): THREE.PerspectiveCamera => {
    const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 5;
    return camera;
  };

  setupRenderer = (): THREE.WebGLRenderer => {
    const renderer = new THREE.WebGLRenderer();
    const container = document.getElementById("3d-view");
    if (container) {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);
    }
    return renderer;
  };

  setupControls = () => {
    if (this.camera && this.renderer) {
      new OrbitControls(this.camera, this.renderer.domElement);
    }
  };

  step = () => {
    if (this.camera && this.renderer && this.scene) {
      this.mixers.forEach((mixer) => mixer.update(0.01));
      this.renderer.render(this.scene, this.camera);
    }
  };

  add = (character: Character) => {
    if (this.scene) {
      this.scene.add(character.getModel());
      if (character instanceof AnimatedCharacter) {
        this.mixers.push(character.mixer);
      }
    }
  };

  addScenario = (scenario: GLTF) => {
    if (this.scene) {
      //Apply the camera from the scenario
      const camera = scenario.cameras[0] as THREE.PerspectiveCamera;
      this.camera = camera;
      const scene = scenario.scene;
      const walkmesh = scene.getObjectByName("Walkmesh");
      if (walkmesh) {
        walkmesh.visible = false;
      }
      this.scene.add(scene);
    }
  };

  remove = (character: Character) => {
    if (this.scene) {
      this.scene.remove(character.getModel());
      if (character instanceof AnimatedCharacter) {
        this.mixers = this.mixers.filter((mixer) => mixer !== character.mixer);
      }
    }
  };
}

export default BasicWorld;
