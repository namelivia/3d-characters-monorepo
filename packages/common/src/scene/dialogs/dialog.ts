import View2D from "../../view_2d/view_2d";

class Dialog {
  id: string;
  text: string;
  start: number;
  duration: number;
  view?: View2D;

  constructor(id: string, text: string, start: number, duration: number) {
    this.id = id;
    this.text = text;
    this.start = start;
    this.duration = duration;
  }

  update(time: number) {
    if (time === this.start) {
      if (this.view) {
        this.view.addDialog(this.id, this.text);
      }
    }
    if (time === this.start + this.duration) {
      if (this.view) {
        this.view.removeDialog(this.id);
      }
    }
  }

  setView2D(view: View2D) {
    this.view = view;
  }
}

export default Dialog;
