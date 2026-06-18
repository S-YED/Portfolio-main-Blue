"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { achievementsData } from "@/app/lib/constants";
import { SectionHeading } from "@/app/ui/components/SectionHeading";

export function Flex(): JSX.Element {
  const achievementRef = useRef<HTMLDivElement>(null);
  const achievementRefIsInView = useInView(achievementRef, { once: true });

  return (
    <section className="w-full h-fit flex justify-center flex-col gap-5 items-start">
      <SectionHeading name="flex" />
      <div className="some-words font-mono flex flex-col gap-6 max-w-[75ch]">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.4,
            duration: 0.6,
            ease: "easeIn",
          }}
          viewport={{ once: true }}
          className="w-fit h-fit text-neutral-800 dark:text-white text-sm sm:text-base"
        >
          The thing I really flex is my{" "}
          <span className="dark:text-accent-dark text-accent">
            real-world impact, community presence & learning velocity
          </span>
          . I went from a fresh graduate to working on a live SaaS product in
          production. I&apos;ve attended 10+ industry conferences, earned
          competitive fellowships, and I&apos;m still building — every single
          day.
        </motion.div>
        <div className="info-plus-data-achievements flex flex-col gap-10 items-start text-sm sm:text-base">
          <motion.div
            initial={{
              opacity: 0,
              x: 10,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.4,
              duration: 0.6,
              ease: "easeIn",
            }}
            className="more-info-2nd-para w-fit h-fit"
            viewport={{ once: true }}
          >
            Here are some of my{" "}
            <span className="dark:text-accent-dark text-accent">
              on-paper achievements
            </span>
            :
          </motion.div>
          <div className="timeline flex gap-5 py-5 flex-row rounded-lg relative">
            <motion.div
              initial={{
                opacity: 1,
                height: 0,
                borderTopLeftRadius: "8px",
              }}
              whileInView={{
                height: "100%",
                borderRadius: "8px",
              }}
              transition={{
                delay: 0.6,
                duration: 0.3 * achievementsData.length,
                ease: "easeInOut",
              }}
              ref={achievementRef}
              viewport={{ once: true }}
              className="timeline w-full -left-[2px] top-0 h-full border-l-2 border-neutral-900 dark:border-neutral-300 absolute z-10 rounded-lg"
            ></motion.div>
            <div className="list z-10 flex flex-col gap-5">
              {achievementsData.map((achievement, index) => (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 5,
                  }}
                  animate={
                    achievementRefIsInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {}
                  }
                  transition={{
                    delay: 0.6 + index * 0.3,
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  key={index}
                  className="timeline-item relative px-5 before:absolute before:w-3 before:h-3 dark:before:bg-white before:bg-blue-800 before:-left-[7px] before:border before:border-cyan-400 dark:before:border-red-400 before:rounded-full "
                >
                  <div className="timeline-content">
                    <span className="text-accent dark:text-accent-dark font-semibold">
                      {achievement.name}:{" "}
                    </span>
                    <span className="dark:text-neutral-300 text-neutral-900 text-xs sm:text-sm">
                      {achievement.description}{" "}
                    </span>
                    {achievement.date && (
                      <span className="dark:text-neutral-500 text-neutral-500 text-[0.6rem] sm:text-xs">
                        ({achievement.date}){" "}
                      </span>
                    )}
                    {achievement.link && (
                      <Link
                        href={achievement.link}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 duration-300 text-[0.6rem] sm:text-xs"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View more
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
