export type EntityKind =
  | "article"
  | "book"
  | "node"
  | "edition"
  | "capture"
  | "job";

export interface EntityRef{
  kind:EntityKind;
  id:string;
}

export interface Entity{
  kind:EntityKind;
  id:string;
  title:string;
  href?:string;
  metadata?:Record<string,unknown>;
}