export interface CaptureItem{

  id:string;

  text:string;

  createdAt:string;

  status:"inbox"|"draft"|"archived";

  suggestedWorld?:
    "tubuh"|
    "otak"|
    "pikiran"|
    "kehidupan";
}