"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionHeading } from "@/app/ui/components/SectionHeading";
import { contactLinks } from "@/app/lib/constants";

export function Contact(): JSX.Element {
  return (
    <section className="contact relative w-full h-fit justify-center items-start flex flex-col gap-6">
      <SectionHeading name="contact" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="contact-body flex flex-col gap-5 font-mono max-w-[75ch]"
      >
        <p className="description w-fit h-fit text-sm sm:text-base text-neutral-800 dark:text-neutral-200">
          I&apos;m always{" "}
          <span className="dark:text-accent-dark text-accent font-semibold">
            open to opportunities
          </span>
          : Full Stack, Backend, Cloud, or DevOps roles. The fastest way to
          reach me:
        </p>
        <div className="contact-links flex flex-row flex-wrap gap-3">
          {contactLinks.map((cta) => (
            <Link
              key={cta.name}
              href={cta.href}
              target={cta.external ? "_blank" : undefined}
              rel={cta.external ? "noopener noreferrer" : undefined}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm sm:text-base font-semibold border transition-colors duration-300 ${
                cta.primary
                  ? "bg-accent text-white border-accent hover:bg-accent-strong dark:bg-accent-dark dark:text-neutral-900 dark:border-accent-dark dark:hover:bg-accent-hover"
                  : "bg-transparent text-neutral-800 dark:text-neutral-100 border-neutral-400 dark:border-[#47494e] hover:border-accent dark:hover:border-accent-dark"
              }`}
            >
              <cta.icon aria-hidden="true" />
              <span>{cta.name}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
