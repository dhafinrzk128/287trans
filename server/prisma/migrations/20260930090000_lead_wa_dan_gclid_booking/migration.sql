-- AlterTable
ALTER TABLE "booking" ADD COLUMN "gclid" TEXT;
ALTER TABLE "booking" ADD COLUMN "gbraid" TEXT;
ALTER TABLE "booking" ADD COLUMN "wbraid" TEXT;
ALTER TABLE "booking" ADD COLUMN "utm_campaign" TEXT;
ALTER TABLE "booking" ADD COLUMN "closing_at" DATETIME;

-- CreateTable
CREATE TABLE "lead_wa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kode_ref" TEXT NOT NULL,
    "gclid" TEXT,
    "gbraid" TEXT,
    "wbraid" TEXT,
    "utm_source" TEXT,
    "utm_medium" TEXT,
    "utm_campaign" TEXT,
    "lokasi_tombol" TEXT,
    "nama_mobil" TEXT,
    "halaman" TEXT,
    "jumlah_klik" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'baru',
    "qualified_at" DATETIME,
    "closing_at" DATETIME,
    "nilai_closing" INTEGER,
    "catatan" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "lead_wa_kode_ref_key" ON "lead_wa"("kode_ref");

-- CreateIndex
CREATE INDEX "lead_wa_created_at_idx" ON "lead_wa"("created_at");

-- CreateIndex
CREATE INDEX "lead_wa_status_idx" ON "lead_wa"("status");
