/**
 * Generates a WhatsApp URL to send a message to a specific phone number.
 * @param phone string (phone number in E.164 format)
 * @param message string (optional)
 * @returns URL
 */
export function getWhatsAppUrl(phone: string, message?: string): URL {
  const url = new URL('https://api.whatsapp.com/send')

  url.searchParams.append('phone', phone)
  if (message) url.searchParams.append('text', message)

  return url
}
