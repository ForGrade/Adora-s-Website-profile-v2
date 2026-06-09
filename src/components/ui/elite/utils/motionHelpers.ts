import type { MotionProps } from "framer-motion";

/**
 * Returns Framer Motion props that suppress all entrance and hover animations
 * when the user prefers reduced motion, or an empty object to let the caller
 * provide its own motion props.
 */
export function getMotionProps(shouldReduce: boolean | null): Partial<MotionProps> {
  if (shouldReduce) {
    return {
      initial: false,
      animate: { opacity: 1 },
      whileHover: {},
    };
  }
  return {};
}
