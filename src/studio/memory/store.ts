import fs from "node:fs";
import path from "node:path";
import type { CurrentContext } from "./types";

const FILE = path.resolve(".studio/current-context.json");

export function getCurrentContext():CurrentContext|null{

if(!fs.existsSync(FILE)) return null;

return JSON.parse(fs.readFileSync(FILE,"utf8"));

}

export function setCurrentContext(data:CurrentContext){

fs.mkdirSync(path.dirname(FILE),{recursive:true});

fs.writeFileSync(FILE,JSON.stringify(data,null,2));

}