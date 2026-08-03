-- CreateTable
CREATE TABLE "mobil" (
    "id_mobil" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_mobil" TEXT NOT NULL,
    "tipe" TEXT NOT NULL,
    "transmisi" TEXT NOT NULL,
    "kapasitas" INTEGER NOT NULL,
    "harga_per_hari" INTEGER NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'tersedia',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "foto_mobil" (
    "id_foto" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_mobil" INTEGER NOT NULL,
    "url_foto" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "foto_mobil_id_mobil_fkey" FOREIGN KEY ("id_mobil") REFERENCES "mobil" ("id_mobil") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "booking" (
    "id_booking" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kode_booking" TEXT NOT NULL,
    "id_mobil" INTEGER NOT NULL,
    "nama_customer" TEXT NOT NULL,
    "no_hp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "no_ktp" TEXT NOT NULL,
    "tgl_ambil" DATETIME NOT NULL,
    "tgl_kembali" DATETIME NOT NULL,
    "lokasi_ambil" TEXT NOT NULL,
    "total_harga" INTEGER NOT NULL,
    "bukti_transfer" TEXT,
    "status_booking" TEXT NOT NULL DEFAULT 'menunggu_verifikasi',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "booking_id_mobil_fkey" FOREIGN KEY ("id_mobil") REFERENCES "mobil" ("id_mobil") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "admin" (
    "id_admin" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "company_profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "nama_perusahaan" TEXT NOT NULL DEFAULT '287 Trans',
    "deskripsi" TEXT NOT NULL,
    "keunggulan" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "maps_embed_url" TEXT,
    "telepon" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "foto_url" TEXT,
    "bank_nama" TEXT NOT NULL DEFAULT 'Bank Central Asia (BCA)',
    "bank_no_rek" TEXT NOT NULL DEFAULT '1234567890',
    "bank_atas_nama" TEXT NOT NULL DEFAULT 'PT 287 Trans Rental',
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "contact_message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subjek" TEXT,
    "pesan" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "booking_kode_booking_key" ON "booking"("kode_booking");

-- CreateIndex
CREATE UNIQUE INDEX "admin_username_key" ON "admin"("username");
