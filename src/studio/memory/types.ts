export type FocusType =
  | "article"
  | "book"
  | "capture"
  | "node";

export interface CurrentContext {

  version:string;

  focusType:FocusType;

  id:string;

  title:string;

  world?:string;

  edition?:string;

  nextAction?:string;

  updatedAt:string;

}