import { MovementList, Movement } from "./movement";

// A KeyframeAction has the numeric frame as the index
// and the string designating the action to start performing
// as the value.
type KeyframeAction = {
  [key: number]: string;
};

export type ActionMap = {
  index: KeyframeAction;
  duration: number; // The action map has a duration, and it will run in a loop.
};

// The character timesheet holds the loop of actions a character will perform.
// Currently the actions are movements and animations.
export class Timesheet {
  // Currently the character Timesheet contains two action maps, one
  // for the movements to perform, and another one for the animations
  // to play.

  // I'm just setting some default movements here as en example
  movementMap: ActionMap = {
    index: {
      0: "spin_left",
      100: "move_down",
      200: "spin_right",
      300: "move_up",
      400: "spin_left",
      500: "move_left",
      600: "spin_right",
      700: "move_right",
    },
    duration: 800,
  };

  // I'm just setting some default animations here as en example
  animationMap: ActionMap = {
    index: {
      0: "Idle",
      500: "wave",
    },
    duration: 800,
  };

  setMovementMap = (movementMap: ActionMap) => {
    this.movementMap = movementMap;
  };

  setAnimationMap = (animationMap: ActionMap) => {
    this.animationMap = animationMap;
  };

  getCurrentAction = (time: number, map: ActionMap): string => {
    const relativeTime = time % map.duration;
    const keys = Object.keys(map.index).map((x) => Number(x)); // TODO: Do I really need to cast?
    const selectedKey = Math.max(...keys.filter((x) => x <= relativeTime));
    return map.index[selectedKey];
  };

  //This functions will get the current movement and animation for the timer
  getMovement = (time: number): Movement =>
    MovementList[this.getCurrentAction(time, this.movementMap)];
  getAnimation = (time: number): string =>
    this.getCurrentAction(time, this.animationMap);
}
