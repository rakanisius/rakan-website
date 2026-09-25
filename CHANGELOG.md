# RAKAN Changelog

> Riwayat resmi pengembangan rakan.my.id

Format mengikuti prinsip **Keep a Changelog** dengan penyesuaian untuk proyek editorial.

Status: **Living Document**

---

## [1.0.0] - 2026-09

### Added

#### Website Foundation

- Struktur website dikunci.
- Halaman Beranda.
- Halaman Tentang.
- Halaman Kesehatan Holistik.
- Halaman Tulisan.
- Halaman Buku.
- Halaman Layanan.
- Halaman Kolaborasi.
- Halaman Kontak.

#### Kolaborasi

- Halaman `kolaborasi/form`.
- Halaman `kolaborasi/terima-kasih`.
- CTA utama Kolaborasi diarahkan ke formulir.
- CTA penutup diarahkan ke halaman Kontak.

#### Identity Pack

- Editorial Portrait Pack.
- Signature System.
- Brand Direction dikunci.
- Basis resmi diubah menjadi **Jakarta Selatan, Indonesia**.

#### Editorial Language

- Motif System (Tubuh, Pikiran, Kehidupan).
- Editorial Rhythm.
- UI Kit Editorial.
- Manifest Komponen RAKAN.

#### Dokumentasi Proyek

- `DECISIONS.md`
- `ROADMAP.md`
- `src/components/editorial/README.md`

---

### Changed

#### Identitas

- Nama brand dikunci menjadi **RAKAN**.
- Nama publik penulis menggunakan **Abdul Rakan**.
- Tagline resmi dikunci:

  > Mendampingi manusia memahami dirinya secara utuh.

#### Visual

- Warna utama dikunci:
  - Cream `#F7F4EE`
  - Maroon `#7A2635`
- Heading menggunakan Georgia.
- Body menggunakan Arial.

#### Halaman Kontak

- Email dijadikan kanal profesional utama.
- WhatsApp dipertahankan untuk konsultasi dan pendampingan.
- Lokasi menggunakan **Jakarta Selatan** tanpa menampilkan Google Maps.

#### Kolaborasi

- Alur diarahkan menuju formulir khusus.
- Halaman Kontak menjadi jalur komunikasi umum.

---

### Fixed

- Perbaikan CTA ganda pada halaman Kolaborasi.
- Perbaikan struktur penutupan tag pada `kolaborasi.astro`.
- Konsistensi alur:
  - `/kolaborasi`
  - `/kolaborasi/form`
  - `/kolaborasi/terima-kasih`
  - `/kontak`

---

### Locked Decisions

Keputusan berikut dianggap permanen kecuali direvisi secara eksplisit.

- Website publik dianggap stabil.
- Fitur baru dibangun melalui RAKAN Studio.
- Tiga dunia utama:
  - Tubuh
  - Pikiran
  - Kehidupan
- QuietDivider menggantikan `<hr>`.
- ArticleSignature wajib di akhir artikel.
- Motif mengikuti kategori artikel.

---

## Template Rilis Berikutnya

```md
## [1.x.x] - YYYY-MM-DD

### Added

-

### Changed

-

### Fixed

-

### Removed

-
```