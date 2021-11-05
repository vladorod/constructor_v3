import { makeAutoObservable, toJS } from "mobx";
import { EAlgorithmsTypes, IAlgorithm } from "../../interfaces/algorithms";
import { RootStore } from "../RootStore";
import { Algorithm } from "./algorithm";

interface ICreateElement {
  id?: string;
  position?: "top" | "bottom";
  type: keyof typeof EAlgorithmsTypes;
  title?: string;
}

export class AlgorithmsStore {
  public AlgorithmBlocks: IAlgorithm[];

  constructor(rootStore: RootStore) {
    this.AlgorithmBlocks = [new Algorithm("multiSelect", "test", true)];
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public createElement({ id, position, type, title }: ICreateElement): void {
    const algorithm = new Algorithm(type, title ?? type, true);

    if (!id || !position) {
      this.AlgorithmBlocks.push(algorithm);
      console.log(toJS(this.AlgorithmBlocks));
      return;
    }

    const index = this.AlgorithmBlocks.findIndex(
      (algorithm) => algorithm.id === id
    );

    if (position === "top") this.AlgorithmBlocks.splice(index, 0, algorithm);

    if (position === "bottom")
      this.AlgorithmBlocks.splice(index + 1, 0, algorithm);

    console.log(toJS(this.AlgorithmBlocks));
  }
}
