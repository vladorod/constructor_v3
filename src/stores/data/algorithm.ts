import { StringTypeAnnotation } from "@babel/types";
import { makeAutoObservable } from "mobx";
import {
  IAlgorithm,
  EAlgorithmsTypes,
  ILogicBlock,
  EMatchType,
  IRules,
  IContent,
  IContentValue,
} from "../../interfaces/algorithms";
import { v1 as uuidv1 } from "uuid";

export class Algorithm implements IAlgorithm {
  public title;
  public content;
  public visibility;
  public important;
  public type;

  private _id: string;
  private _logicBlock: ILogicBlock[];

  constructor(
    type: keyof typeof EAlgorithmsTypes,
    title: string,
    visibility: boolean
  ) {
    this._id = uuidv1();
    this.important = false;
    this.title = title;
    this.type = type;
    this.content = new ContentElement(title, "");
    this.visibility = visibility;
    this._logicBlock = [
      new LogicBlock("and", "123123", "show", "all", [], false),
    ];
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public get id() {
    return this._id;
  }

  public get logicBlock() {
    return this._logicBlock;
  }
}

class ContentElement implements IContent {
  public title;
  public color;
  public value;

  constructor(title: string, color: string) {
    this.title = title;
    this.color = color;
    this.value = [new ContentElementValue("123")];
  }
}

class ContentElementValue implements IContentValue {
  public item;
  private _key;

  constructor(item: string) {
    this.item = item;
    this._key = uuidv1();
  }

  get key() {
    return this._key;
  }
}

class LogicBlock implements ILogicBlock {
  public behavior;
  public logicBlockId;
  public show;
  public matchType;
  public rules;
  public status;

  constructor(
    behavior: null | "and" | "or",
    logicBlockId: string,
    show: "show" | "hide",
    matchType: keyof typeof EMatchType,
    rules: IRules[],
    status: boolean
  ) {
    this.behavior = behavior;
    this.logicBlockId = logicBlockId;
    this.show = show;
    this.matchType = matchType;
    this.rules = rules;
    this.status = status;
  }
}
