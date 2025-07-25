import React, { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Panel from "./Panel"

gsap.registerPlugin(ScrollTrigger)

/**
 * BlockReveal
 *
 * A reusable wrapper that:
 *  • animates its children into view on scroll
 *  • optionally wraps them in your Panel styles
 *  • lets you choose the rendered tag via `as`
 *
 * Props:
 *  • as: the HTML tag or component to render (default: "div")
 *  • panel: whether to wrap content in the Panel component
 *  • title: optional heading text (rendered as <h2> inside Panel)
 *  • all other props passed straight through to the rendered element
 */
export default function BlockReveal({
  as: Component = "div",
  panel = false,
  title,
  children,
  ...props
}) {
  const ref = useRef(null)

  // on mount, hook up ScrollTrigger animation; clean up on unmount
  useLayoutEffect(() => {
    const el = ref.current
    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    )
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  // If panel styling is desired, wrap children in Panel
  if (panel) {
    return (
      <Panel ref={ref} className="panel" {...props}>
        {title && <h2>{title}</h2>}
        {children}
      </Panel>
    )
  }

  // Otherwise render whatever tag/component you passed in via `as`
  return (
    <Component ref={ref} {...props}>
      {title && <h2>{title}</h2>}
      {children}
    </Component>
  )
}
