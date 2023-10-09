import { default as Transition } from './transition'

// This is how transitions are stored in a JSON file.
export type TransitionsJSON = {
  scene: string;
  time: number;
}[];


export const loadTransitions = (json: TransitionsJSON): Transition[] => {
    return json.map((transition) => {
        return new Transition(transition.scene, transition.time)
    })
}
