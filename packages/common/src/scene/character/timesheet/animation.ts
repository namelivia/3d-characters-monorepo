export class Animation {
  animations: THREE.AnimationClip[];

  constructor(animations: THREE.AnimationClip[]) {
    this.animations = animations;
  }

  // Animations have to be stopped before starting a new one.
  // This is because they can be combined and played at the same time.
  // But I don't want that.
  set = (
    name: string,
    mixer: THREE.AnimationMixer,
    current?: THREE.AnimationAction
  ): THREE.AnimationAction | undefined => {
    // First we look for the animation with the specified name
    const animation = this.animations.find(
      (animation) => animation.name === name
    );
    if (!animation) {
      console.error(`Animation ${name} not found`);
      return;
    }

    const newAnimation = mixer.clipAction(animation);

    // If is not doing anything start playing it
    if (current === undefined) {
      newAnimation.play();
      return newAnimation;
    }

    // If it is another animation, stop the old one and start a new one
    if (current !== newAnimation) {
      current.stop();
      newAnimation.play();
      return newAnimation;
    }

    // If it is the same animation, do nothing
    return current;
  };
}
