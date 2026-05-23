export const locationFallbackImages: Record<string, string> = {
  Home: '/assets/home-crime.jpg',
  Street: '/assets/street-crime.jpg',
  Alley: '/assets/alley-crime.jpg',
  Park: '/assets/park-crime.jpg',
  Highway: '/assets/highway-crime.jpg',
  Vehicle: '/assets/vehicle-crime.jpg',
  Warehouse: '/assets/warehouse-crime.jpg',
  Hotel: '/assets/hotel-crime.jpg',
  Forest: '/assets/forest-crime.jpg',
  Apartment: '/assets/apartment-crime.jpg',
  Riverfront: '/assets/riverfront-crime.jpg',
}

const genderFallbackImages: Record<string, string> = {
  Female: '/assets/female-victim-placeholder.jpg',
  Male: '/assets/male-victim-placeholder.jpg',
}

const defaultFallbackImage = '/assets/default-crime.jpg'

export function getCaseImage(caseId: string, victimGender?: string, locationType?: string) {
  const caseNumber = caseId?.split('-')[1]
  const specificImage = caseNumber ? `/assets/crime-scene-${caseNumber}.jpg` : ''

  if (specificImage) {
    return specificImage
  }

  if (victimGender && genderFallbackImages[victimGender]) {
    return genderFallbackImages[victimGender]
  }

  if (locationType && locationFallbackImages[locationType]) {
    return locationFallbackImages[locationType]
  }

  return defaultFallbackImage
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function getCasePlaceholderImage(caseId: string, title?: string) {
  const safeCaseId = escapeXml(caseId || 'CASE-0000')
  const safeTitle = escapeXml(title || 'Investigation Case')

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a" />
          <stop offset="50%" stop-color="#1e1b4b" />
          <stop offset="100%" stop-color="#7f1d1d" />
        </linearGradient>
      </defs>
      <rect width="640" height="480" rx="32" fill="url(#bg)"/>
      <circle cx="520" cy="100" r="64" fill="rgba(248,113,113,0.18)"/>
      <circle cx="92" cy="440" r="92" fill="rgba(248,113,113,0.12)"/>
      <path d="M84 320c48-78 99-98 158-92 73 7 105 56 146 62 72 10 116-18 162-58" fill="none" stroke="rgba(255,255,255,0.11)" stroke-width="3"/>
      <rect x="70" y="70" width="500" height="340" rx="28" fill="rgba(15,23,42,0.35)" stroke="rgba(248,113,113,0.35)"/>
      <text x="50%" y="43%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="28" fill="#f8fafc">${safeCaseId}</text>
      <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="18" fill="#fca5a5">${safeTitle}</text>
      <text x="50%" y="64%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="16" fill="#cbd5e1">Image unavailable — using secure placeholder</text>
    </svg>`

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}
