/* =====================================================
   RAKAN Data Dictionary (TR-03)
   Canon v3.1
===================================================== */

/* ---------- World ---------- */

export const WORLD_IDS = [
  "tubuh",
  "otak",
  "pikiran",
  "kehidupan"
] as const;

export type WorldId = typeof WORLD_IDS[number];

/* ---------- Core IDs ---------- */

export type NodeId = string;
export type EditionId = string;
export type ArticleSlug = string;
export type ArchiveId = NodeId;
export type ReadingTime = `${number} menit membaca`;

/* ---------- Hero ---------- */

export interface HeroData {
  image?: string;
  quote?: string;
  benangMerah?: string;
}

/* ---------- Metadata ---------- */

export interface ArticleMeta {

  slug: ArticleSlug;

  title: string;

  description: string;

  world: WorldId;

  node: NodeId;

  edition?: EditionId;

  archive: ArchiveId;

  readingTime: ReadingTime;

  hero?: HeroData;
}

export interface NodeMeta {

  id: NodeId;

  world: WorldId;

  title: string;

  summary: string;

  related: NodeId[];
}

export interface GraphEdge {

  from: NodeId;

  to: NodeId;

  relation:
    | "extends"
    | "supports"
    | "contrasts"
    | "prerequisite";
}

export interface ReadingPath {

  id: string;

  title: string;

  nodes: NodeId[];

  estimatedTime: number;
}

/* =====================================================
   Validators
===================================================== */

const NODE_REGEX = /^[TOPK]-\d{3}$/;
const EDITION_REGEX = /^\d{3}$/;
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/* ---------- World ---------- */

export function isValidWorld(value: string): value is WorldId {

  return WORLD_IDS.includes(value as WorldId);

}

/* ---------- Node ---------- */

export function isValidNodeId(value: string): value is NodeId {

  return NODE_REGEX.test(value);

}

/* ---------- Edition ---------- */

export function isValidEditionId(value: string): value is EditionId {

  return EDITION_REGEX.test(value);

}

/* ---------- Slug ---------- */

export function isValidSlug(value: string): value is ArticleSlug {

  return SLUG_REGEX.test(value);

}

/* ---------- Reading Time ---------- */

export function isValidReadingTime(value: string): value is ReadingTime {

  return /^\d+ menit membaca$/.test(value);

}

/* =====================================================
   Helpers
===================================================== */

export function createSlug(input: string): ArticleSlug {

  const slug = input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .replace(/[^a-z0-9]+/g,"-")
    .replace(/^-+|-+$/g,"")
    .replace(/-{2,}/g,"-");

  if(!isValidSlug(slug)){

    throw new Error(`Invalid slug: "${input}"`);

  }

  return slug;

}

export function createNodeId(prefix:"T"|"O"|"P"|"K",number:number):NodeId{

  const id=`${prefix}-${String(number).padStart(3,"0")}`;

  if(!isValidNodeId(id)){

    throw new Error(`Invalid NodeId: ${id}`);

  }

  return id;

}

export function createEditionId(number:number):EditionId{

  const id=String(number).padStart(3,"0");

  if(!isValidEditionId(id)){

    throw new Error(`Invalid EditionId: ${id}`);

  }

  return id;

}

/* =====================================================
   Assertions
===================================================== */

export function assertArticleMeta(article:ArticleMeta){

  if(!isValidSlug(article.slug))
    throw new Error(`Invalid slug: ${article.slug}`);

  if(!isValidWorld(article.world))
    throw new Error(`Invalid world: ${article.world}`);

  if(!isValidNodeId(article.node))
    throw new Error(`Invalid node: ${article.node}`);

  if(article.edition && !isValidEditionId(article.edition))
    throw new Error(`Invalid edition: ${article.edition}`);

  if(!isValidNodeId(article.archive))
    throw new Error(`Invalid archive: ${article.archive}`);

  if(!isValidReadingTime(article.readingTime))
    throw new Error(`Invalid reading time: ${article.readingTime}`);

  return article;
}