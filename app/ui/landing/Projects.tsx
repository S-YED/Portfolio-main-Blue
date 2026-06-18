"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { FiGithub } from "react-icons/fi";
import { LuExternalLink } from "react-icons/lu";
import { FaSort } from "react-icons/fa";
import { projectData, botProjectData } from "@/app/lib/constants";
import { projectDataType } from "@/app/lib/definitions";
import { SectionHeading } from "@/app/ui/components/SectionHeading";

export function Projects(): JSX.Element {
  // Newest first by default: recruiters should see the strongest, most
  // recent work at the top without touching the sort control.
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [pageNo, setPageNo] = useState<number>(1);
  const maxProjectOnOnePage: number = 6;
  const maxPages: number = Math.ceil(projectData.length / maxProjectOnOnePage);

  // Sort projects based on date
  const sortedProjects = [...projectData].sort((a, b) => {
    if (!a.date || !b.date) return 0;

    return sortOrder === "asc"
      ? a.date.getTime() - b.date.getTime()
      : b.date.getTime() - a.date.getTime();
  });

  return (
    <section className="projects w-full h-fit flex items-start flex-col gap-10 justify-center">
      <div className="head w-full h-fit flex flex-wrap gap-4 items-start justify-between">
        <SectionHeading name="projects" />

        <button
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm border dark:border-[#47494e] border-neutral-300 hover:border-accent dark:hover:border-accent-dark duration-300 dark:bg-[#2d2d2d] bg-gray-100 dark:text-white text-neutral-900"
        >
          <FaSort
            aria-hidden="true"
            className="dark:text-gray-400 text-gray-500"
          />
          <span>{sortOrder === "desc" ? "Newest first" : "Oldest first"}</span>
        </button>
      </div>
      {/* All content - projects + view more + bot projects */}
      <div className="content w-full h-fit flex flex-col gap-10">
        {/* Projects */}
        <div className="projects w-fit h-fit flex flex-row flex-wrap gap-10 items-stretch justify-center font-mono">
          {sortedProjects
            .slice(0, maxProjectOnOnePage * Math.min(pageNo, maxPages))
            .map((project: (typeof sortedProjects)[number]) => (
              <ProjectCard
                key={project.name}
                name={project.name}
                description={project.description}
                image={project.image}
                techStack={project.techStack}
                github={project.github}
                deployedLink={project.deployedLink}
                date={project.date}
                gif={project.gif}
              />
            ))}
        </div>
        {/* View more tab  */}
        {pageNo < maxPages && (
          <div className="viewmore-tab w-full h-fit relative flex justify-center items-center mt-8 mb-8">
            <button
              onClick={() => setPageNo(pageNo + 1)}
              className="view-more-button cursor-pointer border-2 border-black dark:border-neutral-200 px-3 py-2 font-mono font-semibold duration-300 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600"
              type="button"
            >
              View More
            </button>
          </div>
        )}
        {/* Other builds */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="further-info-and-comments font-mono text-neutral-900 dark:text-neutral-100 text-sm sm:text-base max-w-[75ch]"
        >
          <div className="info-text">
            Beyond these, I built{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={botProjectData[0].link}
              className="w-auto h-auto dark:text-cyan-200 text-cyan-800 font-semibold hover:underline"
            >
              TON Scholar
            </Link>
            , a blockchain DApp my team shipped at the TON Bangalore Bootcamp
            Hackathon (it won a challenge prize), and I contribute to open
            source on{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={botProjectData[1].link}
              className="w-auto h-auto dark:text-cyan-200 text-cyan-800 font-semibold hover:underline"
            >
              GitHub
            </Link>
            , including merged Hacktoberfest 2024 pull requests.
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  name,
  description,
  image,
  techStack,
  github,
  deployedLink,
  date,
  gif,
}: projectDataType): JSX.Element {
  // Refs and states
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [gifError, setGifError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleGifError = () => {
    setGifError(true);
    setIsLoading(false);
  };

  const handleGifLoad = () => {
    setIsLoading(false);
  };

  // The cover image links to the live deployment when one exists,
  // otherwise to the repository.
  const primaryLink = deployedLink ?? github;

  // Format date to display only month and year
  const formattedDate = date
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
      }).format(date)
    : null;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      className={`project-card-container w-fit h-full`}
      style={{
        perspective: "1000px",
      }}
    >
      <div
        ref={cardRef}
        style={{
          perspective: "300px",
        }}
        onMouseMove={(e) => {
          if (reduceMotion) return;
          // Get the card element dimentions
          const cardDimensions = cardRef.current?.getBoundingClientRect();

          // Get the mouse position
          const x = e.clientX - (cardDimensions?.left as number);
          const y = e.clientY - (cardDimensions?.top as number);

          // Convert to percentage
          const xPercent = (x / (cardDimensions?.width as number)) * 100;
          const yPercent = (y / (cardDimensions?.height as number)) * 100;

          // Convert to degreea
          const degreeX = 20 * (Math.abs(xPercent - 50) / 50);
          const degreeY = 20 * (Math.abs(yPercent - 50) / 50);

          if (cardRef.current) {
            cardRef.current.style.transform = `${
              xPercent <= 50
                ? `rotateY(${degreeX}deg)`
                : `rotateY(${-degreeX}deg)`
            } ${
              yPercent <= 50
                ? `rotateX(${-degreeY}deg)`
                : `rotateX(${degreeY}deg)`
            } `;
          }
        }}
        onMouseOut={() => {
          if (cardRef.current) {
            cardRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
          }
        }}
        className="project-card max-w-[340px] h-full rounded-xl flex flex-col overflow-hidden shadow-2xl dark:shadow-[0_35px_60px_-15px_rgba(255,255,255,0.1)] duration-700"
      >
        <div className="relative image-box w-full h-fit">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-fit"
            href={primaryLink}
            aria-label={`${name}, ${deployedLink ? "open live site" : "open repository"}`}
          >
            <div className="image group relative w-full h-[200px] overflow-hidden rounded-t-xl border-[#dbd5d5] dark:border-[#484a50] flex items-center justify-center border-2">
              {/* Show gif if available, fallback to image if gif fails or is slow to load */}
              {gif && !gifError ? (
                <Image
                  src={gif}
                  unoptimized={true}
                  loading="lazy"
                  alt={`${name} preview`}
                  width={340}
                  height={200}
                  className="relative rounded-t-xl pointer-events-none z-10 group-hover:scale-105 duration-500 object-cover w-full h-full"
                  onError={handleGifError}
                  onLoad={handleGifLoad}
                />
              ) : (
                <Image
                  src={image}
                  loading="lazy"
                  alt={`${name} cover`}
                  width={340}
                  height={200}
                  className="relative rounded-t-xl pointer-events-none z-10 group-hover:scale-105 duration-500 object-cover w-full h-full"
                />
              )}
              {/* Optional loading indicator */}
              {gif && isLoading && !gifError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 dark:bg-gray-800/50 z-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                </div>
              )}
            </div>
          </Link>
        </div>
        <div className="all-contents flex flex-col flex-1 w-full h-fit py-5 px-4 dark:bg-card-surface bg-white items-start gap-4">
          <div className="name-links-description w-full h-fit flex flex-col justify-between gap-2">
            <div className="name-links w-full h-fit flex flex-row items-center justify-between">
              <h3 className="name w-fit h-fit text-base sm:text-lg font-semibold dark:text-white text-neutral-900 relative after:absolute after:-bottom-[2px] after:left-0 after:h-[2px] after:w-full after:bg-cyan-500 dark:after:bg-cyan-400">
                {name}
              </h3>
              <div className="links w-fit h-fit flex flex-row gap-2 items-center">
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={github}
                  className="w-fit h-fit"
                  aria-label={`${name} on GitHub`}
                >
                  <FiGithub className="dark:text-white text-neutral-900 text-base sm:text-lg" />
                </Link>
                {deployedLink && (
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={deployedLink as string}
                    className="w-fit h-fit"
                    aria-label={`${name} live site`}
                  >
                    <LuExternalLink className="dark:text-white text-neutral-900 text-base sm:text-lg" />
                  </Link>
                )}
              </div>
            </div>
            <p className="description w-fit h-fit text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
              {description}
            </p>
          </div>
          <div className="tech-stack w-fit h-fit flex flex-row flex-wrap gap-2 mt-auto">
            {techStack.map((tech, index) => (
              <div
                className="tech px-2 py-1 rounded-lg dark:bg-chip-surface bg-neutral-900 text-xs dark:text-neutral-100 text-neutral-100"
                key={index}
              >
                {tech.toLocaleLowerCase()}
              </div>
            ))}
          </div>
          {formattedDate && (
            <div className="date w-full h-fit text-xs text-neutral-500 dark:text-neutral-400">
              {formattedDate}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
