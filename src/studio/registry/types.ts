export interface RegistryItem {

id:string;

order:number;

enabled:boolean;

metadata?:Record<string,unknown>;

}

export interface RegistryCollection<T extends RegistryItem>{

name:string;

version:string;

items:T[];

}