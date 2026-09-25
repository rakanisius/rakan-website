# RAKAN Project

> Mendampingi manusia memahami dirinya secara utuh.

Status: **Website Stabil · Editorial System Aktif · Studio Planned**

---

# Tentang Proyek

**RAKAN** adalah rumah digital milik **Abdul Rakan** sebagai Praktisi Kesehatan Holistik, Apoteker, dan Penulis.

Website ini bukan sekadar blog, tetapi sebuah **Editorial House** yang menyatukan tulisan, buku, layanan, dan kolaborasi dalam satu bahasa visual yang konsisten.

**Domain:** `rakan.my.id`

**Basis:** Jakarta Selatan, Indonesia.

---

# Status Saat Ini

| Area | Status |
|------|--------|
| Website Publik | ✅ Stabil |
| Editorial Language | ✅ Aktif |
| Identity Pack | ✅ Selesai |
| Kolaborasi | ✅ Aktif |
| Press Room | 🚧 Berikutnya |
| Media Kit | 🚧 Draft |
| Cloudflare Forms | ⏳ Planned |
| RAKAN Studio | ⏳ Planned |

---

# Filosofi

RAKAN dibangun di atas tiga dunia utama.

| Dunia | Makna |
|--------|-------|
| Tubuh | Kesehatan, farmasi, penyembuhan |
| Pikiran | Refleksi, kesadaran, pembelajaran |
| Kehidupan | Makna, perjalanan, hubungan |

Ketiga dunia ini menjadi fondasi seluruh tulisan, buku, dan layanan.

---

# Identitas (Locked)

## Brand

- **RAKAN**

## Nama Publik

- **Abdul Rakan**

## Tagline

> Mendampingi manusia memahami dirinya secara utuh.

## Peran

- Praktisi Kesehatan Holistik
- Apoteker
- Penulis

---

# Visual Language

## Warna

| Nama | Kode |
|------|------|
| Cream | `#F7F4EE` |
| Maroon | `#7A2635` |
| Charcoal | `#201D19` |

## Tipografi

| Elemen | Font |
|---------|------|
| Heading | Georgia |
| Body | Arial |

## Motif

- BodyMotif → Tubuh
- MindMotif → Pikiran
- LifeMotif → Kehidupan

---

# Struktur Proyek

```text
rakan-website/
├── src/
│   ├── components/
│   │   ├── editorial/
│   │   ├── Nav.astro
│   │   └── Footer.astro
│   ├── layouts/
│   └── pages/
│
├── public/
│   ├── brand/
│   ├── press/
│   ├── media-kit/
│   └── og/
│
├── DECISIONS.md
├── ROADMAP.md
├── CHANGELOG.md
└── PROJECT.md
```

---

# Editorial Components

Folder:

```text
src/components/editorial/
```

Komponen inti:

- BodyMotif
- MindMotif
- LifeMotif
- QuietDivider
- QuoteBlock
- PullQuote
- AuthorCard
- ArticleSignature

Komponen naratif:

- ReflectionBreak

Panduan lengkap berada di:

```text
src/components/editorial/README.md
```

---

# Cara Menjalankan Proyek

## Development

```bash
npm run dev
```

Website lokal:

```
http://localhost:4321
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Deploy

```bash
npx wrangler deploy
```

---

# Aturan Pengembangan

Website publik dianggap stabil.

Prinsipnya:

- jangan mengubah identitas visual tanpa alasan kuat,
- fitur baru dibangun sebagai komponen baru,
- gunakan Editorial Language,
- hindari perubahan CSS global bila cukup memakai komponen.

---

# Workflow Menulis

Alur ideal nanti melalui RAKAN Studio.

```text
Draft
   ↓
Editor
   ↓
Preview
   ↓
Publish
```

Selama Studio belum selesai:

1. Tulis artikel.
2. Simpan di `src/pages/tulisan/`.
3. Preview.
4. Build.
5. Deploy.

---

# Roadmap Berikutnya

Prioritas pengerjaan.

## 1. Press Room

- `/press`
- `/media-kit`
- `/press-facts`

## 2. Media Kit PDF

- Portrait
- Bio
- Topik
- Kontak

## 3. Cloudflare Forms

- Inbox Kolaborasi
- Notifikasi Email

## 4. RAKAN Studio

- Dashboard
- Editor Artikel
- Tambah Buku
- Publish tanpa CMD

---

# Dokumen Penting

| Dokumen | Fungsi |
|----------|--------|
| `PROJECT.md` | Beranda proyek |
| `DECISIONS.md` | Keputusan permanen |
| `ROADMAP.md` | Peta kerja |
| `CHANGELOG.md` | Riwayat perubahan |

---

# Definisi Selesai

Sebuah fitur dianggap selesai jika:

- berfungsi,
- mengikuti Editorial Language,
- konsisten dengan identitas RAKAN,
- tidak merusak website publik.

---

# North Star

> Tujuan akhir proyek ini adalah membuat **RAKAN Studio** menjadi ruang kerja tempat Abdul Rakan dapat menulis artikel, menambahkan buku, menerima kolaborasi, dan menerbitkan konten ke `rakan.my.id` tanpa lagi bergantung pada terminal untuk pekerjaan sehari-hari.