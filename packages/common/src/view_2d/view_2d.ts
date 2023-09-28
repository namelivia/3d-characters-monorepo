export default class View2D {
  text = "";
  visible = false;
  uiContainer: HTMLElement;

  constructor() {
    this.uiContainer = document.createElement("div");
  }

  addToDOM() {
    const threeDView = document.getElementById("3d-view");
    this.uiContainer = document.createElement("div");
    this.uiContainer.id = "2d-view";
    this.uiContainer.style.width = "100%";
    this.uiContainer.style.height = "200px";
    this.uiContainer.style.position = "absolute";
    this.uiContainer.style.top = "0";
    this.uiContainer.style.userSelect = "none";
    this.uiContainer.style.display = "block";

    if (threeDView) {
      threeDView.appendChild(this.uiContainer);
    }
  }

  addDialog = (id: string, text: string) => {
    const dialogBox = document.createElement("div");
    dialogBox.id = id;
    dialogBox.style.backgroundColor = "rgba(0, 0, 255, 0.5)";
    dialogBox.style.margin = "24px";
    dialogBox.style.height = "100%";
    dialogBox.style.borderRadius = "24px";

    const dialogText = document.createElement("p");
    dialogText.id = "dialog";
    dialogText.textContent = text;
    dialogText.style.color = "white";
    dialogText.style.position = "absolute";
    dialogText.style.left = "48px";
    dialogText.style.top = "24px";
    dialogText.textContent = text;

    dialogBox.appendChild(dialogText);
    this.uiContainer.appendChild(dialogBox);
  };

  removeDialog = (id: string) => {
    const dialogBox = document.getElementById(id);
    if (dialogBox) {
      dialogBox.remove();
    }
  };
}
