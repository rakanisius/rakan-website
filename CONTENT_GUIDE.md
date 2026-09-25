# RAKAN — Content & Website Guide

Versi: 1.0
Status: Stable
Domain: https://rakan.my.id

---

# Filosofi

RAKAN bukan sekadar blog.

RAKAN adalah ruang editorial yang mendampingi manusia memahami tubuh, pikiran, dan kehidupan secara utuh.

Setiap halaman harus terasa tenang, sederhana, dan manusiawi.

Prinsip visual:

- Latar krem (#F7F4EE)
- Aksen marun (#7A2635)
- Georgia untuk heading
- Arial untuk isi
- Banyak ruang putih
- Nada editorial, bukan promosi berlebihan

---

# Struktur Website

## Halaman utama

- /
- /about
- /holistik
- /tulisan
- /buku
- /layanan
- /kolaborasi
- /kontak

## Halaman buku

- /buku-pikiran-jangan-berisik
- /buku-ditemenin-sendiri
- /buku-tuhan-wafatkan-aku-di-usia-63-tahun

## Halaman kategori

- tubuh-kesehatan
- pikiran-emosi
- farmasi
- holistik
- kehidupan
- catatan-praktisi

---

# Struktur Folder

src/
components/
layouts/
pages/
public/
images/
books/
og/

---

# Menambah Artikel Baru

## Langkah 1

Buat file baru di:

src/pages/tulisan/

Contoh:

```
tidur-bukan-tombol-off.astro
```

## Langkah 2

Isi metadata:

- title
- description
- category
- tanggal

## Langkah 3

Tambahkan kartu artikel ke:

src/pages/tulisan/index.astro

## Langkah 4

Tambahkan artikel ke kategori yang sesuai bila diperlukan.

## Langkah 5

Build.

```
npm run build
```

---

# Menambah Buku Baru

## Sampul

Simpan di:

public/images/books/

Format:

- JPG
- 800 px lebar
- sekitar 150 KB

## Halaman buku

Buat:

```
src/pages/buku-nama-buku.astro
```

Gunakan:

```
BookLayout
```

## Rak Buku

Tambahkan kartu buku ke:

```
src/pages/buku.astro
```

---

# Menambah Kategori

Kategori permanen:

- Tubuh & Kesehatan
- Pikiran & Emosi
- Obat & Farmasi
- Kesehatan Holistik
- Kehidupan
- Catatan Praktisi

Bila menambah kategori baru:

1. tambah folder
2. buat slug
3. update index kategori
4. update halaman tulisan

---

# Checklist Sebelum Deploy

- [ ] Build sukses
- [ ] Tidak ada 404
- [ ] Gambar tampil
- [ ] Mobile rapi
- [ ] Navbar konsisten
- [ ] Footer konsisten
- [ ] robots.txt benar
- [ ] sitemap-index.xml terbentuk

---

# Deploy

Masuk folder project.

```
cd /d D:\rakan-website
```

Build.

```
npm run build
```

Deploy.

```
npx wrangler deploy
```

Tunggu sampai muncul:

```
Uploaded
Deployed
Current Version ID
```

---

# Setelah Deploy

## Purge Cache

Cloudflare:

Caching → Purge Everything

## Hard Refresh

Windows:

Ctrl + Shift + R

---

# Google Search Console

Yang sudah dilakukan:

- Domain terverifikasi
- URL Inspection berhasil
- Sitemap masih perlu dipantau

---

# Optimasi Gambar

Target:

| Jenis | Ukuran |
|--------|---------|
| Cover buku | 120–180 KB |
| OG image | 1200×630 |
| Ilustrasi artikel | 1200 px |

---

# Open Graph (V1.1)

Semua halaman nantinya memakai:

BaseLayout.astro

Sehingga otomatis memiliki:

- og:title
- og:image
- twitter card
- canonical

---

# Changelog

## V1.0

- Website pertama selesai.
- Cloudflare aktif.
- Struktur editorial terkunci.

## V1.0.1

- Sistem kategori lengkap.
- Detail buku.
- Responsive.

## V1.0.2

- Deployment stabil.
- Sitemap.
- Audit produksi.