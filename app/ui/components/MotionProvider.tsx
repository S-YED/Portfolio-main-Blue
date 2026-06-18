"use client";

import { MotionConfig } from "framer-motion";

// Honors the OS-level "reduce motion" preference for all framer-motion
// animations beneath it (CSS motion-reduce cannot override framer's
// inline styles, so this must live at the React layer).
export function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
