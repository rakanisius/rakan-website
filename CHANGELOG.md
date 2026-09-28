# CHANGELOG

Semua perubahan penting RAKAN Website dicatat di sini.

Format mengikuti semangat Keep a Changelog dengan penyesuaian untuk RAKAN Canon System.

---

# v3.1 — Living Foundation

Status: Release Candidate

Tanggal: 2026

Tema:
Membangun fondasi sebelum menambah fitur.

---

## Added

### Canon

- RCS-001 — RAKAN Canon System.
- RIS-001 — RAKAN Identity System.
- DRS-001 — Design Rule System.
- KMS-001 — Knowledge Map System.
- ACS-001 — Article Consolidation System.
- GWS-001 — Growth Writing System.
- WOS-001 — Writer Operating System.
- PLS-001 — Product Layer System.

### Components

- Brand.astro.
- WorldCards.astro.
- WorldStats otomatis dari knowledge.ts.
- PetaRakan sebagai entry point menuju Living Library.

### Knowledge

- Empat World resmi:
  - Tubuh
  - Otak
  - Pikiran
  - Kehidupan

- Node menjadi bagian resmi arsitektur pengetahuan.

---

## Changed

### Navigation

- Peta dihapus dari navbar.
- Entry resmi menuju Peta menjadi `/tulisan#peta`.

### Holistik

- "Tiga Ruang" berubah menjadi "Empat World".
- CTA menuju `/tulisan#peta`.
- Flow kerja diselaraskan.

### Tulisan

- Menjadi gerbang resmi Living Library.
- Struktur:
  - Hero
  - Peta
  - Edition
  - World
  - Search
  - Artikel
  - CTA

### Identity

- Brand menjadi teks "RAKAN".
- Favicon dipusatkan melalui layout.
- Head Consolidation diterapkan.

---

## Fixed

- Konsolidasi favicon.
- Perbaikan encoding UTF-8.
- Footer konsisten.
- Nav konsisten.
- Build hijau setelah konsolidasi Sacred File.

---

## Archived

- `/peta` dipertahankan sebagai halaman teknis internal.
- Public entry point tetap `/tulisan#peta`.

---

## Decision Records

### DR-0007

About menjadi halaman posisi, bukan profil.

### DR-0008

`/peta` menjadi kanvas internal Living Library.
Entry publik tetap `/tulisan#peta`.

---

## Sacred Files

- `Brand.astro`
- `Nav.astro`
- `Footer.astro`
- `BaseLayout.astro`
- `BookLayout.astro`
- `knowledge.ts`
- `articles.ts`
- `books.ts`
- `WorldCards.astro`

---

## Release Notes

v3.1 bukan akhir dari website.

Versi ini membangun fondasi agar seluruh pengembangan berikutnya memiliki bahasa, struktur, dan identitas yang konsisten.

## v3.1 Baseline Freeze (2026-09-29)

### Frozen

- Canon Registry dibekukan.
- Design Tokens menjadi sumber visual tunggal.
- RakanArticleLayout menjadi layout resmi.
- Studio Shell menjadi layout resmi Studio.
- Local Publish Agent v1.0 diverifikasi.
- Repository Baseline v3.1 ditetapkan.

### Infrastructure

- LPA /health PASS.
- LPA /status PASS.
- Repository terdeteksi.
- Build hijau.

### Next

- C3.0.2 Handshake
- C3.0.3 SSE
- C3.0.4 Job Queue
- C4 Studio Memory