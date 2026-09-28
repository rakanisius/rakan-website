import { knowledge } from "../../data/knowledge";
import type { CurrentContext } from "./types";

export function resolveContext(context:CurrentContext){

const node=knowledge.find(item=>item.id===context.id);

return{

...context,

node

};

}