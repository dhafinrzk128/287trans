-- CreateTable
CREATE TABLE "galeri_armada" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url_foto" TEXT NOT NULL,
    "judul" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

