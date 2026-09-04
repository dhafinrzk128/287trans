/**
 * Ornamen kayon (gunungan) wayang untuk latar hero.
 *
 * Sumbernya artwork kayon utuh milik 287 Trans (media/kayon-sumber.jpg),
 * bukan potongan dari logo. Percobaan sebelumnya memotong bagian atas logo,
 * dan hasilnya kayon yang terpenggal di kaki — gapura serta penjaganya
 * hilang, padahal itu bagian yang membuatnya terbaca sebagai gunungan.
 *
 * Latar putih artwork aslinya tidak dihapus dengan pencocokan warna,
 * melainkan dipakai sebagai alpha: gambar dijadikan abu-abu lalu dibalik,
 * sehingga garis hitam jadi opaque dan latar putih jadi transparan. Pada
 * ukiran serapat ini, ambang batas keras akan merusak tepinya.
 *
 * Ongkosnya jujur: 87 KB (desktop) dan 37 KB (ponsel). Ukiran sulur yang
 * rapat mahal di kanal alpha — diuji, menurunkan kualitas maupun menambah
 * blur nyaris tidak menggeser angkanya, jadi yang tersisa hanya mengecilkan
 * dimensi. Karena itu 760px, bukan 1000px: ornamen ini tampil di bawah
 * opasitas 20%, dan pada tingkat itu ketajaman tepi tidak pernah terbaca.
 */
export default function KayonWayang({ className = "", prioritas = false }) {
  return (
    <img
      src="/kayon.webp"
      srcSet="/kayon-sm.webp 440w, /kayon.webp 760w"
      sizes="(min-width: 1024px) 700px, 340px"
      alt=""
      aria-hidden="true"
      width="760"
      height="662"
      loading={prioritas ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}
