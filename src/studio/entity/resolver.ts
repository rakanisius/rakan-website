import {articles} from "../../data/articles";
import {books} from "../../data/books";
import {knowledge} from "../../data/knowledge";
import {Entity,EntityRef} from "./types";

export function resolveEntity(
  ref:EntityRef
):Entity|null{

  switch(ref.kind){

    case "article":{

      const item=articles.find(
        article=>article.slug===ref.id
      );

      if(!item) return null;

      return{
        kind:"article",
        id:item.slug,
        title:item.title,
        href:item.href,
        metadata:{
          category:item.category,
          edition:item.edition
        }
      };

    }

    case "book":{

      const item=books.find(
        book=>book.slug===ref.id
      );

      if(!item) return null;

      return{
        kind:"book",
        id:item.slug,
        title:item.title,
        href:item.href
      };

    }

    case "node":{

      const item=knowledge.find(
        node=>node.id===ref.id
      );

      if(!item) return null;

      return{
        kind:"node",
        id:item.id,
        title:item.title,
        metadata:{
          world:item.world
        }
      };

    }

    default:
      return null;

  }

}