import type { Variants } from "framer-motion";

/** Fade up from below — used on most section cards */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/** Slide in from the left — used on hero left column */
export const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

/** Slide in from the right — used on hero right column */
export const fadeRight: Variants = {
  hidden:  { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

/** Stagger container — applies staggerChildren to direct children */
export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/** Vertical line grow — used for the education timeline connector */
export const lineGrow: Variants = {
  hidden:  { scaleY: 0, originY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.2, ease: "easeOut" } },
};
