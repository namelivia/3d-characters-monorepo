import { loadDialogs, DialogsJSON } from "./loader";
import Dialog from "./dialog";
describe("Dialog loader", () => {
  it("should load dialogs from a JSON structure", () => {
    const dialogsJson = [
      {
        id: "33843d75-c519-4c3e-8b6e-d55e666cf6aa",
        text: "These are my friends. They are all very cool.",
        start: 200,
        duration: 500,
      },
      {
        id: "17b86198-1228-4551-8f28-73d26606df82",
        text: "This is another dialog.",
        start: 500,
        duration: 800,
      },
    ] as DialogsJSON;

    const dialogs = loadDialogs(dialogsJson);
    expect(dialogs.length).toBe(2);
    expect(dialogs[0]).toBeInstanceOf(Dialog);
    expect(dialogs[0].id).toBe("33843d75-c519-4c3e-8b6e-d55e666cf6aa");
    expect(dialogs[0].text).toBe(
      "These are my friends. They are all very cool."
    );
    expect(dialogs[0].start).toBe(200);
    expect(dialogs[0].duration).toBe(500);
    expect(dialogs[1]).toBeInstanceOf(Dialog);
    expect(dialogs[1].id).toBe("17b86198-1228-4551-8f28-73d26606df82");
    expect(dialogs[1].text).toBe("This is another dialog.");
    expect(dialogs[1].start).toBe(500);
    expect(dialogs[1].duration).toBe(800);
  });
});
