import { loadTransitions, TransitionsJSON } from "./loader";
import Transition from "./transition";
describe("Transition loader", () => {
  it("should load transitions from a JSON structure", () => {
    const transitionsJson = [
      {
        scene: "scene2.json",
        time: 200,
      },
      {
        scene: "scene3.json",
        time: 700,
      },
    ] as TransitionsJSON;

    const transitions = loadTransitions(transitionsJson);
    expect(transitions).toHaveLength(2);
    expect(transitions[0]).toBeInstanceOf(Transition);
    expect(transitions[0].scene).toBe("scene2.json");
    expect(transitions[0].time).toBe(200);
    expect(transitions[1]).toBeInstanceOf(Transition);
    expect(transitions[1].scene).toBe("scene3.json");
    expect(transitions[1].time).toBe(700);
  });
});
