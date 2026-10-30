import { Metadata } from "next";
import Link from "next/link";
import { getWorkCases } from "@/app/utils/getWorkData";
import { getBlogPostMetadata } from "@/app/utils/getBlogData";
import { BlogCard } from "@/app/ui/blog/blog-card";

export const metadata: Metadata = {
  title: "Work - Syed Khaja Moinuddin",
  description: "Case studies and notes from real work: how I test and ship software, with the evidence behind each one.",
};

// One page for everything I've built and written: case studies first, then notes
// (the former /blog, which now redirects here). Notes live at /work/notes/<slug>.
export default function Work(): JSX.Element {
  const cases = getWorkCases();
  const notes = getBlogPostMetadata("blogs");

  return (
    <section className="work flex w-full h-fit items-center justify-center p-4">
      <div className="wrapper w-full max-w-screen-2xl h-fit flex flex-col items-center gap-16">
        <div className="flex flex-col gap-2 items-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200">
            Work
          </h1>
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-400">
            Case studies from real releases, and notes from real work.
          </p>
        </div>

        <div id="case-studies" className="w-full max-w-screen-md flex flex-col gap-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 dark:text-neutral-200">Case studies</h2>
          {cases.length === 0 ? (
            <p className="text-neutral-600 dark:text-neutral-400">
              Case studies are being written up: the problem, what I built, and what it changed.
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
                      <h3 className="text-lg sm:text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                        {c.title}
                      </h3>
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

        <div id="notes" className="w-full flex flex-col items-center gap-10">
          <div className="w-full max-w-screen-md flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 dark:text-neutral-200">Notes</h2>
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-400">
              Shorter write-ups: QA, cloud infrastructure, and things I learned by shipping.
            </p>
          </div>
          <div className="flex flex-col gap-16 w-fit h-fit items-center justify-center">
            {notes.map((note) => (
              <BlogCard key={note.slug} cardData={note} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
