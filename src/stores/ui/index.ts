import { RootStore } from "../RootStore";
import { DialogsStore } from "./dialogs";

export class UiStore {
  public dialogStore: DialogsStore;

  constructor(rootStore: RootStore) {
    this.dialogStore = new DialogsStore(rootStore);
  }
}
