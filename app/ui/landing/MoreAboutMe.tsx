"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/app/ui/components/SectionHeading";
import { Prose } from "@/app/ui/components/Prose";
import { aboutMeParagraphs } from "@/app/lib/constants";

export function MoreAboutMe(): JSX.Element {
  return (
    <section className="more-about-me w-full h-fit flex justify-center flex-col items-start gap-4">
      <SectionHeading name="about-me" />
      <motion.div
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        transition={{
          duration: 0.4,
        }}
        viewport={{ once: true }}
        className="more-about-me-text w-fit max-w-[75ch] h-fit dark:text-neutral-200 text-neutral-800 text-sm sm:text-base font-mono flex flex-col gap-4"
      >
        {aboutMeParagraphs.map((paragraph, index) => (
          <div key={index} className={`more-about-me-para-${index + 1}`}>
            <Prose segments={paragraph} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
