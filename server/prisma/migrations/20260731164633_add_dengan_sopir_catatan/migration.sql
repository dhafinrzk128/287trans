-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_booking" (
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
    "dengan_sopir" BOOLEAN NOT NULL DEFAULT false,
    "catatan" TEXT,
    "total_harga" INTEGER NOT NULL,
    "bukti_transfer" TEXT,
    "status_booking" TEXT NOT NULL DEFAULT 'menunggu_verifikasi',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "booking_id_mobil_fkey" FOREIGN KEY ("id_mobil") REFERENCES "mobil" ("id_mobil") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_booking" ("bukti_transfer", "created_at", "email", "id_booking", "id_mobil", "kode_booking", "lokasi_ambil", "nama_customer", "no_hp", "no_ktp", "status_booking", "tgl_ambil", "tgl_kembali", "total_harga") SELECT "bukti_transfer", "created_at", "email", "id_booking", "id_mobil", "kode_booking", "lokasi_ambil", "nama_customer", "no_hp", "no_ktp", "status_booking", "tgl_ambil", "tgl_kembali", "total_harga" FROM "booking";
DROP TABLE "booking";
ALTER TABLE "new_booking" RENAME TO "booking";
CREATE UNIQUE INDEX "booking_kode_booking_key" ON "booking"("kode_booking");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
