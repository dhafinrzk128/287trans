import { getUtmParams } from "./utm";

export function trackWhatsAppClick(buttonLocation, carName) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "whatsapp_click",
    button_location: buttonLocation,
    ...(carName && { car_name: carName }),
    ...getUtmParams(),
  });
}

export function trackPageView(path, title) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "page_view",
    page_path: path,
    page_title: title,
  });
}
