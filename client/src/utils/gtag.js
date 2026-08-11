export function trackWhatsAppClick() {
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: "AW-18381266296/po5DCMv5098cEPi677xE",
      currency: "IDR",
      value: 1.0,
    });
  }
}
