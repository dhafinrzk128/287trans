// Impor konversi offline ke Google Ads (unggah file CSV, "Konversi dari klik").
//
// Nama konversi di bawah HARUS sama persis dengan nama conversion action di
// Google Ads (Sasaran > Konversi), termasuk huruf besar-kecil dan tanda
// kurung. Kalau salah satu nama diganti di Google Ads, ganti juga di sini.
const NAMA_KONVERSI = {
  qualified: "Lead Qualified",
  closing: "Booking Closing (Offline Import)",
};

const ZONA_WAKTU = "Asia/Jakarta";
const MATA_UANG = "IDR";

// Google Ads menolak klik yang lebih tua dari 90 hari, dan menyarankan
// menunggu sekitar sehari setelah klik sebelum mengunggah konversinya
// (klik yang terlalu baru kadang belum "terlihat" dan barisnya gagal).
const JENDELA_KLIK_HARI = 90;
const JEDA_MINIMUM_JAM = 24;

// gclid/gbraid/wbraid berisi huruf, angka, _ dan -. Dibatasi panjangnya
// supaya kolom ini tidak bisa dipakai menitip teks sembarangan.
const POLA_ID_KLIK = /^[A-Za-z0-9_-]{10,200}$/;

function bersihkanIdKlik(nilai) {
  return typeof nilai === "string" && POLA_ID_KLIK.test(nilai) ? nilai : null;
}

function bersihkanTeks(nilai, maks = 150) {
  if (typeof nilai !== "string") return null;
  const t = nilai.trim();
  return t ? t.slice(0, maks) : null;
}

// "2026-09-30 14:05:00" dalam WIB. Server Railway berjalan di UTC, jadi zona
// waktunya harus disebut eksplisit, bukan mengandalkan jam lokal mesin.
function formatWaktuGoogleAds(tanggal) {
  const bagian = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: ZONA_WAKTU,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(new Date(tanggal))
      .map((p) => [p.type, p.value])
  );
  return `${bagian.year}-${bagian.month}-${bagian.day} ${bagian.hour}:${bagian.minute}:${bagian.second}`;
}

function selCsv(nilai) {
  if (nilai === null || nilai === undefined) return "";
  const s = String(nilai);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

// baris: [{ gclid, waktuKlik, waktuKonversi, nilai? }]
// Hanya baris yang punya gclid dan masuk jendela waktu yang ikut. gbraid /
// wbraid (klik dari iPhone/Safari) tetap disimpan di basis data, tapi format
// unggah file ini hanya menerima gclid, jadi baris tanpa gclid dilewati dan
// dihitung di `dilewati`.
function susunCsv(jenis, baris, sekarang = new Date()) {
  const namaKonversi = NAMA_KONVERSI[jenis];
  const batasTerlama = sekarang.getTime() - JENDELA_KLIK_HARI * 24 * 3600 * 1000;
  const batasTerbaru = sekarang.getTime() - JEDA_MINIMUM_JAM * 3600 * 1000;

  const dipakai = [];
  const dilewati = { tanpaGclid: 0, terlaluLama: 0, terlaluBaru: 0 };

  for (const b of baris) {
    const klik = new Date(b.waktuKlik).getTime();
    if (!b.gclid) dilewati.tanpaGclid++;
    else if (klik < batasTerlama) dilewati.terlaluLama++;
    else if (klik > batasTerbaru) dilewati.terlaluBaru++;
    else dipakai.push(b);
  }

  const kepala = ["Google Click ID", "Conversion Name", "Conversion Time", "Conversion Value", "Conversion Currency"];
  const isi = dipakai.map((b) =>
    [
      b.gclid,
      namaKonversi,
      formatWaktuGoogleAds(b.waktuKonversi),
      b.nilai ?? "",
      b.nilai ? MATA_UANG : "",
    ]
      .map(selCsv)
      .join(",")
  );

  const csv = [`Parameters:TimeZone=${ZONA_WAKTU}`, kepala.join(","), ...isi].join("\n") + "\n";
  return { csv, jumlah: dipakai.length, dilewati };
}

module.exports = {
  NAMA_KONVERSI,
  bersihkanIdKlik,
  bersihkanTeks,
  formatWaktuGoogleAds,
  susunCsv,
};
