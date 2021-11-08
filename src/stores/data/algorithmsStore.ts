import { makeAutoObservable } from "mobx";
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
  public AlgorithmBlocks: Algorithm[];

  constructor(rootStore: RootStore) {
    this.AlgorithmBlocks = [new Algorithm("accordion", "test", true, false)];
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public createElement({ id, position, type, title }: ICreateElement): void {
    const algorithm = new Algorithm(type, title ?? type, true, true);

    if (!id || !position) {
      this.AlgorithmBlocks.push(algorithm);

      return;
    }

    const index = this.AlgorithmBlocks.findIndex(
      (algorithm) => algorithm.id === id
    );

    if (position === "top") this.AlgorithmBlocks.splice(index, 0, algorithm);

    if (position === "bottom")
      this.AlgorithmBlocks.splice(index + 1, 0, algorithm);
  }

  get lables() {
    return this.AlgorithmBlocks.map((algorithm, index) => ({
      value: algorithm.id,
      text: algorithm.content.title,
    }));
  }

  getElementById(id: string): Algorithm | undefined {
    return this.AlgorithmBlocks.find((algorithm) => algorithm.id === id);
  }
}
