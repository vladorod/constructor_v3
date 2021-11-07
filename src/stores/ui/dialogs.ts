import { makeAutoObservable } from "mobx";
import { RootStore } from "../RootStore";
import { LogicDialogStore } from "./LogicDialog";

export class DialogsStore {
  public LogicDialog: LogicDialogStore;

  constructor(rootStore: RootStore) {
    this.LogicDialog = new LogicDialogStore(rootStore);

    makeAutoObservable(this, {}, { autoBind: true });
  }
}
