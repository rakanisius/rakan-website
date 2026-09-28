export type World = "Tubuh" | "Otak" | "Pikiran" | "Kehidupan";

export type Category = { slug:string; title:World; description:string; };

export type Article = { number:number; title:string; href:string; slug:string; category:World; world:World; edition:string; node:string; archive:string; description:string; };

export const categories:Category[] = [
  { slug:"tubuh", title:"Tubuh", description:"Obat, farmasi, nutrisi, aktivitas, tidur, dan proses pemulihan." },
  { slug:"otak", title:"Otak", description:"Tidur, memori, perhatian, dan neurosains dalam kehidupan sehari-hari." },
  { slug:"pikiran", title:"Pikiran", description:"Emosi, stres, kebiasaan, dan perubahan yang realistis." },
  { slug:"kehidupan", title:"Kehidupan", description:"Relasi, keluarga, pekerjaan, lingkungan, dan ruang bertumbuh." }
];

export const articles:Article[] = [
  { number:5, title:"Tubuh Tidak Pernah Benar-benar Diam", href:"/tulisan/tubuh-tidak-pernah-benar-benar-diam", slug:"tubuh", category:"Tubuh", world:"Tubuh", edition:"001", node:"T-001", archive:"T-001", description:"Tubuh terus bekerja bahkan ketika kita merasa tidak melakukan apa pun." },
  { number:4, title:"Mengapa Kita Sulit Mengubah Kebiasaan", href:"/tulisan/mengapa-kita-sulit-mengubah-kebiasaan", slug:"pikiran", category:"Pikiran", world:"Pikiran", edition:"001", node:"P-002", archive:"P-002", description:"Perubahan lebih sering lahir dari langkah kecil daripada solusi instan." },
  { number:3, title:"Stres Tidak Selalu Berasal dari Pikiran", href:"/tulisan/stres-tidak-selalu-berasal-dari-pikiran", slug:"pikiran", category:"Pikiran", world:"Pikiran", edition:"001", node:"P-001", archive:"P-001", description:"Melihat stres sebagai pertemuan antara tubuh, otak, pikiran, dan kehidupan." },
  { number:2, title:"Otak Tidak Lelah karena Berpikir", href:"/tulisan/otak-tidak-lelah-karena-berpikir", slug:"otak", category:"Otak", world:"Otak", edition:"001", node:"O-002", archive:"O-002", description:"Memahami kelelahan mental melalui cara kerja otak." },
  { number:1, title:"Tidur Bukan Sekadar Istirahat", href:"/tulisan/tidur-bukan-sekadar-istirahat", slug:"otak", category:"Otak", world:"Otak", edition:"001", node:"O-001", archive:"O-001", description:"Mengapa tidur menjadi fondasi bagi pemulihan tubuh dan fungsi otak." }
];
