import { toWebpUrl } from "../utils/format";

/**
 * <img>, but offers a WebP source first for same-origin images (uploaded
 * car/profile photos, logo.png) via <picture>. If no .webp sibling exists
 * on disk — e.g. photos uploaded before webp generation was added — the
 * <source> just fails to load and the browser falls through to <img>
 * automatically, so this never needs to check.
 */
export default function SmartImage({ src, alt, ...imgProps }) {
  const webpSrc = toWebpUrl(src);
  const img = <img src={src} alt={alt} {...imgProps} />;

  if (!webpSrc || webpSrc === src) return img;

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      {img}
    </picture>
  );
}
