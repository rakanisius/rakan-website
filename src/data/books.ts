/*
====================================================
RAKAN BOOK SYSTEM
Single Source of Truth
RBS-001
====================================================
*/

export type Book = {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  cover: string;
  quote: string;
  ebook: boolean;
  physical: "preorder" | "available";
  featured?: boolean;
};

export const books: Book[] = [
  {
    number: 3,
    slug: "tuhan-wafatkan-aku-di-usia-63-tahun",
    title: "Tuhan, Wafatkan Aku di Usia 63 Tahun!",
    subtitle: "Refleksi tentang waktu, kehidupan, dan keberanian menggunakan usia sebagai kompas.",
    description: "Buku ini lahir dari pertanyaan sederhana: jika hidup memiliki batas, bagaimana seharusnya kita menggunakannya?",
    cover: "/images/books/63-tahun.jpg",
    quote: "Usia bukan sekadar angka yang bertambah. Ia adalah amanah yang terus berkurang.",
    ebook: true,
    physical: "preorder",
    featured: true,
  },

  {
    number: 2,
    slug: "pikiran-jangan-berisik",
    title: "Pikiran, Jangan Berisik!",
    subtitle: "Tentang pikiran, emosi, dan cara berdamai dengan suara-suara di dalam kepala.",
    description: "Percakapan tentang pikiran, emosi, dan cara kita berdamai dengan suara-suara di dalam kepala.",
    cover: "/images/books/pikiran-jangan-berisik.jpg",
    quote: "Sebelum menenangkan pikiran, kita perlu memahami dari mana suaranya datang.",
    ebook: true,
    physical: "preorder",
  },

  {
    number: 1,
    slug: "ditemenin-sendiri",
    title: "Ditemenin Sendiri",
    subtitle: "Tentang belajar menjadi teman bagi diri sendiri.",
    description: "Tentang belajar menemani diri sendiri ketika kehidupan tidak selalu berjalan sesuai harapan.",
    cover: "/images/books/ditemenin-sendiri.jpg",
    quote: "Kesendirian tidak selalu meminta kita mencari seseorang. Kadang ia mengajak pulang kepada diri sendiri.",
    ebook: true,
    physical: "preorder",
  }
];