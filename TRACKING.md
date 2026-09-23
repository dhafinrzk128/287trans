# Tracking — 287 Trans

Dokumentasi conversion tracking (Google Tag Manager + Google Ads). Baca ini sebelum nambah/ubah tracking apa pun.

## Ringkasan

- Tag Manager: **Google Tag Manager**, Container ID `GTM-KJHNLFR2`
- **GTM dimuat tertunda** (lihat komentar di `client/index.html`): baru dimuat pada interaksi pertama, 4 detik setelah `load`, atau LANGSUNG kalau URL membawa `gclid`/`gbraid`/`wbraid`/`utm_*`. Event yang di-push sebelum GTM termuat tetap diproses, jadi jangan ganti ke pola yang mengandalkan GTM sudah ada saat halaman dibuka
- Container ID di-inject lewat env var `VITE_GTM_ID` (lihat `client/.env.example`), bukan hardcoded di `index.html`
- Semua event custom dikirim lewat `window.dataLayer.push(...)` — bukan `gtag()` langsung, bukan localStorage/sessionStorage
- Ada 3 event custom: `whatsapp_click`, `page_view`, dan `booking_submit`

## Event: `whatsapp_click`

Fire setiap kali tombol/link WhatsApp di halaman customer-facing diklik.

```js
{
  event: "whatsapp_click",
  button_location: "hero_button",   // string, wajib
  car_name: "Toyota Fortuner",      // opsional, cuma ada kalau konteksnya spesifik ke 1 mobil
  utm_source: "google",             // opsional, cuma ada kalau user landing dari link ber-UTM
  utm_medium: "cpc",                // opsional
  utm_campaign: "sewa_mobil_premium", // opsional
  gclid: "Cj0KCQjw..."              // opsional, cuma ada kalau landing dari klik iklan Google Ads
}
```

