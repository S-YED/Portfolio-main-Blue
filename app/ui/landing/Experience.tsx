"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/app/ui/components/SectionHeading";
import { experienceData } from "@/app/lib/constants";

export function Experience(): JSX.Element {
  return (
    <section className="experience w-full h-fit flex items-start flex-col gap-10 justify-center">
      <SectionHeading name="experience" />

      <div className="timeline-wrapper w-full flex flex-col gap-8 font-mono">
        {experienceData.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2 + index * 0.15,
              duration: 0.5,
              ease: "easeIn",
            }}
            viewport={{ once: true }}
            className="experience-card w-full h-fit rounded-xl border dark:border-[#47494e] border-neutral-300 p-5 flex flex-col gap-3 dark:bg-card-surface/40 bg-white/60"
          >
            <div className="header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div className="role-company flex flex-col gap-0.5">
                <div className="role text-base sm:text-lg font-semibold dark:text-white text-neutral-900">
                  {exp.role}
                </div>
                <div className="company text-sm dark:text-accent-dark text-accent font-semibold">
                  {exp.company} - {exp.location}
                </div>
              </div>
              <div className="period flex items-center gap-2 text-xs sm:text-sm dark:text-neutral-400 text-neutral-500 italic">
                {exp.current && (
                  <span className="current-badge not-italic rounded-full px-2 py-0.5 text-[0.65rem] sm:text-xs font-semibold bg-accent/15 text-accent-strong dark:bg-accent-dark/20 dark:text-accent-dark">
                    Current
                  </span>
                )}
                <span>{exp.period}</span>
              </div>
            </div>
            <ul className="highlights list-none flex flex-col gap-1.5">
              {exp.highlights.map((point, i) => (
                <li
                  key={i}
                  className="text-xs sm:text-sm dark:text-neutral-300 text-neutral-900 flex gap-2 items-start"
                >
                  <span className="dark:text-accent-dark text-accent mt-0.5 flex-shrink-0">
                    &gt;
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
