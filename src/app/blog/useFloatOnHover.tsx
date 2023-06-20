/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useRef } from 'react'
import { useHover } from 'usehooks-ts'
import { animate, useMotionValue } from 'framer-motion'

export function useFloatOnHover() {
  const ref = useRef(null)
  const hovered = useHover(ref)

  const y = useMotionValue(0)

  useEffect(() => {
    if (hovered) animate(y, [0, -15, 0], { duration: 1.25, repeat: Infinity, ease: 'easeInOut' })
    else animate(y, 0) // it is impossible to gracefully end animation on mouse leave using plain js & css
  }, [y, hovered])

  return { ref, y }
}
