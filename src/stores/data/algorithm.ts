import { StringTypeAnnotation } from "@babel/types";
import { makeAutoObservable } from "mobx";
import {
  IAlgorithm,
  EAlgorithmsTypes,
  ILogicBlock,
  EMatchType,
  IRule,
  IContent,
  IContentValue,
  EShow,
  EBehavior,
  ECondition,
} from "../../interfaces/algorithms";
import { v1 as uuidv1 } from "uuid";

export class Algorithm {
  public title: string;
  public content: ContentElement;
  public visibility: boolean;
  public important: boolean;
  public type: keyof typeof EAlgorithmsTypes;
  public logicBlock: LogicBlock[];

  private _id: string;

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
    this.logicBlock = [new LogicBlock("and", "show", "all", [], false)];

    makeAutoObservable(this, {}, { autoBind: true });
  }

  addLogicBlock(
    behavior: keyof typeof EBehavior | null,
    show: keyof typeof EShow,
    matchType: keyof typeof EMatchType
  ) {
    this.logicBlock.push(new LogicBlock(behavior, show, matchType, [], false));
  }

  public get id() {
    return this._id;
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

  addValue(value: string) {
    this.value.push(new ContentElementValue(value));
  }
}

class ContentElementValue implements IContentValue {
  public item;
  private _key;

  constructor(item: string) {
    this.item = item;
    this._key = uuidv1();

    makeAutoObservable(this, {}, { autoBind: true });
  }

  get key() {
    return this._key;
  }
}

export class LogicBlock {
  private _logicBlockId;

  public behavior: keyof typeof EBehavior | null;
  public show;
  public matchType;
  public rules;
  public status;

  constructor(
    behavior: keyof typeof EBehavior | null,
    show: keyof typeof EShow,
    matchType: keyof typeof EMatchType,
    rules: Rule[],
    status: boolean
  ) {
    this.behavior = behavior;
    this._logicBlockId = uuidv1();
    this.show = show;
    this.matchType = matchType;
    this.rules = rules ?? [];
    this.status = status;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  get logicBlockId() {
    return this._logicBlockId;
  }

  deleteRule(index: number) {
    this.rules.splice(index, 1);
  }

  addRule(condition: keyof typeof ECondition, text: string, valueId: string) {
    this.rules.push(new Rule(uuidv1(), condition, text, valueId));
  }
}

class Rule implements IRule {
  private _rulesObjectId: string;

  public status: boolean;
  public elementId: string;
  public condition: keyof typeof ECondition;
  public text: string;
  public valueId: string;

  constructor(
    elementId: string,
    condition: keyof typeof ECondition,
    text: string,
    valueId: string
  ) {
    this._rulesObjectId = uuidv1();
    this.status = false;
    this.elementId = "";
    this.condition = "match";
    this.text = "";
    this.valueId = "";

    makeAutoObservable(this, {}, { autoBind: true });
  }

  get rulesObjectId() {
    return this._rulesObjectId;
  }

  updateStatus(status: boolean) {
    this.status = status;
  }

  updateElementId(id: string) {
    this.elementId = id;
  }

  updateCondition(type: keyof typeof ECondition) {
    this.condition = type;
  }

  updateText(text: string) {
    this.text = text;
  }

  updateValueId(id: string) {
    this.valueId = id;
  }
}
