import { useEffect, useRef, useState } from 'react'

type BackgroundVideoProps = {
  src?: string
  className?: string
  blur?: number
  playbackRate?: number
  overlayClassName?: string
  fallbackClassName?: string
}

export default function BackgroundVideo({
  src = '/assets/background-loop.mp4',
  className = 'pointer-events-none absolute inset-0 overflow-hidden',
  blur = 2,
  playbackRate = 0.5,
  overlayClassName = 'absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-black/70',
  fallbackClassName = 'absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.2),_transparent_25%),linear-gradient(135deg,_rgba(2,6,23,0.98),_rgba(15,23,42,0.9),_rgba(127,29,29,0.4))]',
}: BackgroundVideoProps) {
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate
    }
  }, [playbackRate])

  if (!src || videoError) {
    return (
      <div className={className} aria-hidden="true">
        <div className={fallbackClassName} />
        <div className={overlayClassName} />
      </div>
    )
  }

  return (
    <div className={className} aria-hidden="true">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onError={() => setVideoError(true)}
        className="absolute inset-0 h-full w-full object-cover opacity-10"
        style={{ filter: `blur(${blur}px) brightness(0.75)` }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className={overlayClassName} />
    </div>
  )
}
