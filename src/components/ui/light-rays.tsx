"use client"

import { useEffect, useState, type CSSProperties } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

interface LightRaysProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
  count?: number
  color?: string
  blur?: number
  opacity?: number
  speed?: number
  length?: string
  width?: number
  direction?: "top" | "bottom" | "both"
  ambientGlow?: number
}

type LightRay = {
  id: string
  left: number
  rotate: number
  width: number
  swing: number
  delay: number
  duration: number
  intensity: number
}

const createRays = (count: number, cycle: number, maxOpacity: number, baseWidth: number): LightRay[] => {
  if (count <= 0) return []

  return Array.from({ length: count }, (_, index) => {
    const left = 8 + Math.random() * 84
    const rotate = -28 + Math.random() * 56
    const width = baseWidth * (0.5 + Math.random() * 0.5)
    const swing = 0.8 + Math.random() * 1.8
    const delay = Math.random() * cycle
    const duration = cycle * (0.75 + Math.random() * 0.5)
    const intensity = maxOpacity * (0.6 + Math.random() * 0.4)

    return {
      id: `${index}-${Math.round(left * 10)}`,
      left,
      rotate,
      width,
      swing,
      delay,
      duration,
      intensity,
    }
  })
}

const Ray = ({
  left,
  rotate,
  width,
  swing,
  delay,
  duration,
  intensity,
  fromBottom = false,
}: LightRay & { fromBottom?: boolean }) => {
  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute left-[var(--ray-left)] h-[var(--light-rays-length)] w-[var(--ray-width)] -translate-x-1/2 rounded-full opacity-0 mix-blend-screen blur-[var(--light-rays-blur)]",
        fromBottom 
          ? "-bottom-[12%] origin-bottom bg-gradient-to-t from-[color-mix(in_srgb,var(--light-rays-color)_70%,transparent)] to-transparent"
          : "-top-[12%] origin-top bg-gradient-to-b from-[color-mix(in_srgb,var(--light-rays-color)_70%,transparent)] to-transparent"
      )}
      style={
        {
          "--ray-left": `${left}%`,
          "--ray-width": `${width}px`,
        } as CSSProperties
      }
      initial={{ rotate: rotate }}
      animate={{
        opacity: [0, intensity, 0],
        rotate: [rotate - swing, rotate + swing, rotate - swing],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
        repeatDelay: duration * 0.1,
      }}
    />
  )
}

export function LightRays({
  className,
  style,
  count = 7,
  color = "rgba(160, 210, 255, 0.2)",
  blur = 36,
  opacity = 0.65,
  speed = 14,
  length = "70vh",
  width = 240,
  direction = "top",
  ambientGlow = 0.6,
  ref,
  ...props
}: LightRaysProps) {
  const [rays, setRays] = useState<LightRay[]>([])
  const cycleDuration = Math.max(speed, 0.1)

  useEffect(() => {
    const rayCount = direction === "both" ? Math.ceil(count / 2) : count
    setRays(createRays(rayCount, cycleDuration, opacity, width))
  }, [count, cycleDuration, opacity, width, direction])

  const showTop = direction === "top" || direction === "both"
  const showBottom = direction === "bottom" || direction === "both"

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none absolute inset-0 isolate overflow-hidden rounded-[inherit]",
        className
      )}
      style={
        {
          "--light-rays-color": color,
          "--light-rays-blur": `${blur}px`,
          "--light-rays-length": length,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        {showTop && (
          <>
            {ambientGlow > 0 && (
              <>
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={
                    {
                      opacity: ambientGlow,
                      background:
                        "radial-gradient(circle at 20% 15%, color-mix(in srgb, var(--light-rays-color) 45%, transparent), transparent 70%)",
                    } as CSSProperties
                  }
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={
                    {
                      opacity: ambientGlow,
                      background:
                        "radial-gradient(circle at 80% 10%, color-mix(in srgb, var(--light-rays-color) 35%, transparent), transparent 75%)",
                    } as CSSProperties
                  }
                />
              </>
            )}
            {rays.map((ray) => (
              <Ray key={ray.id} {...ray} />
            ))}
          </>
        )}
        {showBottom && (
          <>
            {ambientGlow > 0 && (
              <>
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={
                    {
                      opacity: ambientGlow,
                      background:
                        "radial-gradient(circle at 20% 85%, color-mix(in srgb, var(--light-rays-color) 45%, transparent), transparent 70%)",
                    } as CSSProperties
                  }
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={
                    {
                      opacity: ambientGlow,
                      background:
                        "radial-gradient(circle at 80% 90%, color-mix(in srgb, var(--light-rays-color) 35%, transparent), transparent 75%)",
                    } as CSSProperties
                  }
                />
              </>
            )}
            {rays.map((ray) => (
              <Ray key={`bottom-${ray.id}`} {...ray} fromBottom />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
