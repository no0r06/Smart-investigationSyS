import logo from '../assets/download (5).jpg'
import spotlight from '../assets/download (6).jpg'
import analysisBg from '../assets/download (8).jpg'
import criticalFallback from '../assets/One student dead, 10 injured after shooting at….jpg'

export const assetImages = {
  logo,
  spotlight,
  analysisBg,
  criticalFallback,
  cinematicBg: '/assets/surveillance-loop.gif',
  defaultCrime: spotlight,
}

export const getSeverityImage = (severity: string) => {
  switch (severity) {
    case 'Critical':
      return assetImages.criticalFallback
    case 'High':
      return assetImages.defaultCrime
    default:
      return assetImages.spotlight
  }
}

export const withFallback = (src: string, fallbackSrc = assetImages.analysisBg) => src || fallbackSrc

export const safeImageProps = (src: string, fallbackSrc = assetImages.analysisBg) => ({
  src,
  onError: (event: Event) => {
    const target = event.currentTarget as HTMLImageElement
    target.src = fallbackSrc
  },
})
