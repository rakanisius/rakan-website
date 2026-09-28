import type {
RegistryCollection,
RegistryItem
} from "./types";

export function createRegistry<T extends RegistryItem>(
name:string,
items:T[]
):RegistryCollection<T>{

return{

name,

version:"1.0",

items:[...items].sort((a,b)=>a.order-b.order)

};

}

export function enabledItems<T extends RegistryItem>(
registry:RegistryCollection<T>
){

return registry.items.filter(item=>item.enabled);

}

export function getItem<T extends RegistryItem>(
registry:RegistryCollection<T>,
id:string
){

return registry.items.find(item=>item.id===id);

}