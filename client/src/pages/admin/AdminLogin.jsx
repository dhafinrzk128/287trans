import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import FormField from "../../components/ui/FormField";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Username dan password wajib diisi.");
      return;
    }
    setSubmitting(true);
    try {
      await login(username, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal. Periksa kembali username dan password Anda.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 px-4">
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-[var(--shadow-soft-lg)]">
        <div className="flex flex-col items-center text-center">
          <img src="/logo.png" alt="287 Trans" className="h-14 w-auto" />
          <h1 className="mt-4 text-xl font-extrabold text-slate-900">Admin Panel</h1>
          <p className="mt-1 text-sm text-slate-500">Masuk untuk mengelola booking dan armada mobil.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          {error && <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>}
          <FormField label="Username" htmlFor="username">
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
          </FormField>
          <FormField label="Password" htmlFor="password">
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormField>
          <Button type="submit" size="lg" loading={submitting} className="w-full">
            <Lock size={16} />
            Masuk
          </Button>
        </form>
      </div>
    </div>
  );
}
