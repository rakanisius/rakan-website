/*
====================================================
RAKAN KNOWLEDGE MAP SYSTEM
KMS-001

Single Source of Truth
Knowledge Registry
====================================================
*/

import { articles } from "./articles";

export type World = "Tubuh" | "Otak" | "Pikiran" | "Kehidupan";

export type Node = {
  id: string;
  world: World;
  title: string;
  description: string;
};

export type Edition = {
  id: string;
  title: string;
  description: string;
  worlds: World[];
};

/*
====================================================
KNOWLEDGE NODES
====================================================
*/

export const nodes: Node[] = [

  {
    id: "T-001",
    world: "Tubuh",
    title: "Tubuh Tidak Pernah Diam",
    description: "Tubuh terus bekerja bahkan ketika kita merasa sedang beristirahat."
  },

  {
    id: "O-001",
    world: "Otak",
    title: "Tidur",
    description: "Tidur sebagai fondasi pemulihan tubuh dan fungsi otak."
  },

  {
    id: "O-002",
    world: "Otak",
    title: "Kelelahan Mental",
    description: "Memahami kelelahan mental melalui cara kerja otak."
  },

  {
    id: "P-001",
    world: "Pikiran",
    title: "Stres",
    description: "Stres sebagai pertemuan antara tubuh, otak, pikiran, dan kehidupan."
  },

  {
    id: "P-002",
    world: "Pikiran",
    title: "Kebiasaan",
    description: "Perubahan lahir dari langkah kecil yang diulang."
  }

];

/*
====================================================
EDITIONS
====================================================
*/

export const editions: Edition[] = [

  {
    id: "001",
    title: "Fondasi Penyembuhan",
    description: "Lima bacaan awal untuk memahami hubungan tubuh, otak, pikiran, dan kebiasaan.",
    worlds: ["Tubuh","Otak","Pikiran"]
  }

];

/*
====================================================
HELPERS
====================================================
*/

export const getNode = (id:string)=>
  nodes.find(node=>node.id===id);

export const getEdition = (id:string)=>
  editions.find(edition=>edition.id===id);

export const getArticlesByNode = (nodeId:string)=>
  articles
    .filter(article=>article.node===nodeId)
    .sort((a,b)=>b.number-a.number);

export const getArticlesByEdition = (editionId:string)=>
  articles
    .filter(article=>article.edition===editionId)
    .sort((a,b)=>b.number-a.number);

export const getWorldNodes = (world:World)=>
  nodes.filter(node=>node.world===world);

/*
====================================================
RELATED ARTICLES

Mencari artikel yang memiliki dunia atau edition
yang sama dengan artikel aktif.
====================================================
*/

export const getRelatedArticles = (href:string)=>{

  const current = articles.find(article=>article.href===href);

  if(!current) return [];

  return articles

    .filter(article=>

      article.href!==href && (

        article.world===current.world ||

        article.edition===current.edition

      )

    )

    .sort((a,b)=>b.number-a.number)

    .slice(0,3);

};