"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionHeading } from "@/app/ui/components/SectionHeading";

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
        <div className="more-about-me-para-1">
          I hold a B.E. in{" "}
          <span className="dark:text-accent-dark text-accent">
            Computer Science & Engineering (Distinction)
          </span>{" "}
          from Government Engineering College Ramanagara, VTU (2025). College
          built the foundation; real-world internships, cloud projects, and
          production deployments sharpened the craft.
        </div>
        <div className="more-about-me-para-2">
          Outside the editor, I stay active in the tech community:
          attending conferences, competing in hackathons, joining cloud
          community events, and pursuing certification tracks. I&apos;m always
          looking for the next technology to master or the next production
          challenge to solve. I also keep notes and updates on the{" "}
          <span className="dark:text-accent-dark text-accent underline decoration-blue-500 ">
            <Link href={"/blog"} className="w-fit h-fit">
              blogs
            </Link>
          </span>
          .
        </div>
      </motion.div>
    </section>
  );
}
