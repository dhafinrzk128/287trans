import { useEffect, useRef, useState } from "react";
import { toWebpUrl, varianWebpUrl } from "../utils/format";

/**
 * <img>, tapi menyajikan versi WebP untuk gambar satu-origin (foto mobil,
 * foto profil, logo) dan tetap kembali ke berkas aslinya kalau WebP-nya
 * ternyata tidak ada.
 *
 * Versi sebelumnya memasang <img> berkas asli lebih dulu, lalu mengintip
 * keberadaan .webp lewat `new Image()`, baru bertukar ke <picture>. Cara itu
 * memang aman, tapi ongkosnya mahal dan baru terlihat setelah diukur:
 * browser mengunduh KEDUANYA. Di beranda, logo saja menghabiskan 395 KB
 * (PNG) + 109 KB (WebP) — pengoptimalan yang justru membuat halaman lebih
 * berat, bukan lebih ringan.
 *
 * Sekarang <picture> dipasang sejak awal, jadi hanya satu berkas yang
 * diunduh. Yang dulu jadi alasan mengintip — <picture> tidak punya mekanisme
 * mundur kalau berkas .webp-nya 404, sebab setiap browser modern mendukung
 * *format*-nya — ditangani lewat onError pada <img>: kalau sumber terpilih
 * gagal dimuat, komponen berpindah ke <img> polos. Jalur mundur itu berarti
 * satu permintaan tambahan, tapi hanya untuk gambar yang memang bermasalah,
 * bukan untuk semua gambar seperti sebelumnya.
 */
// GIF transparan 1x1. Dipakai sebagai src <img> ketika gambarnya hanya untuk
// desktop: pada viewport sempit inilah satu-satunya yang diunduh (43 byte),
// karena <source> di atasnya tidak lolos media query.
const PIKSEL_KOSONG =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export default function SmartImage({ src, alt, onError, ukuran, minLebar, ...imgProps }) {
  const webpSrc = toWebpUrl(src);
  const adaWebp = Boolean(webpSrc) && webpSrc !== src;
  // `ukuran` = atribut sizes. Diisi oleh pemanggil yang tahu selebar apa
  // gambarnya akan tampil (lihat CarCard), bukan ditebak di sini — komponen
  // ini juga dipakai untuk hero dan logo, yang lebarnya jauh berbeda dan
  // justru butuh berkas ukuran penuh.
  //
  // Tiga kandidat, bukan dua: kotak 343px pada ponsel berkerapatan 2x butuh
  // ~690px nyata, jadi tanpa 800w browser melompat dari 480w langsung ke
  // 1200w — dan penghematannya hilang persis di perangkat yang paling butuh.
  const varian = ukuran ? varianWebpUrl(src) : null;
  const [webpGagal, setWebpGagal] = useState(false);

  const ref = useRef(null);

  // Satu komponen bisa dipakai ulang untuk gambar lain (mis. daftar mobil yang
  // difilter); tanpa ini, kegagalan gambar sebelumnya ikut terbawa.
  //
  // Pemeriksaan naturalWidth-nya bukan pengaman berlebih, melainkan jalur yang
  // justru paling sering terpakai: gambar di halaman prerender mulai dimuat
  // saat HTML dibaca, jadi kegagalannya sudah lewat sebelum React sempat
  // memasang onError. Tanpa ini, gambar yang .webp-nya hilang tampil rusak
  // dan tidak pernah mundur — cara persis foto-foto mobil dulu hilang semua.
  useEffect(() => {
    setWebpGagal(false);
    if (typeof window !== "undefined" && window.__PRERENDERING__) return;
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setWebpGagal(true);
  }, [src]);

  function tanganiGagal(ev) {
    // Saat prerendering, markup harus tetap sama persis dengan yang dihasilkan
    // hydration pada render pertamanya (lihat window.__PRERENDERING__ di
    // scripts/prerender.js). Berpindah ke <img> polos di sini akan terpotret
    // ke HTML statis, lalu tidak cocok dengan <picture> yang dirender klien —
    // persis jenis ketidakcocokan yang membuang hasil prerender.
    if (typeof window !== "undefined" && window.__PRERENDERING__) return;
    if (adaWebp && !webpGagal) setWebpGagal(true);
    onError?.(ev);
  }

  const img = <img ref={ref} src={src} alt={alt} onError={tanganiGagal} {...imgProps} />;

  if (!adaWebp || webpGagal) return img;

  const srcSet = varian
    ? `${varian.kecil} 480w, ${varian.sedang} 800w, ${webpSrc} 1200w`
    : webpSrc;

  // `minLebar` untuk gambar yang wadahnya `hidden lg:block`.
  //
  // Menyembunyikan dengan CSS TIDAK menghentikan unduhannya — `display: none`
  // hanya mengatur tampilan, bukan pengambilan berkas. Diukur di produksi,
  // foto hero 162 KB tetap terunduh di ponsel dengan fetchPriority tinggi,
  // padahal lebar tampilnya nol; di jaringan lambat, itu merebut bandwidth
  // dari CSS tepat pada jendela yang menentukan First Contentful Paint.
  //
  // Media query pada <source> dievaluasi SEBELUM pengambilan, jadi di layar
  // sempit yang diunduh hanya piksel kosong 43 byte. Gating lewat render
  // React tidak bisa dipakai di sini: keadaan awalnya harus sama dengan hasil
  // prerender (yang dirender pada lebar desktop), sehingga gambarnya sudah
  // terlanjur ada di HTML dan sudah mulai diunduh sebelum React sempat jalan.
  if (minLebar) {
    return (
      <picture>
        <source
          media={`(min-width: ${minLebar}px)`}
          srcSet={srcSet}
          sizes={varian ? ukuran : undefined}
          type="image/webp"
        />
        <img ref={ref} src={PIKSEL_KOSONG} alt={alt} onError={tanganiGagal} {...imgProps} />
      </picture>
    );
  }

  return (
    <picture>
      <source srcSet={srcSet} sizes={varian ? ukuran : undefined} type="image/webp" />
      {img}
    </picture>
  );
}
