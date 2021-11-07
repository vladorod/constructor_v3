import { makeAutoObservable } from "mobx";
import { RootStore } from "../RootStore";

export class LogicDialogStore {
  public visible: boolean;
  public currentIndex: number | null;

  constructor(rootStore: RootStore) {
    this.visible = false;
    this.currentIndex = null;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  show(type: boolean, currentIndex: number | null): void {
    this.currentIndex = currentIndex;
    this.visible = type;
  }

  clear(): void {
    this.currentIndex = null;
  }
}
