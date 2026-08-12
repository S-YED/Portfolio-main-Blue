"use client";

import Link from "next/link";
import { FiGithub, FiMail, FiGlobe } from "react-icons/fi";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { IconType } from "react-icons";

interface socialLinksType {
  name: string;
  icon: IconType;
  link: string;
  className?: string;
}

export function Footer(): JSX.Element {
  const socialLinks: socialLinksType[] = [
    {
      name: "github",
      icon: FiGithub,
      link: "https://github.com/S-YED",
      className: "dark:text-neutral-300 text-neutral-800 ",
    },
    {
      name: "twitter",
      icon: FaXTwitter,
      link: "https://x.com/skm_ahmed1",
      className: "dark:text-neutral-300 text-neutral-800",
    },
    {
      name: "linkedin",
      icon: FaLinkedin,
      link: "https://linkedin.com/in/s-yed",
      className: "dark:text-blue-400 text-blue-600",
    },
    {
      name: "email",
      icon: FiMail,
      link: "mailto:skm.exec@gmail.com",
      className: "dark:text-neutral-300 text-neutral-800",
    },
    {
      name: "website",
      icon: FiGlobe,
      link: "https://syedkm.com",
      className: "dark:text-cyan-300 text-cyan-700",
    },
  ];

  return (
    <footer className="w-full h-fit flex items-center justify-center mt-10">
      <div className="wrapper w-full max-w-screen-xl h-fit flex flex-col gap-1 items-start justify-center font-mono px-5">
        <div className="footer-contents-wrapper w-full h-fit border-t dark:border-[#48484f] border-[#d4d4d8] flex flex-col gap-1 items-center justify-center pt-4 pb-4">
          <div className="made-by w-fit h-fit text-center text-base sm:text-lg md:text-xl dark:text-white text-neutral-900 font-semibold">
            Made by Syed Khaja Moinuddin
          </div>
          <div className="links w-fit h-fit flex flex-row flex-wrap items-center justify-center gap-3">
            {socialLinks.map((social, index) => (
              <Link
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="w-fit h-fit p-2 inline-flex items-center justify-center min-h-[44px] min-w-[44px]"
            >
                <social.icon
                  className={`w-fit h-fit text-lg sm:text-xl ${social.className}`}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
