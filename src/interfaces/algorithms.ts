export enum EAlgorithmsTypes {
  "accordion",
  "multiSelect",
  "radiobutton",
  "checkbox",
  "input",
  "button",
  "text",
}

export enum EShow {
  "show",
  "hide",
}

export enum ECondition {
  "match",
}

export enum EBehavior {
  "and",
  "or",
}

export enum EMatchType {
  "all",
  "any",
  "none",
}

export interface IContentValue {
  item: string;
  key: string;
}

export interface IContent {
  title: string;
  color: string;
  value: IContentValue[];
}

export interface ILogicBlock {
  behavior: keyof typeof EBehavior | null;
  logicBlockId: string;
  show: keyof typeof EShow;
  matchType: keyof typeof EMatchType;
  rules: IRule[];
  status: boolean;
}

export interface IAlgorithm {
  type: keyof typeof EAlgorithmsTypes;
  content: IContent;
  important: boolean;
  visibility: boolean;
  id: string;
}

export interface IRule {
  rulesObjectId: string;
  status: boolean;
  elementId: string;
  condition: keyof typeof ECondition;
  text: string;
  valueId: string;
}
