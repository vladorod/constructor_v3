export enum EAlgorithmsTypes {
  "accordion",
  "multiSelect",
  "radiobutton",
  "checkbox",
  "input",
  "button",
  "text",
}

export enum ECondition {
  "match",
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
  behavior: null | "and" | "or";
  logicBlockId: string;
  show: "show" | "hide";
  matchType: keyof typeof EMatchType;
  rules: IRules[];
  status: boolean;
}

export interface IAlgorithm {
  type: keyof typeof EAlgorithmsTypes;
  content: IContent;
  important: boolean;
  visibility: boolean;
  id: string;
}

export interface IRules {
  rulesObjectId: string;
  status: boolean;
  elementId: string;
  condition: keyof typeof ECondition;
  text: string;
  valueId: string;
}
