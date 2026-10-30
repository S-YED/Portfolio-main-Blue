import { Metadata } from "next";
import Link from "next/link";
import { getWorkCases } from "@/app/utils/getWorkData";

export const metadata: Metadata = {
  title: "Work - Syed Khaja Moinuddin",
  description: "Case studies: how I test and ship software, with the evidence behind each one.",
};

export default function Work(): JSX.Element {
  const cases = getWorkCases();

  return (
    <section className="work flex w-full h-fit items-center justify-center p-4">
      <div className="wrapper w-full max-w-screen-md h-fit flex flex-col gap-12">
        <div className="flex flex-col gap-2 items-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200">
            Work
          </h1>
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-400">
            Case studies from real releases: the problem, what I built, and what it changed.
          </p>
        </div>

        {cases.length === 0 ? (
          <p className="text-center text-neutral-600 dark:text-neutral-400">
            Case studies are being written up. Meanwhile, the{" "}
            <Link href="/blog" className="underline decoration-blue-500">
              blog
            </Link>{" "}
            has notes from real work.
          </p>
        ) : (
          <ul className="flex flex-col gap-6">
            {cases.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/work/${c.slug}`}
                  className="block rounded-lg border border-neutral-300 dark:border-neutral-700 p-5 hover:border-blue-500 transition-colors"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-lg sm:text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                      {c.title}
                    </h2>
                    {c.status === "draft" && (
                      <span className="text-xs uppercase tracking-wide text-amber-600">draft, preview only</span>
                    )}
                  </div>
                  <p className="mt-2 text-neutral-700 dark:text-neutral-400">{c.summary}</p>
                  <p className="mt-3 text-sm text-neutral-500">
                    {c.role} · {c.period} · {c.stack.join(" · ")}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
