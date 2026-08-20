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
