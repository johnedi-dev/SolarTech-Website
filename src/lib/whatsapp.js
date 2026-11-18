// Shared WhatsApp click-to-chat helpers.
// Every chat button on the site opens BOTH numbers so no lead is missed.

export const WHATSAPP_NUMBERS = ['923015935773', '923234004898'];

export const DEFAULT_WHATSAPP_TEXT = 'Hi, I am here from the SolarTech webpage.';

export function whatsappUrl(number, text = DEFAULT_WHATSAPP_TEXT) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function openBothWhatsApp(text = DEFAULT_WHATSAPP_TEXT) {
  WHATSAPP_NUMBERS.forEach((number) => {
    window.open(whatsappUrl(number, text), '_blank');
  });
}
