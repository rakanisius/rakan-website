export interface Edition {
  id:string;
  title:string;
  library:string;
  world:"Tubuh"|"Otak"|"Pikiran"|"Kehidupan";
  description:string;
}

export const editions:Edition[]=[
{
id:"001",
title:"Tidur",
library:"Kalat Vol.01",
world:"Otak",
description:"Perjalanan memahami ritme biologis, melatonin, REM Sleep, dan bagaimana tidur membentuk cara kita berpikir."
},
{
id:"002",
title:"Stress",
library:"Kalat Vol.01",
world:"Pikiran",
description:"Respons tubuh dan pikiran terhadap tekanan."
},
{
id:"003",
title:"Nyeri",
library:"Kalat Vol.01",
world:"Tubuh",
description:"Memahami rasa sakit sebagai sinyal tubuh."
}
];
