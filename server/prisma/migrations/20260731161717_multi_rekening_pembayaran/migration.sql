-- Add new column for multiple payment accounts (JSON array)
ALTER TABLE "company_profile" ADD COLUMN "rekening_pembayaran" TEXT NOT NULL DEFAULT '[]';

-- Migrate existing single bank account into the new JSON array column
UPDATE "company_profile"
SET "rekening_pembayaran" = '[{"bankNama":"' || replace(bank_nama, '"', '\"') || '","noRekening":"' || replace(bank_no_rek, '"', '\"') || '","atasNama":"' || replace(bank_atas_nama, '"', '\"') || '"}]'
WHERE bank_nama IS NOT NULL;

-- Drop the old single-account columns
ALTER TABLE "company_profile" DROP COLUMN "bank_nama";
ALTER TABLE "company_profile" DROP COLUMN "bank_no_rek";
ALTER TABLE "company_profile" DROP COLUMN "bank_atas_nama";
