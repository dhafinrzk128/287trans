const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "gclid"];

const params = new URLSearchParams(window.location.search);
const utmData = {};
UTM_KEYS.forEach((key) => {
  const value = params.get(key);
  if (value) utmData[key] = value;
});

export function getUtmParams() {
  return utmData;
}

export function buildUtmRefTag() {
  const { utm_source, utm_medium, utm_campaign, gclid } = utmData;
  if (utm_source) {
    return `[ref: ${[utm_source, utm_medium, utm_campaign].filter(Boolean).join("/")}]`;
  }
  if (gclid) {
    return `[ref: gclid-${gclid.slice(0, 8)}]`;
  }
  return "";
}
