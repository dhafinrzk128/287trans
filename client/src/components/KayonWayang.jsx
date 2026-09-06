/**
 * Ornamen kayon (gunungan) wayang untuk latar hero.
 *
 * Sumbernya artwork kayon utuh milik 287 Trans (media/kayon-sumber.jpg).
 * Latar putihnya tidak dihapus dengan pencocokan warna, melainkan dipakai
 * sebagai alpha: gambar dijadikan abu-abu lalu dibalik, sehingga garis hitam
 * jadi opaque dan latar putih jadi transparan. Pada ukiran serapat ini,
 * ambang batas keras akan merusak tepinya.
 *
 * ## Kenapa <picture> dengan media query, bukan srcset + sizes
 *
 * Versi pertama memakai `sizes` dan langsung salah di ponsel: nilainya
 * ditulis 340px padahal ornamennya benar-benar tampil selebar 756px, dan di
 * kerapatan 2x browser jadi meminta ~1.500px — sehingga ponsel mengunduh
 * berkas 760px (87 KB), bukan versi kecilnya. Ini pengulangan persis pola
 * yang sudah pernah diperbaiki untuk foto kartu katalog.
 *
 * `sizes` tidak bisa memperbaikinya, karena berapa pun angkanya akan
 * dikalikan kerapatan layar dan selalu berujung ke berkas terbesar. Maka
 * pemilihannya sekarang berdasarkan LEBAR VIEWPORT, bukan hitungan piksel:
 * ponsel selalu dapat 380px, desktop selalu dapat 760px.
 *
 * Menyajikan 380px untuk kotak yang tampil ~470px memang di bawah resolusi
 * layar. Itu disengaja: ornamen ini selalu berada di bawah opasitas 26% dan
 * di belakang scrim gelap, jadi kelembutan tepinya tidak pernah terbaca —
 * sementara di ponsel dialah satu-satunya gambar di hero (foto hero
 * `hidden lg:block`), yang membuatnya jadi elemen LCP halaman.
 *
 * ## Ukuran diatur di sini, bukan di pemanggil
 *
 * Sebelumnya tiap halaman menuliskan sendiri kelas tingginya, dan `h-[80%]`
 * pada hero ponsel yang tinggi menghasilkan ornamen selebar dua kali layar.
 * Sekarang pemanggil hanya memilih varian.
 */

// Hero tinggi dua kolom (Home, halaman koleksi) vs hero pendek satu baris
// (PageHero, Katalog, Tentang Kami, Kontak). Di ponsel keduanya diikat ke
// LEBAR, bukan tinggi — tinggi hero di ponsel ditentukan panjang teksnya,
// jadi persentase tinggi di sana tidak ada hubungannya dengan ruang yang
// benar-benar tersedia.
const UKURAN = {
  hero: "w-[122%] max-w-none lg:h-[96%] lg:w-auto",
  kompak: "w-[105%] max-w-none lg:h-[190%] lg:w-auto",
};

export default function KayonWayang({ varian = "hero", className = "", prioritas = false }) {
  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet="/kayon.webp" />
      <img
        src="/kayon-sm.webp"
        alt=""
        aria-hidden="true"
        width="380"
        height="331"
        loading={prioritas ? "eager" : "lazy"}
        // Di ponsel ornamen ini elemen LCP halaman, jadi prioritas rendah
        // justru menahan metrik yang paling diukur. Berkasnya kecil (28 KB),
        // sehingga menaikkannya tidak merebut banyak dari yang lain.
        fetchPriority={prioritas ? "high" : "auto"}
        decoding="async"
        className={`${UKURAN[varian]} ${className}`}
      />
    </picture>
  );
}
