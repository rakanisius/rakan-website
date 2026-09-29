const STORAGE="rakan-writing-draft";

const title=document.getElementById("title");
if(!title) throw new Error("Writing Workspace belum termuat.");

const category=document.getElementById("category");
const body=document.getElementById("body");

const slugEl=document.getElementById("slug");
const fileEl=document.getElementById("filename");
const readEl=document.getElementById("reading");

const previewTitle=document.getElementById("preview-title");
const badge=document.getElementById("badge");
const previewBody=document.getElementById("preview-body");

const saveButton=document.getElementById("save");

/* ---------- Status ---------- */

let status=document.createElement("div");
status.style.marginTop="10px";
status.style.fontSize="12px";
status.style.letterSpacing=".12em";
status.style.textTransform="uppercase";
status.style.color="#756653";

saveButton.parentElement.after(status);

/* ---------- Restore ---------- */

try{

const saved=sessionStorage.getItem(STORAGE);

if(saved){

const data=JSON.parse(saved);

title.value=data.title||"";
category.value=data.category||"Kehidupan";
body.value=data.body||"";

}

}catch{}

/* ---------- Helpers ---------- */

function slugify(text){

return(text||"artikel-baru")
.toLowerCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g,"")
.replace(/[^a-z0-9]+/g,"-")
.replace(/^-+|-+$/g,"")
.replace(/-{2,}/g,"-");

}

function renderMarkdown(text){

let html=text
.replace(/&/g,"&amp;")
.replace(/</g,"&lt;")
.replace(/>/g,"&gt;");

html=html.replace(/^## (.+)$/gm,"<h2>$1</h2>");
html=html.replace(/^# (.+)$/gm,"<h1>$1</h1>");
html=html.replace(/^> (.+)$/gm,"<blockquote>$1</blockquote>");

html=html.replace(/^\- (.+)$/gm,"<li>$1</li>");

html=html.replace(/(<li>.*<\/li>)/gs,"<ul>$1</ul>");

html=html.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>");
html=html.replace(/\*(.*?)\*/g,"<em>$1</em>");

const blocks=html.split(/\n{2,}/);

return blocks.map(block=>{

if(block.startsWith("<h")) return block;
if(block.startsWith("<blockquote")) return block;
if(block.startsWith("<ul")) return block;

return `<p>${block.replace(/\n/g,"<br>")}</p>`;

}).join("");

}

/* ---------- Update ---------- */

function update(){

const slug=slugify(title.value);

slugEl.textContent=slug;
fileEl.textContent=`${slug}.md`;

const words=body.value.trim().split(/\s+/).filter(Boolean).length;

readEl.textContent=`${Math.max(1,Math.ceil(words/200))} menit`;

previewTitle.textContent=title.value||"Judul artikel";
badge.textContent=category.value;
previewBody.innerHTML=renderMarkdown(body.value||"Mulai menulis.");

sessionStorage.setItem(STORAGE,JSON.stringify({

title:title.value,
category:category.value,
body:body.value

}));

status.textContent="Tersimpan barusan";

}

/* ---------- Toolbar ---------- */

function wrap(before,after=""){

const start=body.selectionStart;
const end=body.selectionEnd;

const selected=body.value.substring(start,end);

body.setRangeText(before+selected+after,start,end,"select");

update();
body.focus();

}

document.querySelectorAll("[data-before]").forEach(btn=>{

btn.addEventListener("click",()=>{

wrap(btn.dataset.before||"",btn.dataset.after||"");

});

});

/* ---------- Input ---------- */

title.addEventListener("input",update);
category.addEventListener("change",update);
body.addEventListener("input",update);

/* ---------- Save ---------- */

async function saveDraft(){

const slug=slugify(title.value);

saveButton.disabled=true;
saveButton.textContent="Menyimpan...";

try{

const res=await fetch("http://localhost:8788/draft",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

title:title.value,
category:category.value,
slug,
body:body.value,
description:body.value.split("\n").find(v=>v.trim())||""

})

});

const data=await res.json();

if(data.ok){

status.textContent=`Draft disimpan • ${slug}.md`;

}else{

status.textContent="Gagal menyimpan.";

alert(data.error);

}

}catch{

status.textContent="Studio Agent tidak aktif.";

alert("Studio Agent belum berjalan.");

}

saveButton.disabled=false;
saveButton.textContent="💾 Simpan Draft";

}

saveButton.addEventListener("click",saveDraft);

/* ---------- Shortcut ---------- */

window.addEventListener("keydown",e=>{

if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){

e.preventDefault();
saveDraft();

}

});

/* ---------- First Render ---------- */

update();