
# REST API Peminjaman Buku Perpustakaan

REST API sederhana untuk mengelola pencatatan peminjaman
buku perpustakaan menggunakan Node.js, Express.js, dan Supabase.

## Deskripsi dan Tujuan

Proyek ini dibuat untuk memenuhi tugas responsi praktikum
Application Programming Interface (API).

API menyediakan operasi CRUD (Create, Read, Update, Delete)
untuk data peminjaman buku serta fitur filter berdasarkan
status peminjaman.

## Teknologi

- Node.js
- Express.js
- Supabase (PostgreSQL)
- Postman
- GitHub
- Vercel

## Struktur Data

Tabel yang digunakan: `loans`

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | UUID | Primary key, dibuat otomatis |
| book_id | VARCHAR(20) | ID buku |
| book_title | VARCHAR(150) | Judul buku |
| member_id | VARCHAR(20) | ID anggota |
| member_name | VARCHAR(100) | Nama anggota |
| loan_date | DATE | Tanggal peminjaman |
| due_date | DATE | Batas pengembalian |
| return_date | DATE | Tanggal pengembalian, boleh kosong |
| status | VARCHAR(20) | Status peminjaman |
| created_at | TIMESTAMPTZ | Waktu data dibuat |
| updated_at | TIMESTAMPTZ | Waktu data diperbarui |

Status yang diperbolehkan:
- Dipinjam
- Dikembalikan
- Terlambat

## Daftar Endpoint

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | /loans | Mengambil semua data |
| GET | /loans/:id | Mengambil satu data |
| POST | /loans | Menambah peminjaman |
| PUT | /loans/:id | Memperbarui peminjaman |
| DELETE | /loans/:id | Menghapus peminjaman |
| GET | /loans?status=Terlambat | Filter status |

## Contoh Request

### 1. Menambahkan peminjaman

POST /loans

```json
{
  "book_id": "BK-001",
  "book_title": "Laskar Pelangi",
  "member_id": "AG-001",
  "member_name": "Andi Pratama",
  "loan_date": "2026-10-01",
  "due_date": "2026-10-08",
  "return_date": null,
  "status": "Terlambat"
}
```

### 2. Mengambil semua data

GET /loans

### 3. Memfilter status

GET /loans?status=Terlambat

### 4. Mengubah status peminjaman

PUT /loans/:id

```json
{
  "status": "Dikembalikan",
  "return_date": "2026-10-10"
}
```

### 5. Menghapus peminjaman

DELETE /loans/:id

Ganti `:id` dengan UUID peminjaman yang valid.

## Contoh Response

Contoh respons ketika data berhasil dibuat (HTTP 201):

```json
{
  "id": "UUID_DARI_DATABASE",
  "book_id": "BK-001",
  "book_title": "Laskar Pelangi",
  "member_id": "AG-001",
  "member_name": "Andi Pratama",
  "loan_date": "2026-10-01",
  "due_date": "2026-10-08",
  "return_date": null,
  "status": "Terlambat"
}
```

Nilai UUID dan timestamp dibuat oleh database dan dapat berbeda.

## Instalasi dan Menjalankan Secara Lokal

### Prasyarat

- Node.js dan npm
- Akun Supabase
- Git

### Langkah instalasi

1. Clone repository:

   ```bash
   git clone https://github.com/USERNAME/Perpustakaan-API.git
   cd Perpustakaan-API
   ```

2. Instal dependency:

   ```bash
   npm install
   ```

3. Buat file `.env` di direktori utama:

   ```dotenv
   SUPABASE_URL=URL_SUPABASE_KAMU
   SUPABASE_KEY=KEY_SUPABASE_KAMU
   PORT=3000
   ```

4. Buat tabel `loans` pada Supabase menggunakan SQL
   yang disediakan dalam dokumentasi proyek.

5. Jalankan API:

   ```bash
   npm run dev
   ```

6. Buka endpoint:

   `http://localhost:3000/`

## Deployment

Base URL Vercel:
`ISI_URL_VERCEL_SETELAH_DEPLOYMENT`

## Pengujian

API dapat diuji menggunakan Postman dengan metode HTTP
GET, POST, PUT, dan DELETE. Data tersimpan pada Supabase.