Detail capture UTM/gclid ada di bagian [UTM & gclid capture](#utm--gclid-capture) di bawah.

Titik yang sudah dipasangi tracking (13 tempat, semua customer-facing):

| `button_location`             | File                                                 | `car_name`? |
|---------------------------------|------------------------------------------------------|:------------:|
| `floating_button`             | `client/src/components/layout/FloatingWhatsApp.jsx` | –            |
| `footer`                      | `client/src/components/layout/Footer.jsx`           | –            |
| `hero_button`                 | `client/src/pages/Home.jsx`                         | –            |
| `about_page`                  | `client/src/pages/About.jsx`                        | –            |
| `contact_page`                | `client/src/pages/Contact.jsx`                      | –            |
| `faq_page`                    | `client/src/pages/Faq.jsx`                          | –            |
| `landing_armada`              | `client/src/pages/Armada.jsx`                       | –            |
| `cek_status_booking`          | `client/src/pages/BookingLookup.jsx`                | –            |
| `booking_status`              | `client/src/pages/BookingStatus.jsx`                | –            |
| `car_detail`                  | `client/src/pages/CarDetail.jsx`                    | ✓            |
| `booking_form`                | `client/src/pages/BookingForm.jsx`                  | ✓            |
| `koleksi_<slug>`              | `client/src/pages/KoleksiArmada.jsx` (hero)         | ✓ (model)    |
| `koleksi_<slug>_bawah`        | `client/src/pages/KoleksiArmada.jsx` (CTA bawah)    | ✓ (model)    |

**Dua yang terakhir itu pola, bukan nilai tetap.** `<slug>` diisi slug halaman
koleksi yang sedang dibuka, jadi nilainya mengikuti daftar di
`client/src/data/koleksi/{kategori,model}.js` — saat ini 12 halaman, artinya
24 nilai (`koleksi_sewa_mpv-tangerang`, `koleksi_sewa-fortuner-tangerang_bawah`,
dan seterusnya). Sengaja tidak didaftarkan satu per satu di sini: menambah
tujuan iklan baru berarti menambah nilai baru, dan tabel yang harus ikut
diperbarui setiap kali pasti akan basi. Kalau butuh memfilter di GTM atau
GA4, pakai awalan `koleksi_`.

`car_name` pada halaman koleksi **hanya diisi untuk halaman model** (Zenix,
Reborn, Fortuner, Pajero Sport) — di sana satu halaman memang membidik satu
keluarga mobil, jadi angkanya bisa dipakai membandingkan model mana yang
paling banyak memicu chat. Halaman kategori (MPV, SUV, dst.) memuat banyak
model sekaligus; mengisinya di sana akan membuat laporan seolah-olah satu
model yang bertanggung jawab atas seluruh chat kategori itu.

**Sengaja tidak ditracking:** link WhatsApp di `client/src/pages/admin/AdminBookingDetail.jsx` (staff chat ke customer yang *sudah* booking — bukan sinyal lead baru, dan halamannya di balik login admin).

## Event: `page_view` (virtual pageview)

Fire setiap kali route berubah di React Router, karena SPA tidak reload halaman jadi GTM tidak otomatis lihat "halaman baru".

```js
{
  event: "page_view",
  page_path: "/katalog",
  page_title: "287 Trans - Rental Mobil Terpercaya"
}
```

Lokasi: `client/src/components/layout/Layout.jsx`, di `useEffect` yang sama dengan scroll-to-top. Cuma jalan di halaman publik (dibungkus `<Layout>`) — **tidak** jalan di `/admin/*`, itu memang disengaja, konsisten dengan scope tracking yang fokus ke marketing funnel customer.

Belum ada Tag/Trigger di GTM yang "makan" event ini — dia cuma disiapkan di dataLayer, siap dipakai kalau nanti mau pasang GA4 atau remarketing tag.

**Catatan:** `page_title` saat ini selalu sama di semua halaman karena `document.title` memang statis (di-set sekali di `index.html`, tidak ada logic ganti judul per halaman). Ini masalah SEO, di luar scope tracking — lihat bagian "Di luar scope" kalau mau follow-up.

## Event: `booking_submit`

Fire setelah `POST /booking` sukses (bukan pas tombol submit diklik — kalau validasi gagal atau API error, event ini tidak fire). Ini konversi paling kuat yang ada, karena customer beneran ngasih nama+HP dan minta disewain mobil, bukan cuma ekspresi minat kayak klik WA.

```js
{
  event: "booking_submit",
  car_name: "Toyota Fortuner",      // opsional, cuma ada kalau ada data mobil
  utm_source: "google",             // opsional, sama seperti whatsapp_click
  utm_medium: "cpc",
  utm_campaign: "sewa_mobil_premium",
  gclid: "Cj0KCQjw..."
}
```

Lokasi: `client/src/pages/BookingForm.jsx`, di `handleSubmit`, tepat setelah `api.post("/booking", ...)` berhasil dan sebelum redirect ke halaman status.

## UTM & gclid capture

Biar bisa lacak lead WhatsApp itu asalnya dari iklan mana. Ditangkap dari `utm_source`, `utm_medium`, `utm_campaign`, `gclid` di URL pas landing.

Lokasi: `client/src/utils/utm.js` — disimpan **in-memory** (variabel level-module, dibaca sekali saat modul pertama di-import), **bukan** `sessionStorage`/`localStorage`, sesuai batasan awal project ini. Konsekuensinya: data ini hilang kalau user hard-refresh sebelum sempat klik WhatsApp — trade-off yang disengaja demi konsistensi sama aturan "no Web Storage untuk tracking".

Dipakai di 2 tempat otomatis (tidak perlu ubah apa pun di 9 titik tombol WhatsApp):

1. **`buildWaLink()`** (`client/src/utils/format.js`) — nempelin tag `[ref: ...]` ke akhir teks pesan WA:
   - Kalau ada `utm_source`: `[ref: google/cpc/nama_campaign]`
   - Kalau cuma ada `gclid` (tanpa utm_source — kejadian umum kalau cuma pakai auto-tagging Google Ads tanpa custom UTM): `[ref: gclid-8karakterpertama]` — gclid asli dipotong pendek karena aslinya bisa 80+ karakter, kepanjangan & aneh kalau muncul utuh di pesan yang dibaca customer
   - Kalau gak ada UTM/gclid sama sekali (visit organik): gak ada tag tambahan, teks pesan normal seperti biasa
2. **`trackWhatsAppClick()`** (`client/src/utils/tracking.js`) — kirim `utm_source`, `utm_medium`, `utm_campaign`, `gclid` (versi lengkap, gak dipotong) sebagai parameter tambahan di event `whatsapp_click`, kalau ada.

## Helper: `client/src/utils/tracking.js`

```js
trackWhatsAppClick(buttonLocation, carName?)
trackPageView(path, title)
trackBookingSubmit(carName?)
```

Keduanya defensif: selalu `window.dataLayer = window.dataLayer || []` dulu sebelum push, jadi tidak akan error walau GTM gagal load (ad blocker, koneksi lambat, dll).

## Cara nambah tracking ke tombol WhatsApp baru

1. Import helper-nya:
   ```js
   import { trackWhatsAppClick } from "../utils/tracking"; // sesuaikan path relatif
   ```
2. Tambah `onClick` di elemen `<a>`/`<button>`-nya:
   ```jsx
   onClick={() => trackWhatsAppClick("nama_lokasi_baru")}
   ```
3. Pilih `button_location` yang unik & deskriptif, format `snake_case`, konsisten sama yang di tabel atas.
4. Kalau konteksnya spesifik ke 1 mobil, kirim nama mobilnya juga sebagai argumen ke-2.
5. Test: buka console browser, klik tombolnya, cek `window.dataLayer` — event terakhir harus muncul dengan `button_location` yang benar.

## Cara nambah event custom lain (bukan WhatsApp)

1. Tambah fungsi baru di `client/src/utils/tracking.js`, ikuti pola yang sama (init dataLayer defensif + push dengan `event: "nama_event_baru"`).
2. Panggil dari tempat yang relevan.
3. Kalau event ini perlu nyampe ke Google Ads/GA, bikin Trigger + Tag baru di GTM — lihat checklist di bawah.

## Environment variable `VITE_GTM_ID`

- **Lokal:** `client/.env` (gitignored) → `VITE_GTM_ID=GTM-KJHNLFR2`. Kalau belum ada, copy dari `client/.env.example`.
- **Production (Railway):** buka service `client` → tab Variables → tambahkan `VITE_GTM_ID=GTM-KJHNLFR2` → redeploy. **Ini belum di-set** — sampai di-set, GTM tidak akan jalan di 287trans.id.

## Struktur GTM saat ini

Account **287 Trans** → Container **287trans.id** (`GTM-KJHNLFR2`)

- **Trigger** "Custom Event - whatsapp_click": tipe Custom Event, nama peristiwa `whatsapp_click`, fire di semua event yang cocok (tanpa syarat tambahan).
- **Tag** "Google Ads - WhatsApp Click Conversion": tipe Google Ads Conversion Tracking.
  - ID Konversi: `18381266296` — **cuma angka, tanpa prefix "AW-"**, walau Google Ads sendiri nampilinnya sebagai `AW-18381266296`. Kalau isi field ini pakai prefix "AW-", GTM akan nolak dengan error "harus berupa bilangan bulat positif atau 0".
  - Label Konversi: `po5DCMv5098cEPi677xE`
  - Nilai Konversi: `1`
  - Trigger: "Custom Event - whatsapp_click" (di atas)
  - Conversion action "Klik WhatsApp" di Google Ads: kategori Kontak, status **Utama** (Primary) — sempat Sekunder waktu awal dibikin, diubah belakangan biar bisa jadi goal campaign.
- **Trigger** "Custom Event - booking_submit": tipe Custom Event, nama peristiwa `booking_submit`.
- **Tag** "Google Ads - Booking Form Submit": tipe Google Ads Conversion Tracking.
  - ID Konversi: `18381266296` (sama, satu akun)
  - Label Konversi: `z2KlCNnP8-EcEPi677xE`
  - Nilai Konversi: `1`
  - Trigger: "Custom Event - booking_submit" (di atas)
  - Conversion action "Ajukan Booking" di Google Ads: kategori Mengirim formulir lead, status Utama dari awal dibikin.
- Dipublish sebagai **Versi 3** — kedua tag sudah diverifikasi fire beneran ke `googleadservices.com` dan `googleads.g.doubleclick.net` dengan Conversion ID & Label yang benar masing-masing.

**Catatan status "Salah dikonfigurasi":** di halaman Sasaran Google Ads, goal "Mengirim formulir lead" sempat/bisa nampilin badge status "Salah dikonfigurasi" walau sebenarnya udah jalan benar. Ini karena Google Ads coba deteksi otomatis tag di situs (mengharapkan snippet `gtag()` langsung), dan gak bisa "melihat" ke dalam setup GTM kita. Jangan percaya badge ini doang — verifikasi manual pakai cara di bagian "Cara testing" di bawah lebih akurat.

## Cara testing pakai GTM Preview mode

1. Buka [tagmanager.google.com](https://tagmanager.google.com) → pilih container `GTM-KJHNLFR2`.
2. Klik **Pratinjau** (pojok kanan atas).
3. Di Tag Assistant yang kebuka, masukin URL yang mau ditest (`http://localhost:5173` buat dev, `https://287trans.id` buat production) → Connect.
4. Situs kebuka lagi dengan koneksi debug aktif.
5. Lakuin aksinya (klik tombol WhatsApp, pindah halaman, dll).
6. Di panel Tag Assistant sebelah kiri, cek event yang masuk (`whatsapp_click`, `page_view`, dll) — klik salah satu buat lihat tag mana yang "Fired" vs "Not Fired" di panel kanan.

**Kalau Preview mode susah kebuka** (pernah kejadian pas development ini — tombol Pratinjau tidak merespons di automated browser), cara verifikasi manual tanpa Preview mode:

```js
// Cek event yang udah ke-push:
window.dataLayer

// Cek beneran ada request ke Google Ads (paling akurat):
performance.getEntriesByType('resource')
  .filter(e => e.name.includes('googleadservices') || e.name.includes('doubleclick'))
```
Kalau baris kedua menghasilkan sesuatu setelah klik tombol WhatsApp, berarti tag beneran fire — cek parameter `label=` di URL-nya harus `po5DCMv5098cEPi677xE`.

## Checklist setup manual di GTM (kalau bikin tag/trigger baru dari nol)

- [ ] Buat Trigger tipe **Custom Event**, isi "Nama peristiwa" **persis sama** dengan string `event` di `dataLayer.push` (case-sensitive)
- [ ] Buat Tag **Google Ads Conversion Tracking**, isi ID Konversi **tanpa** prefix "AW-" (angka doang), Label Konversi, Nilai Konversi
- [ ] Di bagian **Pemicuan**, attach Trigger yang tadi dibuat
- [ ] **Simpan** tag — kalau muncul error "harus berupa bilangan bulat positif atau 0" di field ID Konversi, cek lagi apakah masih ada prefix "AW-" nyangkut
- [ ] Test pakai Preview mode atau cara manual di atas
- [ ] **Kirim** (publish) — isi Nama Versi & Deskripsi Versi yang jelas biar gampang dilacak di histori
- [ ] Pastikan `VITE_GTM_ID` di environment yang dipakai (lokal/production) sama dengan Container ID yang baru dipublish

## Di luar scope (dicatat, belum dikerjain)

- `document.title` statis di semua halaman (tidak ada logic set-title per halaman) — bikin `page_title` di event `page_view` kurang berguna. ini masalah SEO, bukan tracking, sengaja tidak disentuh sesuai batasan kerja.
- Link WhatsApp di halaman admin (`AdminBookingDetail.jsx`) sengaja tidak ditracking — lihat bagian event `whatsapp_click` di atas.
- Belum ada tag GA4 (base "Tag Google") di GTM — cuma ada conversion tags, jadi belum ada gambaran funnel lengkap (bounce rate, halaman favorit, dll), cuma event yang eksplisit ditrack.
