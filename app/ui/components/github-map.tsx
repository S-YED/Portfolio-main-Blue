"use client";

import { motion } from "framer-motion";
import CalendarHeatmap from "react-calendar-heatmap";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SectionHeading } from "@/app/ui/components/SectionHeading";

const USER_NAME = "S-YED";

export function GithubMap(): JSX.Element {
  const [mounted, setMounted] = useState<boolean>(false);
  const [isFetchSuccessful, setIsFetchSuccessful] = useState<boolean | null>(
    null
  );
  const [contributionData, setContributionData] = useState<{
    contributions: { date: string; count: number }[];
    totalcontributions: number;
    maxContribution: number;
  }>({
    contributions: [],
    totalcontributions: 0,
    maxContribution: 0,
  });
  const [contributionTimeBounds, setContributionTimeBounds] = useState<null | {
    startDate: string;
    endDate: string;
  }>(null);

  const fetchGithubData = async () => {
    try {
      // Use the free community GitHub contributions API (no CORS issues, no token needed)
      const response = await fetch(
        `https://github-contributions-api.deno.dev/${USER_NAME}.json`
      );

      if (!response.ok) {
        setIsFetchSuccessful(false);
        return;
      }

      const data = await response.json();

      // The API returns contributions as a 2D array: [ [week1_days...], [week2_days...], ... ]
      // Each day has { date, contributionCount, color }. Flatten before mapping.
      if (data && data.contributions) {
        const flatDays = Array.isArray(data.contributions[0])
          ? data.contributions.flat()
          : data.contributions;

        const contributions = flatDays.map(
          (c: { date: string; contributionCount: number }) => ({
            date: c.date,
            count: c.contributionCount,
          })
        );

        const maxContribution = Math.max(
          ...contributions.map((c: { count: number }) => c.count),
          1
        );

        setContributionData({
          contributions,
          totalcontributions: data.totalContributions || 0,
          maxContribution,
        });
        setIsFetchSuccessful(true);
      } else {
        setIsFetchSuccessful(false);
      }
    } catch (error) {
      setIsFetchSuccessful(false);
    } finally {
      setMounted(true);
    }
  };

  // Paint DOM after the component is mounted
  useEffect(() => {
    const today = new Date();
    const startDate =
      String(today.getFullYear() - 1) +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0");
    const endDate =
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0");
    // Set the contribution date bounds
    setContributionTimeBounds({
      startDate: startDate,
      endDate: endDate,
    });
    // Fetch the GitHub data
    fetchGithubData();
  }, []);

  return (
    <section className="github-map w-full h-fit flex font-mono items-start justify-start flex-col gap-6">
      <SectionHeading name="github map" />
      {!mounted ? (
        // Loading skeleton while the contributions API resolves
        <div
          className="map-skeleton w-[98%] sm:w-[30rem] md:w-[35rem] lg:w-[40rem] h-24 rounded-md animate-pulse bg-neutral-300/60 dark:bg-neutral-700/60"
          aria-hidden="true"
        ></div>
      ) : isFetchSuccessful ? (
        <div className="map-and-contributions w-full h-fit flex flex-col items-start gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="github-map w-[98%] sm:w-[30rem] md:w-[35rem] lg:w-[40rem]"
          >
            <CalendarHeatmap
              startDate={contributionTimeBounds?.startDate}
              endDate={contributionTimeBounds?.endDate}
              values={contributionData.contributions}
              classForValue={(value) => {
                if (!value) {
                  return "color-empty";
                }
                return `color-github-${Math.ceil(
                  (value.count / contributionData.maxContribution) * 10
                )}`;
              }}
            />
          </motion.div>
          <div className="total-contributions w-fit h-fit text-wrap text-xs sm:text-sm">
            <span>Total Contribution: </span>
            <span className="font-semibold text-[#1e3a8a] dark:text-blue-400 underline">
              {contributionData.totalcontributions}
            </span>
          </div>
        </div>
      ) : (
        // Fetch failed: keep the section visible with a useful fallback
        <div className="map-fallback text-sm sm:text-base text-neutral-900 dark:text-neutral-300">
          Couldn&apos;t load the contribution graph right now. See my activity
          directly on{" "}
          <Link
            href={`https://github.com/${USER_NAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="dark:text-cyan-200 text-cyan-800 font-semibold hover:underline"
          >
            GitHub
          </Link>
          .
        </div>
      )}
    </section>
  );
}
