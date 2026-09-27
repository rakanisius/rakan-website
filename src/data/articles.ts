/*
====================================================
RAKAN LIBRARY INDEX
Single Source of Truth
RDR-001
====================================================

Aturan:

1. Semua artikel didaftarkan DI SINI.
2. Jangan update index.astro lagi.
3. Jangan update kategori lagi.
4. Search otomatis membaca file ini.
5. Peta RAKAN nanti membaca file ini.

Urutan artikel:
001
002
003
...

Knowledge Node:
T-001 = Tubuh
O-001 = Otak
P-001 = Pikiran
K-001 = Kehidupan
*/

export type World =
  | "Tubuh"
  | "Otak"
  | "Pikiran"
  | "Kehidupan";

export type Category = {
  slug:string;
  title:World;
  description:string;
};

export type Article = {
  number:number;
  title:string;
  href:string;
  slug:string;
  category:World;
  world:World;
  edition:string;
  node:string;
  archive:string;
  description:string;
};

export const categories:Category[]=[

  {
    slug:"tubuh",
    title:"Tubuh",
    description:"Obat, farmasi, nutrisi, aktivitas, tidur, dan proses pemulihan."
  },

  {
    slug:"otak",
    title:"Otak",
    description:"Tidur, memori, perhatian, dan neurosains dalam kehidupan sehari-hari."
  },

  {
    slug:"pikiran",
    title:"Pikiran",
    description:"Emosi, stres, kebiasaan, dan perubahan yang realistis."
  },

  {
    slug:"kehidupan",
    title:"Kehidupan",
    description:"Relasi, keluarga, pekerjaan, lingkungan, dan ruang bertumbuh."
  }

];

/*
====================================================
ARTICLES
====================================================

Cara menambah artikel:

{
  number:7,
  title:"Judul",
  href:"/tulisan/nama-slug",
  slug:"otak",
  category:"Otak",
  world:"Otak",
  edition:"001",
  node:"O-007",
  archive:"O-007",
  description:"Ringkasan."
}

Lalu build.
*/

export const articles:Article[]=[

  {
    number:6,
    title:"Otak Tidak Lelah karena Berpikir",
    href:"/tulisan/otak-tidak-lelah-karena-berpikir",
    slug:"otak",
    category:"Otak",
    world:"Otak",
    edition:"001",
    node:"O-001",
    archive:"O-001",
    description:"Memahami kelelahan mental melalui cara kerja otak, bukan sekadar rasa capek."
  },

  {
    number:5,
    title:"Stres Tidak Selalu Berasal dari Pikiran",
    href:"/tulisan/stres-tidak-selalu-berasal-dari-pikiran",
    slug:"pikiran",
    category:"Pikiran",
    world:"Pikiran",
    edition:"002",
    node:"P-001",
    archive:"P-001",
    description:"Melihat stres sebagai pertemuan antara tubuh, otak, pikiran, dan kehidupan."
  },

  {
    number:4,
    title:"Tidur Bukan Sekadar Istirahat",
    href:"/tulisan/tidur-bukan-sekadar-istirahat",
    slug:"otak",
    category:"Otak",
    world:"Otak",
    edition:"001",
    node:"O-002",
    archive:"O-002",
    description:"Mengapa tidur adalah fondasi bagi pemulihan tubuh dan fungsi otak."
  },

  {
    number:3,
    title:"Ketika Kekerasan Menjadi Syarat Masuk Komunitas",
    href:"/tulisan/ketika-kekerasan-menjadi-syarat-masuk-komunitas",
    slug:"kehidupan",
    category:"Kehidupan",
    world:"Kehidupan",
    edition:"000",
    node:"K-001",
    archive:"K-001",
    description:"Catatan tentang bagaimana kebutuhan diterima dalam kelompok dapat berubah menjadi kekerasan."
  },

  {
    number:2,
    title:"Mengapa Kita Sulit Mengubah Kebiasaan",
    href:"/tulisan/mengapa-kita-sulit-mengubah-kebiasaan",
    slug:"pikiran",
    category:"Pikiran",
    world:"Pikiran",
    edition:"002",
    node:"P-002",
    archive:"P-002",
    description:"Perubahan lebih sering lahir dari langkah kecil daripada solusi instan."
  },

  {
    number:1,
    title:"Tubuh Tidak Pernah Benar-Benar Diam",
    href:"/tulisan/tubuh-tidak-pernah-benar-benar-diam",
    slug:"tubuh",
    category:"Tubuh",
    world:"Tubuh",
    edition:"003",
    node:"T-001",
    archive:"T-001",
    description:"Tubuh terus bekerja bahkan ketika kita merasa tidak sedang melakukan apa pun."
  }

];