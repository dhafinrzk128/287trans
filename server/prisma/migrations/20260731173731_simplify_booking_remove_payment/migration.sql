-- Simplify booking into a lightweight request (no on-site payment/transaction anymore)

-- Add estimasiHari with a default; historical rows keep the default (informational only)
ALTER TABLE "booking" ADD COLUMN "estimasi_hari" INTEGER NOT NULL DEFAULT 1;

-- Rename old "waiting for payment verification" status to "waiting for admin confirmation"
UPDATE "booking" SET "status_booking" = 'menunggu_konfirmasi' WHERE "status_booking" = 'menunggu_verifikasi';

-- Drop fields no longer needed now that payment/transaction happens off-site via WhatsApp
ALTER TABLE "booking" DROP COLUMN "email";
ALTER TABLE "booking" DROP COLUMN "no_ktp";
ALTER TABLE "booking" DROP COLUMN "lokasi_ambil";
ALTER TABLE "booking" DROP COLUMN "total_harga";
ALTER TABLE "booking" DROP COLUMN "bukti_transfer";

-- Drop payment account info from company profile (no longer displayed anywhere)
ALTER TABLE "company_profile" DROP COLUMN "rekening_pembayaran";
