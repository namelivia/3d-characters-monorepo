import Dialog from "./dialog";
import View2D from "../../view_2d/view_2d";

const addDialogToViewMock = jest.fn();
const removeDialogFromViewMock = jest.fn();

jest.mock("../../view_2d/view_2d", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
      return {
        addDialog: addDialogToViewMock,
        removeDialog: removeDialogFromViewMock,
      };
    }),
  };
});

describe("Dialog", () => {
  it("Dialog should be added and removed from the 2D view", () => {
    const dialog = new Dialog(
      "33843d75-c519-4c3e-8b6e-d55e666cf6aa",
      "These are my friends. They are all very cool.",
      200,
      500
    );
    const view = new View2D();
    dialog.setView2D(view);

    //Before the dialog starts, it should not be added to the view
    dialog.update(100);
    expect(addDialogToViewMock).toHaveBeenCalledTimes(0);
    expect(removeDialogFromViewMock).toHaveBeenCalledTimes(0);

    //In the start mark should be added to the view
    dialog.update(200);
    expect(addDialogToViewMock).toHaveBeenCalledTimes(1);
    expect(removeDialogFromViewMock).toHaveBeenCalledTimes(0);

    //Should not be added more than once
    dialog.update(300);
    expect(addDialogToViewMock).toHaveBeenCalledTimes(1);
    expect(removeDialogFromViewMock).toHaveBeenCalledTimes(0);

    //When the dialog ends, it should be removed from the view
    dialog.update(700);
    expect(addDialogToViewMock).toHaveBeenCalledTimes(1);
    expect(removeDialogFromViewMock).toHaveBeenCalledTimes(1);

    //And then not be removed again
    dialog.update(1500);
    expect(addDialogToViewMock).toHaveBeenCalledTimes(1);
    expect(removeDialogFromViewMock).toHaveBeenCalledTimes(1);
  });
});
