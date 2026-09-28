export interface ReadingPath{

id:string;

title:string;

slug:string;

description:string;

estimatedMinutes:number;

worlds:string[];

nodes:string[];

featured:boolean;

status:"published"|"draft";
}