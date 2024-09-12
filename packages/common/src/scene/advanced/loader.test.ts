import { loadRemoteScene as loadScene, assignResources } from "./loader";
import {
  AdvancedScene,
  LoadedAdvancedScene,
  LoadedMusic,
  LoadedScenario,
  Music,
  Scenario,
} from "./advanced";
import { Character } from "../character/character";
import { default as Dialog } from "../dialogs/dialog";
import { default as Transition } from "../transitions/transition";
import { Timesheet } from "../character/timesheet/timesheet";
import ResourceManager from "../../resource_manager/resource_manager";

// Mock SkeletonUtils used to clone the models
jest.mock("three/examples/jsm/utils/SkeletonUtils.js", () => {
  return {
    __esModule: true,
    default: {
      clone: jest.fn(),
    },
  };
});

const getModel3dMock = jest.fn().mockImplementation(() => {
  return "GLTF3DModelMock";
});
const getSongMock = jest.fn().mockImplementation(() => {
  return "AudioBufferMock";
});

// Mock the resource manager
jest.mock("../../resource_manager/resource_manager", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
      return {
        getModel3d: getModel3dMock,
        getSong: getSongMock,
      };
    }),
  };
});

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

describe("Advanced scene loader", () => {
  it("Should load a scene from a json structure", async () => {
    //When asking to load a scene, a url is passed and the json contents are fetched
    const fetchMock = jest.spyOn(global, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(sceneJson),
      } as Response);
    });
    const sceneKey = "./scenes/scene_1.json";
    const scene = await loadScene(sceneKey);
    expect(fetchMock).toHaveBeenCalledWith(sceneKey);

    //Then the scene is transformed into an AdvancedScene
    expect(scene).toBeInstanceOf(AdvancedScene);

    //It hass the correct number of scene elements
    expect(scene.characters.length).toBe(2);
    expect(scene.dialogs.length).toBe(1);
    expect(scene.transitions.length).toBe(1);

    //Dialogs are imported as instances of Dialog
    const dialog = scene.dialogs[0];
    expect(dialog).toBeInstanceOf(Dialog);
    expect(dialog.id).toBe("33843d75-c519-4c3e-8b6e-d55e666cf6aa");
    expect(dialog.text).toBe("These are my friends. They are all very cool.");
    expect(dialog.start).toBe(200);
    expect(dialog.duration).toBe(500);

    //And transitions are imported as instances of Transition
    const transition = scene.transitions[0];
    expect(transition).toBeInstanceOf(Transition);
    expect(transition.scene).toBe("scene2");
    expect(transition.time).toBe(1100);

    //The list of resources is also imported to be used by the resource manager later
    const resources = scene.resources;
    expect(resources).toBeDefined();
    expect(resources.audio).toEqual(["media/music.ogg"]);
    expect(resources.models3d).toEqual([
      "models/test.gltf",
      "models/scene.gltf",
    ]);

    //Assert the scene music has been correctly imported, but not loaded yet
    if (!scene.music) {
      throw new Error("Music not imported");
    }
    expect(scene.music).toBeInstanceOf(Music);
    expect(scene.music.key).toBe("media/music.ogg");

    //Assert the scene model has been correctly imported, but not loaded yet
    if (!scene.scenario) {
      throw new Error("Scenario not imported");
    }
    expect(scene.scenario).toBeInstanceOf(Scenario);
    expect(scene.scenario.key).toBe("models/scene.gltf");

    //Characters are imported as instances of Character, defined but not loaded yet
    const character = scene.characters[0];
    expect(character).toBeInstanceOf(Character);
    expect(character.model3d).toBe("models/test.gltf"); //The model is defined, but not loaded yet
    expect(character.posX).toBe(-5); //The initail position is the one defined in the json
    expect(character.posY).toBe(0);
    expect(character.posZ).toBe(0);
    expect(character.rotY).toBe(0);

    //The character timesheet is also imported
    const timesheet = character.timesheet;
    if (!timesheet) {
      throw new Error("Timesheet not imported");
    }

    //with the list of movements over time
    expect(timesheet).toBeInstanceOf(Timesheet);
    expect(timesheet.movementMap.duration).toBe(200);
    expect(timesheet.movementMap.index[0]).toBe("move_left");
    expect(timesheet.movementMap.index[100]).toBe("move_right");

    //and the list of animations over time
    expect(timesheet.animationMap.duration).toBe(700);
    expect(timesheet.animationMap.index[0]).toBe("idle");
    expect(timesheet.animationMap.index[400]).toBe("wave");
  });

  it("should load the resources of a scene", async () => {
    // The scene can be providen with a resource manager and it will load its resources
    const resourceManager = new ResourceManager();

    //Reusing the previous scene, we can load its resources
    jest.spyOn(global, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(sceneJson),
      } as Response);
    });
    const sceneKey = "./scenes/scene_1.json";
    const scene = await loadScene(sceneKey);

    const loadedScene = await assignResources(resourceManager, scene);
    //The resource manager is asked to provide the resources
    expect(getSongMock).toHaveBeenCalledWith("media/music.ogg");
    expect(getModel3dMock).toHaveBeenCalledWith("models/scene.gltf");
    if (!loadedScene) {
      throw new Error("Scene not loaded");
    }

    //The scene is an instance of a lodaed scene
    expect(loadedScene).toBeInstanceOf(LoadedAdvancedScene);

    //Has loaded the music audio buffer
    expect(loadedScene.music).toBeInstanceOf(LoadedMusic);
    expect(loadedScene.music.audio).toEqual("AudioBufferMock");

    //Has loaded the scenarion 3d model
    expect(loadedScene.scenario).toBeInstanceOf(LoadedScenario);
    expect(loadedScene.scenario.model).toEqual("GLTF3DModelMock");
  });
});
