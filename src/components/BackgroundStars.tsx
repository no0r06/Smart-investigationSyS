import { useEffect, useState } from 'react'

type Star = {
  id: number
  left: string
  top: string
  size: string
  duration: string
  delay: string
  direction: 'up' | 'down'
  opacity: number
}

const starCount = 72

export default function BackgroundStars() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const nextStars: Star[] = Array.from({ length: starCount }, (_, index) => {
      const direction = Math.random() > 0.5 ? 'up' : 'down'
      const size = Math.random() * 4 + 1
      const opacity = Number((Math.random() * 0.4 + 0.18).toFixed(2))

      return {
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${size}px`,
        duration: `${Math.random() * 18 + 22}s`,
        delay: `${Math.random() * 8}s`,
        direction,
        opacity,
      }
    })

    setStars(nextStars)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star ${star.direction === 'up' ? 'star-up' : 'star-down'}`}
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDuration: star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  )
}
