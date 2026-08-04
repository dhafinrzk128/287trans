-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_booking" (
    "id_booking" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kode_booking" TEXT NOT NULL,
    "id_mobil" INTEGER NOT NULL,
    "nama_customer" TEXT NOT NULL,
    "no_hp" TEXT NOT NULL,
    "tgl_ambil" DATETIME NOT NULL,
    "tgl_kembali" DATETIME NOT NULL,
    "estimasi_hari" INTEGER NOT NULL,
    "dengan_sopir" BOOLEAN NOT NULL DEFAULT false,
    "catatan" TEXT,
    "status_booking" TEXT NOT NULL DEFAULT 'menunggu_konfirmasi',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "booking_id_mobil_fkey" FOREIGN KEY ("id_mobil") REFERENCES "mobil" ("id_mobil") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_booking" ("catatan", "created_at", "dengan_sopir", "estimasi_hari", "id_booking", "id_mobil", "kode_booking", "nama_customer", "no_hp", "status_booking", "tgl_ambil", "tgl_kembali") SELECT "catatan", "created_at", "dengan_sopir", "estimasi_hari", "id_booking", "id_mobil", "kode_booking", "nama_customer", "no_hp", "status_booking", "tgl_ambil", "tgl_kembali" FROM "booking";
DROP TABLE "booking";
ALTER TABLE "new_booking" RENAME TO "booking";
CREATE UNIQUE INDEX "booking_kode_booking_key" ON "booking"("kode_booking");
CREATE TABLE "new_mobil" (
    "id_mobil" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_mobil" TEXT NOT NULL,
    "tipe" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL DEFAULT 2020,
    "transmisi" TEXT NOT NULL,
    "bahan_bakar" TEXT NOT NULL DEFAULT 'Bensin',
    "kapasitas" INTEGER NOT NULL,
    "harga_per_hari" INTEGER NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'tersedia',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_mobil" ("bahan_bakar", "created_at", "deskripsi", "harga_per_hari", "id_mobil", "kapasitas", "nama_mobil", "status", "tipe", "transmisi") SELECT "bahan_bakar", "created_at", "deskripsi", "harga_per_hari", "id_mobil", "kapasitas", "nama_mobil", "status", "tipe", "transmisi" FROM "mobil";
DROP TABLE "mobil";
ALTER TABLE "new_mobil" RENAME TO "mobil";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
