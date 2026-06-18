"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { motion } from "framer-motion";

interface navBarTabsType {
  name: string;
  link: string;
}

export function Navbar(): JSX.Element {
  const [mounted, setMounted] = useState<boolean>(false);
  const { resolvedTheme, setTheme } = useTheme();

  const navbarTabs: navBarTabsType[] = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Blog",
      link: "/blog",
    },
    {
      name: "Resume",
      link: "/Syed_Khaja_Moinuddin_Resume.pdf",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <nav
      className={`relative w-full h-fit flex items-center justify-center z-30`}
    >
      <div className="wrapper w-full max-w-screen-xl flex flex-row flex-wrap items-center justify-around sm:justify-between px-6 pt-8 gap-2">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="name w-fit h-fit flex items-center"
        >
          <Link href={"/"} className="flex flex-row gap-1 items-center">
            <span className="text-accent-strong dark:text-accent-dark text-xl sm:text-2xl ">
              $
            </span>
            <span className="text-neutral-800 dark:text-white text-xl sm:text-2xl font-mono sm:translate-y-1">
              SKM.
            </span>
          </Link>
        </motion.div>
        <div className="nav-buttons w-fit h-fit flex items-center flex-row gap-3 font-mono">
          {navbarTabs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.1 + index * 0.05,
                duration: 0.4,
                ease: "easeOut",
              }}
              className={`${item.name} w-fit h-fit`}
            >
              <Link
                href={item.link}
                className="text-base sm:text-xl w-fit h-fit group relative after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] dark:after:bg-underline-dark after:bg-underline-light after:transition-all after:duration-300 after:hover:w-full"
              >
                <span className="w-fit h-fit text-accent-strong dark:text-accent-dark">
                  /
                </span>
                <span className="w-fit h-fit text-neutral-800 dark:text-white">
                  {item.name.toLowerCase()}
                </span>
              </Link>
            </motion.div>
          ))}

          <motion.button
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.1 + navbarTabs.length * 0.05,
              duration: 0.4,
              ease: "easeOut",
            }}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="theme-button w-fit h-fit p-3 -m-3 inline-flex items-center justify-center"
          >
            {isDark ? (
              <MdOutlineLightMode className="dark:text-blue-200 text-lg w-fit h-fit" />
            ) : (
              <MdOutlineDarkMode className="text-blue-800 text-lg w-fit h-fit" />
            )}
          </motion.button>
        </div>
      </div>
    </nav>
  );
}
