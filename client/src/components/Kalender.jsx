// Titik masuk chunk kalender. Jangan diimpor langsung — pakai
// KalenderTertunda, yang memuat berkas ini lewat import() setelah halaman
// selesai dimuat. react-day-picker beserta date-fns yang dibawanya ~20 KB
// gzip (bundel utama turun dari 147 ke 126 KB), padahal hanya dua halaman —
// detail mobil dan form booking — yang memakainya.
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default DayPicker;
