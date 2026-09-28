export type RelationType =
  | "supports"
  | "extends"
  | "contrasts"
  | "related";

export interface Edge {

  from:string;

  to:string;

  type:RelationType;

  weight?:1|2|3;

  note?:string;

}