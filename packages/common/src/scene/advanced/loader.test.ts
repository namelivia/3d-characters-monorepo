import { loadScene } from "./loader";
import { AdvancedScene } from "./advanced";
import { AnimatedCharacter } from "../character/character";
import { default as Dialog } from "../dialogs/dialog";
import { default as Transition } from "../transitions/transition";
import { Timesheet } from "../character/timesheet/timesheet";
describe("Advanced scene loader", () => {
  it("should load a scene", async () => {
    const sceneJson = {
      resources: {
        models3d: ["models/test.gltf", "models/scene.gltf"],
        audio: ["media/music.ogg"],
      },
      scene: "models/scene.gltf",
      music: "media/music.ogg",
      characters: [
        {
          model3d: "models/test.gltf",
          model: "naked_magician",
          position: [-5, 0, 0],
          movement: {
            index: {
              "0": "move_left",
              "100": "move_right",
            },
            duration: 200,
          },
          animation: {
            index: {
              "0": "idle",
              "400": "wave",
            },
            duration: 700,
          },
        },
        {
          model3d: "models/test.gltf",
          model: "dude",
          position: [0, 0, 0],
          movement: {
            index: {
              "0": "move_front",
              "200": "move_back",
            },
            duration: 400,
          },
          animation: {
            index: {
              "0": "idle",
              "300": "wave",
              "600": "idle",
            },
            duration: 900,
          },
        },
      ],
      dialogs: [
        {
          id: "33843d75-c519-4c3e-8b6e-d55e666cf6aa",
          text: "These are my friends. They are all very cool.",
          start: 200,
          duration: 500,
        },
      ],
      transitions: [
        {
          scene: "scene2",
          time: 1100,
        },
      ],
    };

    const fetchMock = jest.spyOn(global, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(sceneJson),
      } as Response);
    });
    const sceneKey = "test";
    const scene = await loadScene(sceneKey);
    expect(fetchMock).toHaveBeenCalledWith(`./scenes/${sceneKey}.json`);

    //Assert the scene has been correctly imported
    expect(scene).toBeInstanceOf(AdvancedScene);
    expect(scene.characters.length).toBe(2);
    expect(scene.dialogs.length).toBe(1);
    expect(scene.transitions.length).toBe(1);

    //Assert the characters have been correctly imported
    const character = scene.characters[0];
    expect(character).toBeInstanceOf(AnimatedCharacter);
    expect(character.model3d).toBe("models/test.gltf");
    expect(character.posX).toBe(-5);
    expect(character.posY).toBe(0);
    expect(character.posZ).toBe(0);
    expect(character.rotY).toBe(0);

    //Assert the character timesheet has been correctly imported
    const timesheet = character.timesheet;
    if (!timesheet) {
      throw new Error("Timesheet not imported");
    }

    expect(timesheet).toBeInstanceOf(Timesheet);
    expect(timesheet.movementMap.duration).toBe(200);
    expect(timesheet.movementMap.index[0]).toBe("move_left");
    expect(timesheet.movementMap.index[100]).toBe("move_right");

    expect(timesheet.animationMap.duration).toBe(700);
    expect(timesheet.animationMap.index[0]).toBe("idle");
    expect(timesheet.animationMap.index[400]).toBe("wave");

    //Assert the dialogs have been correctly imported
    const dialog = scene.dialogs[0];
    expect(dialog).toBeInstanceOf(Dialog);
    expect(dialog.id).toBe("33843d75-c519-4c3e-8b6e-d55e666cf6aa");
    expect(dialog.text).toBe("These are my friends. They are all very cool.");
    expect(dialog.start).toBe(200);
    expect(dialog.duration).toBe(500);

    //Assert the transitions have been correctly imported
    const transition = scene.transitions[0];
    expect(transition).toBeInstanceOf(Transition);
    expect(transition.scene).toBe("scene2");
    expect(transition.time).toBe(1100);

    //Assert the scene resources have been correctly imported
    const resources = scene.resources;
    expect(resources).toBeDefined();
    if (!resources) {
      throw new Error("Resources not imported");
    }
    expect(resources.audio).toEqual(["media/music.ogg"]);
    expect(resources.models3d).toEqual([
      "models/test.gltf",
      "models/scene.gltf",
    ]);

    //Assert the scene music has been correctly imported
    if (!scene.music) {
      throw new Error("Music not imported");
    }
    expect(scene.music.key).toBe("media/music.ogg");

    //Assert the scene model has been correctly imported
    if (!scene.scenario) {
      throw new Error("Scenario not imported");
    }
    expect(scene.scenario.key).toBe("models/scene.gltf");
  });

  /*it('should load the resources of a scene', async () => {
        TODO: Write this test
        const resourceManager = new ResourceManager()
        const scene = new AdvancedScene()
        scene.resources.audio = ["media/music.ogg"]
        scene.resources.models3d = ["models/test.gltf", "models/scene.gltf"]
        loadResources(resourceManager, scene)
    })*/
});
