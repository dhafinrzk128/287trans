import { useEffect, useState } from "react";
import { toWebpUrl } from "../utils/format";

/**
 * <img>, but upgrades to a WebP source for same-origin images (uploaded
 * car/profile photos, logo.png) once one is confirmed to exist.
 *
 * <picture>'s fallback only kicks in when the browser doesn't support a
 * source's *type* at all — every current browser supports image/webp, so
 * a <source type="image/webp"> pointing at a file that simply doesn't
 * exist (any photo uploaded before webp generation was added) renders as
 * a broken image instead of falling back to the plain <img>. So this
 * always renders the plain, real <img> first and only switches to
 * <picture> after independently probing that the .webp file loads.
 *
 * The probe is skipped during prerendering (see window.__PRERENDERING__ in
 * scripts/prerender.js) for the same reason <Reveal> and <TipeToggle> skip
 * their own DOM-dependent effects there: whichever way it resolves would
 * get baked into the static HTML, which a fresh hydration's pre-probe
 * initial render (always the plain <img>) would then mismatch against.
 */
export default function SmartImage({ src, alt, ...imgProps }) {
  const webpSrc = toWebpUrl(src);
  const [useWebp, setUseWebp] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.__PRERENDERING__) return;
    if (!webpSrc || webpSrc === src) return;
    let cancelled = false;
    const probe = new Image();
    probe.onload = () => {
      if (!cancelled) setUseWebp(true);
    };
    probe.src = webpSrc;
    return () => {
      cancelled = true;
    };
  }, [webpSrc, src]);

  const img = <img src={src} alt={alt} {...imgProps} />;

  if (!useWebp) return img;

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      {img}
    </picture>
  );
}
