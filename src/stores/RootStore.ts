import { DataStore } from "./data";
import { UiStore } from "./ui";

export class RootStore {
  public data: DataStore;
  public ui: UiStore;

  constructor() {
    this.data = new DataStore(this);
    this.ui = new UiStore(this);
  }
}
