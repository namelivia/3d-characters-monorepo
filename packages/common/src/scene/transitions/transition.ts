class Transition {
  scene: string;
  time: number;
  onSceneTransition: (scene: string) => Promise<void>;

  constructor(scene: string, time: number) {
    this.scene = scene;
    this.time = time;
    this.onSceneTransition = () => Promise.resolve();
  }

  setOnSceneTransition = (
    onSceneTransition: (scene: string) => Promise<void>
  ) => {
    this.onSceneTransition = onSceneTransition;
  };

  update(time: number) {
    if (time === this.time) {
      this.onSceneTransition(this.scene);
    }
  }
}

export default Transition;
