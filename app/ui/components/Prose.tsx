import Link from "next/link";
import { Fragment } from "react";
import { RichText } from "@/app/lib/definitions";

// Renders copy stored as segments in constants.ts. Accent runs are coloured;
// segments carrying an href become links. Callers pass accentClassName because
// the Hero bolds its accents and the About section does not.
export function Prose({
  segments,
  accentClassName = "dark:text-accent-dark text-accent",
}: {
  segments: RichText;
  accentClassName?: string;
}): JSX.Element {
  return (
    <>
      {segments.map((segment, index) => {
        const body = segment.accent ? (
          <span className={accentClassName}>{segment.text}</span>
        ) : (
          segment.text
        );

        return segment.href ? (
          <Link
            key={index}
            href={segment.href}
            className="underline decoration-blue-500"
          >
            {body}
          </Link>
        ) : (
          <Fragment key={index}>{body}</Fragment>
        );
      })}
    </>
  );
}
