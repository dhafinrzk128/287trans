import KayonWayang from "./KayonWayang";

export default function PageHero({ title, subtitle }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-800 to-accent-900 py-14 text-white">
      <div className="pointer-events-none absolute -top-16 right-0 h-64 w-64 rounded-full bg-accent-500/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="flex h-full items-center justify-center">
          <KayonWayang varian="kompak" prioritas className="opacity-[0.24]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/50 to-neutral-950/15" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-blue-100">{subtitle}</p>}
      </div>
    </section>
  );
}
