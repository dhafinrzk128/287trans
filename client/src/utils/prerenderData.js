// Fixes the hydration mismatch documented in the Tahap 1 commit: data-fetching
// components used to always start from loading=true, which doesn't match the
// already-loaded content baked into prerendered HTML, so React discarded and
// re-rendered the mismatched subtree on every real visit (confirmed via
// Lighthouse in Tahap 8 to be the dominant cause of a 7-36 performance score
// against an 85+ target — worse on pages with more fetched content).
//
// Fix: each fetch also writes its result into a <script type="application/json">
// element in <head>, so it survives into the prerendered static HTML. On the
// next real page load, components read this element for their *initial*
// state instead of starting empty, so the first client render already
// matches what's on the page — no mismatch, no discard, no spinner flash.
// Client-side navigations (no full reload) just find no matching key and
// fall back to a normal fetch-and-loading-spinner cycle, same as before.

const STORE_ID = "__PRERENDER_DATA__";

function readStore() {
  if (typeof document === "undefined") return {};
  const el = document.getElementById(STORE_ID);
  if (!el?.textContent) return {};
  try {
    return JSON.parse(el.textContent);
  } catch {
    return {};
  }
}

export function getPrerenderedData(key) {
  return readStore()[key];
}

export function setPrerenderedData(key, value) {
  if (typeof document === "undefined") return;
  let el = document.getElementById(STORE_ID);
  if (!el) {
    el = document.createElement("script");
    el.id = STORE_ID;
    el.type = "application/json";
    document.head.appendChild(el);
  }
  const data = readStore();
  data[key] = value;
  el.textContent = JSON.stringify(data);
}
