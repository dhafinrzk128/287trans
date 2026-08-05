export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const HP_REGEX = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;

export function isValidEmail(value) {
  return EMAIL_REGEX.test(value || "");
}

export function isValidHp(value) {
  return HP_REGEX.test((value || "").replace(/[\s-]/g, ""));
}

export const BAHAN_BAKAR_OPTIONS = ["Bensin", "Diesel", "Listrik", "Hybrid"];

export const STATUS_MOBIL_LABEL = {
  tersedia: "Tersedia",
  disewa: "Disewa",
  maintenance: "Maintenance",
};

export const STATUS_MOBIL_BADGE = {
  tersedia: "bg-emerald-100 text-emerald-700 border-emerald-200",
  disewa: "bg-amber-100 text-amber-700 border-amber-200",
  maintenance: "bg-red-100 text-red-700 border-red-200",
};

export const STATUS_BOOKING_LABEL = {
  menunggu_konfirmasi: "Menunggu Konfirmasi",
  dikonfirmasi: "Dikonfirmasi",
  selesai: "Selesai",
  dibatalkan: "Dibatalkan",
};

export const STATUS_BOOKING_BADGE = {
  menunggu_konfirmasi: "bg-amber-100 text-amber-700 border-amber-200",
  dikonfirmasi: "bg-sky-100 text-sky-700 border-sky-200",
  selesai: "bg-emerald-100 text-emerald-700 border-emerald-200",
  dibatalkan: "bg-red-100 text-red-700 border-red-200",
};
