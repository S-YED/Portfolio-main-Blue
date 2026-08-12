"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/app/ui/components/SectionHeading";
import { communityRoles, conferences } from "@/app/lib/constants";

export function CommunityWork(): JSX.Element {
  return (
    <section className="community-work w-full h-fit flex justify-center flex-col gap-6 items-start">
      <SectionHeading name="community work" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="community-content font-mono dark:text-neutral-200 text-neutral-800 flex flex-col gap-5 text-sm sm:text-base max-w-[75ch]"
      >
        <div className="community-roles flex flex-col gap-2">
          <div className="roles-intro">
            I contribute back to the communities that helped me grow:
          </div>
          <ul className="roles-list list-none flex flex-col gap-1.5">
            {communityRoles.map((role, index) => (
              <li key={index} className="flex gap-2 items-start">
                <span
                  className="dark:text-accent-dark text-accent mt-0.5 flex-shrink-0"
                  aria-hidden="true"
                >
                  &gt;
                </span>
                <span>{role}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="conferences flex flex-col gap-2">
          <div className="conferences-intro">
            Conferences keep me sharp and connected. Recently attended:
          </div>
          <div className="conference-chips flex flex-row flex-wrap gap-2">
            {conferences.map((conf, index) => (
              <span
                key={index}
                className="conference px-2 py-1 rounded-lg border dark:border-[#47494e] border-neutral-300 dark:bg-card-surface/40 bg-white/60 text-xs sm:text-sm dark:text-neutral-200 text-neutral-900"
              >
                {conf}
              </span>
            ))}
          </div>
        </div>
        <div className="community-extras">
          I participated in Hacktoberfest 2024 (merged PRs), competed in World
          Wide CTF 2024, and won a challenge prize at the{" "}
          <span className="dark:text-accent-dark text-accent">
            TON Blockchain Bangalore Bootcamp Hackathon
          </span>{" "}
          building a DApp with my team.
        </div>
      </motion.div>
    </section>
  );
}
