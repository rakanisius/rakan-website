/*
====================================================
RAKAN LIBRARY INDEX
Single Source of Truth
RDR-001
====================================================
*/

export type World =
  | "Tubuh"
  | "Otak"
  | "Pikiran"
  | "Kehidupan";

export type Category = {
  slug: string;
  title: World;
  description: string;
};

export type Article = {
  number: number;
  title: string;
  href: string;
  slug: string;
  category: World;
  world: World;
  edition: string;
  node: string;
  archive: string;
  description: string;
};

export const categories: Category[] = [
  {
    slug: "tubuh",
    title: "Tubuh",
    description: "Obat, farmasi, nutrisi, aktivitas, tidur, dan proses pemulihan.",
  },
  {
    slug: "otak",
    title: "Otak",
    description: "Tidur, memori, perhatian, dan neurosains dalam kehidupan sehari-hari.",
  },
  {
    slug: "pikiran",
    title: "Pikiran",
    description: "Emosi, stres, kebiasaan, dan perubahan yang realistis.",
  },
  {
    slug: "kehidupan",
    title: "Kehidupan",
    description: "Relasi, keluarga, pekerjaan, lingkungan, dan ruang bertumbuh.",
  },
];

export const articles: Article[] = [

  {
    number: 6,
    title: "Tubuh Tidak Pernah Bekerja Sendirian",
    href: "/tulisan/tubuh-tidak-pernah-bekerja-sendirian",
    slug: "tubuh",
    category: "Tubuh",
    world: "Tubuh",
    edition: "003",
    node: "T-001",
    archive: "T-001",
    description:
      "Tubuh tidak pernah bekerja sendirian. Ia selalu berinteraksi dengan otak, pikiran, dan kehidupan.",
  },

  {
    number: 5,
    title: "Memilih Pergi Tidak Selalu Takut",
    href: "/tulisan/memilih-pergi-tidak-selalu-takut",
    slug: "pikiran",
    category: "Pikiran",
    world: "Pikiran",
    edition: "002",
    node: "P-001",
    archive: "P-001",
    description:
      "Kadang pergi bukan bentuk menyerah, melainkan cara menjaga diri.",
  },

  {
    number: 4,
    title: "Jangan Tanya 'Kapan?' kepada Orang Lain",
    href: "/tulisan/jangan-tanya-kapan-kepada-orang-lain",
    slug: "kehidupan",
    category: "Kehidupan",
    world: "Kehidupan",
    edition: "001",
    node: "K-003",
    archive: "K-003",
    description:
      "Pertanyaan sederhana kadang menyentuh luka yang tidak terlihat.",
  },

  {
    number: 3,
    title: "Ketika Kita Merasa Lebih Tinggi dari Orang Lain",
    href: "/tulisan/ketika-kita-merasa-lebih-tinggi-dari-orang-lain",
    slug: "kehidupan",
    category: "Kehidupan",
    world: "Kehidupan",
    edition: "001",
    node: "K-002",
    archive: "K-002",
    description:
      "Refleksi tentang ego, kerendahan hati, dan cara kita memandang sesama.",
  },

  {
    number: 2,
    title: "Ketika Kekerasan Menjadi Syarat Masuk Komunitas",
    href: "/tulisan/ketika-kekerasan-menjadi-syarat-masuk-komunitas",
    slug: "kehidupan",
    category: "Kehidupan",
    world: "Kehidupan",
    edition: "000",
    node: "K-001",
    archive: "K-001",
    description:
      "Catatan tentang bagaimana kebutuhan diterima dapat berubah menjadi kekerasan.",
  },

  {
    number: 1,
    title: "Me-Ramadhan-kan Diri",
    href: "/tulisan/me-ramadhan-kan-diri",
    slug: "kehidupan",
    category: "Kehidupan",
    world: "Kehidupan",
    edition: "000",
    node: "K-000",
    archive: "K-000",
    description:
      "Refleksi tentang Ramadhan sebagai proses membentuk diri, bukan sekadar menjalankan ritual.",
  },

];