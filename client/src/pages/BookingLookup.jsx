import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import FormField from "../components/ui/FormField";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function BookingLookup() {
  const navigate = useNavigate();
  const [kode, setKode] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(ev) {
    ev.preventDefault();
    const trimmed = kode.trim();
    if (!trimmed) {
      setError("Masukkan kode booking Anda.");
      return;
    }
    navigate(`/status/${encodeURIComponent(trimmed.toUpperCase())}`);
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <Search size={26} />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">Cek Status Booking</h1>
        <p className="mt-2 text-slate-600">Masukkan kode booking yang Anda terima setelah mengajukan permintaan.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)]">
        <FormField label="Kode Booking" htmlFor="kode" required error={error} hint="Contoh: BK-5UEWUD">
          <Input
            id="kode"
            value={kode}
            onChange={(e) => {
              setKode(e.target.value);
              setError("");
            }}
            error={error}
            className="font-mono uppercase"
          />
        </FormField>
        <Button type="submit" variant="accent" className="w-full">
          Cek Status
        </Button>
      </form>
    </div>
  );
}
