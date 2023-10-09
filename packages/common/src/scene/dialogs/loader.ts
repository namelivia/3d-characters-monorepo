import { default as Dialog } from './dialog'

// This is how dialogs are stored in a JSON file.
export type DialogsJSON = {
  id: string;
  text: string;
  start: number;
  duration: number;
}[];

export const loadDialogs = (json: DialogsJSON): Dialog[] => {
    return json.map((dialog) => {
	    return new Dialog(dialog.id, dialog.text, dialog.start, dialog.duration)
    })
}
