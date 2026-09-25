export function slugify(text){

return text
.toLowerCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g,"")
.replace(/[^a-z0-9\s-]/g,"")
.trim()
.replace(/\s+/g,"-");

}

export function articleCommit(title){

return `feat: tambah artikel ${slugify(title)}`;

}

export function today(){

return new Date().toISOString().split("T")[0];

}