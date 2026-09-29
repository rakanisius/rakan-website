import fs from "fs";
import path from "path";

const ROOT = path.resolve("src");

const EXCLUDE = [
  "pages/tulisan-arsip"
];

const REPLACE = [
  // Titik tiga
  ["â€¦","…"],

  // Bullet
  ["â€¢","•"],

  // Copyright
  ["Â©","©"],

  // Titik tengah
  ["Â·","·"],

  // Kutip melengkung
  ["â€œ","“"],
  ["â€","”"],
  ["â€˜","‘"],
  ["â€™","’"],

  // Petir
  ["âš¡","⚡"],

  // Pensil
  ["âœï¸","✍️"],

  // Infinity
  ["âˆž","∞"],

  // Download
  ["â¬‡","⬇"],

  // Panah kiri
  ["â†","←"],

  // Panah kanan
  ["â†’","→"],

  // Panah bawah
  ["â†“","↓"],

  // BOM tersisa
  ["ï»¿",""]
];

const TARGET_EXT = new Set([
  ".astro",
  ".ts",
  ".js",
  ".md"
]);

function shouldSkip(file){
  const rel = path.relative(ROOT,file).replace(/\\/g,"/");
  return EXCLUDE.some(x=>rel.startsWith(x));
}

function walk(dir){
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){

    const full = path.join(dir,entry.name);

    if(entry.isDirectory()){
      walk(full);
      continue;
    }

    if(!TARGET_EXT.has(path.extname(full))) continue;
    if(shouldSkip(full)) continue;

    let text = fs.readFileSync(full,"utf8");
    let original = text;

    for(const [from,to] of REPLACE){
      text = text.split(from).join(to);
    }

    // Peta dan About memakai icon component, jadi hilangkan simbol lama
    text = text.replace(/["']â—‰["']/g,'""');
    text = text.replace(/["']â—Ž["']/g,'""');
    text = text.replace(/["']â—Œ["']/g,'""');
    text = text.replace(/["']â—‡["']/g,'""');

    if(text!==original){
      fs.writeFileSync(full,text,"utf8");
      console.log("✓",path.relative(process.cwd(),full));
    }

  }
}

walk(ROOT);

console.log("\nEncoding cleanup selesai.");