import Transition from "./transition";

describe("Transition", () => {
  it("Transitions should happen", () => {
    const transition = new Transition("scene2", 200);

    //A transition function is set
    const onSceneTransition = jest.fn();
    transition.setOnSceneTransition(onSceneTransition);

    //The transition is not happening
    expect(onSceneTransition).toHaveBeenCalledTimes(0);

    //The transition happens at the right time
    transition.update(100);
    expect(onSceneTransition).toHaveBeenCalledTimes(0);

    //The transition only happens once
    transition.update(200);
    expect(onSceneTransition).toHaveBeenCalledTimes(1);
    transition.update(800);
    expect(onSceneTransition).toHaveBeenCalledTimes(1);
  });
});
