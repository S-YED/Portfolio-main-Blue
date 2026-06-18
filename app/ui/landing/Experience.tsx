"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/app/ui/components/SectionHeading";

const experienceData = [
  {
    role: "Full Stack Backend Intern",
    company: "Parentof Solutions Pvt Ltd",
    location: "Bengaluru",
    period: "Jan 2026 - May 2026",
    highlights: [
      "Designed & documented the company's full GitFlow CI/CD branching strategy (main / develop / feature / release / hotfix), adopted by the engineering team.",
      "Worked on attentionhero.com — a live SaaS platform (Next.js / MongoDB / Vercel) serving real users with continuous feature deployments.",
      "Gained GCP exposure working with AI recording & game-backend services running on Google Cloud Platform production servers.",
      "Conducted PR code reviews, identifying logic issues and edge cases before merge.",
      "Owned comprehensive testing coverage: 200+ test cases (functional, regression, smoke, integration) across 10+ browser/device combos via BrowserStack.",
      "Tracked 50+ defects with severity, priority, and reproduction steps across releases v2.0 – v2.4+.",
      "Managed daily smoke testing (AM & PM), QA sign-off for production releases, and structured release documentation for stakeholders.",
    ],
  },
  {
    role: "Java Full Stack Training Program",
    company: "Dhee Coding Lab",
    location: "Bengaluru",
    period: "Feb 2025 - May 2025",
    highlights: [
      "Built full-stack Java applications with MySQL database integration using JDBC, Hibernate, and JPA.",
      "Studied Core Java (OOP, multi-threading, exception handling, garbage collection) and Advanced Java stack (JSP).",
      "Designed and queried MySQL databases integrated with backend web modules.",
    ],
  },
  {
    role: "Collaborative Web Development Project",
    company: "Tekkybench",
    location: "Bengaluru",
    period: "Oct 2023 - Nov 2023",
    highlights: [
      "Developed a crowdfunding web platform prototype in a 3-person collaborative team.",
      "Received Letter of Recommendation for delivery quality and collaboration.",
    ],
  },
];

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
              <div className="period text-xs sm:text-sm dark:text-neutral-400 text-neutral-500 italic">
                {exp.period}
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
