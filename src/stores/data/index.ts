import { RootStore } from "../RootStore";
import { AlgorithmsStore } from "./algorithmsStore";

export class DataStore {
  public algorithms: AlgorithmsStore;

  constructor(rootStore: RootStore) {
    this.algorithms = new AlgorithmsStore(rootStore);
  }
}
