"use client";

import { motion } from "framer-motion";

// Shared "$ section-name" heading used by every landing section.
// Renders a semantic h2 with the terminal-prompt motif.
export function SectionHeading({ name }: { name: string }): JSX.Element {
  return (
    <motion.h2
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
      className="heading w-fit h-fit text-xl sm:text-2xl font-semibold flex items-center gap-1 text-neutral-800 dark:text-white"
    >
      <span className="text-accent dark:text-accent-dark" aria-hidden="true">
        $
      </span>
      <span className="font-mono sm:translate-y-1">{name}</span>
    </motion.h2>
  );
}
