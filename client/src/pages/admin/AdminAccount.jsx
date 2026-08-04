import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeyRound } from "lucide-react";
import api from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import FormField from "../../components/ui/FormField";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const INITIAL = { currentPassword: "", newUsername: "", newPassword: "", confirmPassword: "" };

export default function AdminAccount() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...INITIAL, newUsername: admin?.username || "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e = {};
    if (!form.currentPassword.trim()) e.currentPassword = "Password saat ini wajib diisi.";
    if (!form.newUsername.trim()) e.newUsername = "Username wajib diisi.";
    if (form.newPassword && form.newPassword.length < 6) e.newPassword = "Password baru minimal 6 karakter.";
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      e.confirmPassword = "Konfirmasi password tidak cocok.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;
    setSubmitting(true);
    try {
      await api.put("/auth/admin", {
        currentPassword: form.currentPassword,
        newUsername: form.newUsername.trim(),
        newPassword: form.newPassword || undefined,
      });
      sessionStorage.setItem("adminAuthMessage", "Akun berhasil diubah. Silakan login ulang.");
      logout();
      navigate("/admin/login");
    } catch (err) {
      setServerError(err.response?.data?.message || "Gagal mengubah akun.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">Akun Saya</h1>
      <p className="mt-1 text-slate-500">Ubah username dan/atau password login admin panel.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 max-w-md space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)]">
        {serverError && <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{serverError}</p>}

        <FormField label="Password Saat Ini" htmlFor="currentPassword" required error={errors.currentPassword} hint="Diperlukan untuk konfirmasi perubahan.">
          <Input
            id="currentPassword"
            type="password"
            value={form.currentPassword}
            onChange={(e) => update("currentPassword", e.target.value)}
            error={errors.currentPassword}
          />
        </FormField>

        <FormField label="Username Baru" htmlFor="newUsername" required error={errors.newUsername}>
          <Input id="newUsername" value={form.newUsername} onChange={(e) => update("newUsername", e.target.value)} error={errors.newUsername} />
        </FormField>

        <FormField label="Password Baru" htmlFor="newPassword" error={errors.newPassword} hint="Kosongkan jika tidak ingin mengubah password.">
          <Input
            id="newPassword"
            type="password"
            value={form.newPassword}
            onChange={(e) => update("newPassword", e.target.value)}
            error={errors.newPassword}
          />
        </FormField>

        {form.newPassword && (
          <FormField label="Konfirmasi Password Baru" htmlFor="confirmPassword" required error={errors.confirmPassword}>
            <Input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              error={errors.confirmPassword}
            />
          </FormField>
        )}

        <Button type="submit" loading={submitting}>
          <KeyRound size={16} />
          Simpan Perubahan
        </Button>
      </form>
    </div>
  );
}
