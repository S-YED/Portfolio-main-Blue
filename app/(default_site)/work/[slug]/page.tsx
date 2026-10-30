import { Metadata } from "next";
import Link from "next/link";
import Markdown from "markdown-to-jsx";
import { IoChevronBack } from "react-icons/io5";
import { getWorkCase, getWorkCases } from "@/app/utils/getWorkData";

type WorkPageProps = { params: { slug: string } };

export function generateStaticParams(): { slug: string }[] {
  return getWorkCases().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const c = getWorkCase(params.slug);
  return {
    metadataBase: new URL(process.env.SITE_URL ?? "https://syedkm.com"),
    title: `${c.title} - Work`,
    description: c.summary,
    // A draft is only ever on a preview deploy; keep it out of search either way.
    robots: c.status === "published" ? "index, follow" : "noindex, nofollow",
  };
}

export default function WorkCasePage({ params }: WorkPageProps): JSX.Element {
  const c = getWorkCase(params.slug);

  return (
    <section className="work-case flex w-full h-fit items-center justify-center p-4">
      <article className="w-full max-w-[900px] flex flex-col gap-6">
        <Link href="/work" className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:underline">
          <IoChevronBack /> All work
        </Link>
        <header className="flex flex-col gap-2">
          {c.status === "draft" && (
            <span className="text-xs uppercase tracking-wide text-amber-600">Draft, preview only</span>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200">{c.title}</h1>
          <p className="text-neutral-700 dark:text-neutral-400">{c.summary}</p>
          <p className="text-sm text-neutral-500">
            {c.role} · {c.period} · {c.stack.join(" · ")}
          </p>
        </header>
        <div className="post-content text-base text-neutral-700 dark:text-neutral-300 sm:text-lg markdown">
          <Markdown>{c.content}</Markdown>
        </div>
      </article>
    </section>
  );
}
