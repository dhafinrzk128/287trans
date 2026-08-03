-- CreateTable
CREATE TABLE "testimoni" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "kota" TEXT NOT NULL,
    "pesan" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "faq" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pertanyaan" TEXT NOT NULL,
    "jawaban" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_mobil" (
    "id_mobil" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_mobil" TEXT NOT NULL,
    "tipe" TEXT NOT NULL,
    "transmisi" TEXT NOT NULL,
    "bahan_bakar" TEXT NOT NULL DEFAULT 'Bensin',
    "kapasitas" INTEGER NOT NULL,
    "harga_per_hari" INTEGER NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'tersedia',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_mobil" ("created_at", "deskripsi", "harga_per_hari", "id_mobil", "kapasitas", "nama_mobil", "status", "tipe", "transmisi") SELECT "created_at", "deskripsi", "harga_per_hari", "id_mobil", "kapasitas", "nama_mobil", "status", "tipe", "transmisi" FROM "mobil";
DROP TABLE "mobil";
ALTER TABLE "new_mobil" RENAME TO "mobil";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
