# Perpustakaan API

REST API untuk sistem informasi perpustakaan yang dibangun menggunakan Node.js, Express.js, dan Supabase sebagai database. Aplikasi ini digunakan untuk mengelola data buku, anggota perpustakaan, kategori status peminjaman, dan transaksi peminjaman buku. Aplikasi juga dilengkapi dashboard web untuk mempermudah pengelolaan data melalui browser.

## Fitur

1. **Product (Buku)**
   - Menampilkan daftar buku.
   - Menambahkan buku baru.
   - Mengubah informasi buku.
   - Menghapus data buku.
   - Menyimpan informasi ID, judul, penulis, kategori buku, dan stok.

2. **Customer (Anggota)**
   - Menampilkan daftar anggota.
   - Menambahkan anggota baru.
   - Mengubah data anggota.
   - Menghapus data anggota.

3. **Category (Status Peminjaman)**
   - Menampilkan daftar status peminjaman.
   - Memfilter transaksi berdasarkan status `Dipinjam`, `Dikembalikan`, dan `Terlambat`.

4. **Loan (Transaksi Peminjaman)**
   - Menampilkan daftar transaksi peminjaman.
   - Menambahkan transaksi peminjaman.
   - Mengubah data transaksi.
   - Menghapus transaksi.
   - Mencatat tanggal peminjaman, tanggal jatuh tempo, tanggal pengembalian, dan status transaksi.

5. **Dashboard Web**
   - Menampilkan data buku, anggota, dan transaksi.
   - Menambahkan dan mengelola data melalui antarmuka web.
   - Mempermudah proses pencatatan peminjaman dan pengembalian buku.

## Teknologi yang Digunakan

- Node.js
- Express.js
- Supabase
- JavaScript
- HTML, CSS, dan JavaScript
- Postman untuk pengujian API
- Git dan GitHub untuk pengelolaan kode sumber

## Struktur Proyek

```text
Perpustakaan-API/
├── src/
│   ├── config/
│   │   └── supabaseClient.js
│   ├── models/
│   │   ├── productModel.js
│   │   ├── customerModel.js
│   │   ├── categoryModel.js
│   │   └── loanModel.js
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── customerController.js
│   │   ├── categoryController.js
│   │   └── loanController.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── customerRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── loanRoutes.js
│   ├── views/
│   │   └── index.html
│   └── index.js
├── .env
├── .gitignore
├── package.json
├── vercel.json
└── README.md
```

## Persyaratan

Pastikan perangkat telah memiliki:

- Node.js dan npm.
- Akun Supabase.
- Postman untuk menguji endpoint API.

## Instalasi dan Menjalankan Aplikasi

### 1. Clone repository

```bash
git clone https://github.com/Siomayy13/Perpustakaan-API.git
cd Perpustakaan-API
```

### 2. Instal dependensi

```bash
npm install
```

### 3. Konfigurasi environment

Buat file `.env` di direktori utama proyek dan isi dengan konfigurasi Supabase:

```env
SUPABASE_URL=URL_PROYEK_SUPABASE
SUPABASE_KEY=ANON_PUBLIC_KEY_SUPABASE
```

Ganti nilai tersebut dengan URL dan anon public key dari proyek Supabase milikmu. Jangan mengunggah file `.env` atau service role key ke repository publik.

### 4. Siapkan database

Buat tabel `products` dan `customers` di Supabase SQL Editor sesuai dengan struktur yang digunakan oleh model aplikasi.

Pastikan tabel `loans` juga tersedia dengan kolom yang digunakan oleh `loanModel.js`, termasuk `book_id`, `book_title`, `member_id`, `member_name`, `loan_date`, `due_date`, `return_date`, dan `status`.

Konfigurasikan Row Level Security (RLS) dan kebijakan akses Supabase sesuai kebutuhan aplikasi. Untuk penggunaan produksi, jangan memberikan akses publik tanpa autentikasi dan pembatasan izin yang sesuai.

### 5. Jalankan server

```bash
npm run dev
```

Jika server berjalan dengan benar, API dapat diakses melalui:

```text
http://localhost:3000
```

Dashboard web dapat dibuka melalui alamat yang sama di browser.

## Endpoint API

Base URL lokal:

`http://localhost:3000`

### Product — Buku

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/products` | Menampilkan semua buku |
| POST | `/products` | Menambahkan buku |
| PUT | `/products/:id` | Mengubah data buku |
| DELETE | `/products/:id` | Menghapus buku |

### Customer — Anggota

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/customers` | Menampilkan semua anggota |
| POST | `/customers` | Menambahkan anggota |
| PUT | `/customers/:id` | Mengubah data anggota |
| DELETE | `/customers/:id` | Menghapus anggota |

### Category — Status Peminjaman

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/categories` | Menampilkan status peminjaman |
| GET | `/categories/:status` | Menampilkan transaksi berdasarkan status |

Status yang tersedia adalah `Dipinjam`, `Dikembalikan`, dan `Terlambat`.

### Loan — Transaksi Peminjaman

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/loans` | Menampilkan semua transaksi |
| GET | `/loans/:id` | Menampilkan transaksi berdasarkan ID |
| POST | `/loans` | Menambahkan transaksi peminjaman |
| PUT | `/loans/:id` | Mengubah transaksi |
| DELETE | `/loans/:id` | Menghapus transaksi |

## Pengujian API dengan Postman

1. Jalankan server menggunakan `npm run dev`.
2. Buka Postman.
3. Gunakan base URL `http://localhost:3000`.
4. Pilih method sesuai endpoint yang ingin diuji.
5. Untuk permintaan `POST` dan `PUT`, pilih **Body → raw → JSON** jika endpoint menerima data JSON.
6. Klik **Send** dan periksa respons yang diterima.

Contoh pengujian menampilkan buku:

```http
GET http://localhost:3000/products
```

Contoh data untuk menambahkan buku:

```json
{
  "id": "BK-004",
  "title": "Bumi Manusia",
  "author": "Pramoedya Ananta Toer",
  "category": "Sejarah",
  "stock": 6
}
```

## Catatan

- Nama tabel dan kolom Supabase harus sesuai dengan kode model.
- Status peminjaman yang digunakan adalah `Dipinjam`, `Dikembalikan`, dan `Terlambat`.
- Penghitungan status keterlambatan dan pembaruan stok otomatis perlu diimplementasikan secara eksplisit apabila ingin dilakukan oleh sistem.
- Untuk penggunaan produksi, tambahkan autentikasi, validasi data, serta kebijakan akses database yang aman.
