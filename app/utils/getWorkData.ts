import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

// Case studies live in public/work/<slug>/content/content.md, like the blogs.
// Front matter: title, summary, role, period, stack[], order, status.
// status "draft" shows on Vercel preview deploys only, never on syedkm.com,
// so a case can be reviewed on its preview link before it goes live.
export type WorkCase = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  period: string;
  stack: string[];
  order: number;
  status: "draft" | "published";
  content: string;
};

const ROOT = path.join(process.cwd(), "public", "work");
const showDrafts = process.env.VERCEL_ENV !== "production";

function read(slug: string): WorkCase | null {
  const file = path.join(ROOT, slug, "content", "content.md");
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const status = data.status === "published" ? "published" : "draft";
  if (status === "draft" && !showDrafts) return null;
  return {
    slug,
    title: data.title,
    summary: data.summary,
    role: data.role,
    period: data.period,
    stack: data.stack ?? [],
    order: data.order ?? 99,
    status,
    content,
  };
}

export function getWorkCases(): WorkCase[] {
  if (!fs.existsSync(ROOT)) return [];
  return fs
    .readdirSync(ROOT)
    .map(read)
    .filter((c): c is WorkCase => c !== null)
    .sort((a, b) => a.order - b.order);
}

export function getWorkCase(slug: string): WorkCase {
  const found = read(slug);
  if (!found) notFound();
  return found;
}
