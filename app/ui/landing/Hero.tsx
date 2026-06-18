"use client";

import rough from "roughjs";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { ReactTyped } from "react-typed";
import { motion, useReducedMotion } from "framer-motion";
import { FiGithub, FiMail, FiFileText } from "react-icons/fi";
import Link from "next/link";

export function Hero(): JSX.Element {
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const svg = document.getElementById(
      "rough-line"
    ) as unknown as SVGSVGElement;
    if (svg && svg.childNodes.length === 0) {
      const rc = rough.svg(svg);
      const roughLine = rc.line(0, 0, 300, 10, {
        stroke: "#ffa500",
        strokeWidth: 2,
        roughness: 4,
      });
      svg.appendChild(roughLine);
      setIsRendered(true);
    }
    return () => {
      if (svg) svg.replaceChildren();
    };
  }, []);

  const ctaLinks = [
    {
      name: "View Resume",
      href: "/Syed_Khaja_Moinuddin_Resume.pdf",
      icon: FiFileText,
      primary: true,
      external: true,
    },
    {
      name: "Email Me",
      href: "mailto:skm.exec@gmail.com",
      icon: FiMail,
      primary: false,
      external: false,
    },
    {
      name: "GitHub",
      href: "https://github.com/S-YED",
      icon: FiGithub,
      primary: false,
      external: true,
    },
  ];

  return (
    <section className="hero w-full h-fit flex items-center justify-center flex-col">
      <div
        className="intro-desc-wrapper relative flex flex-col gap-6 w-full max-w-5xl bg-white/60 dark:bg-[#282c33]/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(124,198,248,0.10)]"
        style={{ WebkitBackdropFilter: "blur(12px)" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="introduction-heading relative z-10 flex flex-col gap-1 w-fit h-fit"
        >
          <p
            className="heading-or-loading text-neutral-900 dark:text-neutral-100 text-2xl sm:text-3xl font-mono tracking-tight"
            style={{ textShadow: "none" }}
          >
            Hey there!
          </p>
          <h1
            className="relative name-intro-or-loading text-white w-fit h-fit dark:text-white text-3xl sm:text-4xl font-mono font-normal"
            style={{ textShadow: "none" }}
          >
            <div className="text relative w-fit h-fit dark:text-neutral-100 text-neutral-700">
              I&apos;m{" "}
              <span className="dark:text-accent-dark text-accent-strong">
                {reduceMotion ? (
                  "Syed Khaja Moinuddin"
                ) : (
                  <ReactTyped
                    strings={["Syed Khaja Moinuddin"]}
                    startDelay={200}
                    typeSpeed={60}
                    showCursor={true}
                  />
                )}
              </span>
            </div>
            <div className="svg-container absolute w-full h-full inset-0 bottom-0 flex items-end">
              <svg
                id="rough-line"
                className={clsx(
                  `rough-line h-[10px] relative translate-y-3 transition-all duration-300 ${
                    isRendered ? "w-full" : "w-0"
                  }`
                )}
                viewBox="0 0 320 40"
                preserveAspectRatio="none"
                aria-hidden="true"
              ></svg>
            </div>
          </h1>
        </motion.div>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="my-description relative z-10 font-mono dark:text-white text-base text-neutral-900 sm:text-lg w-fit h-fit text-pretty"
        >
          <span className="w-fit h-fit">
            <span className="dark:text-accent-dark text-accent font-semibold">
              Full Stack Developer
            </span>
          </span>{" "}
          with hands-on experience building and shipping{" "}
          <span className="dark:text-accent-dark text-accent font-semibold">
            production SaaS backends
          </span>
          , designing{" "}
          <span className="dark:text-accent-dark text-accent font-semibold">
            CI/CD pipelines
          </span>
          , and deploying real cloud infrastructure on{" "}
          <span className="dark:text-accent-dark text-accent font-semibold">
            AWS & GCP
          </span>
          . Currently building{" "}
          <span className="dark:text-accent-dark text-accent font-semibold">
            QA Forge
          </span>
          , an AI-powered automated testing platform.
        </motion.p>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="more-about-me text-sm sm:text-base font-mono dark:text-white text-neutral-900 w-fit h-fit text-pretty"
        >
          Outside the editor, I stay connected with the industry through{" "}
          <span className="dark:text-accent-dark text-accent font-semibold">
            conferences
          </span>{" "}
          like KubeCon, AWS Summit, and Google I/O. I actively pursue{" "}
          <span className="dark:text-accent-dark text-accent font-semibold">
            cloud certifications
          </span>{" "}
          and compete in hackathons.
        </motion.p>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="cta-row relative z-10 flex flex-row flex-wrap gap-3 font-mono"
        >
          {ctaLinks.map((cta) => (
            <Link
              key={cta.name}
              href={cta.href}
              target={cta.external ? "_blank" : undefined}
              rel={cta.external ? "noopener noreferrer" : undefined}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm sm:text-base font-semibold border transition-colors duration-300",
                cta.primary
                  ? "bg-accent text-white border-accent hover:bg-accent-strong dark:bg-accent-dark dark:text-neutral-900 dark:border-accent-dark dark:hover:bg-accent-hover"
                  : "bg-transparent text-neutral-900 dark:text-neutral-100 border-neutral-400 dark:border-[#47494e] hover:border-accent dark:hover:border-accent-dark"
              )}
            >
              <cta.icon aria-hidden="true" />
              <span>{cta.name}</span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
