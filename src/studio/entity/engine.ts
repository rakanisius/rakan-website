import type {Entity,EntityRef,EntityKind} from "./types";

export function createEntityRef(
  kind:EntityKind,
  id:string
):EntityRef{

  return{
    kind,
    id
  };

}

export function entityKey(
  ref:EntityRef
){

  return `${ref.kind}:${ref.id}`;

}

export function createEntity(
  entity:Entity
):Entity{

  return{
    ...entity,
    metadata:entity.metadata
      ?{...entity.metadata}
      :undefined
  };

}