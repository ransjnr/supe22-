import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="font-serif text-3xl text-accent mt-8 mb-4 leading-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-serif text-2xl text-accent mt-8 mb-3 leading-snug border-b border-border-subtle pb-2">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-serif text-xl text-accent mt-6 mb-2">
      {children}
    </h3>
  ),
  a: ({ href, children }) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold underline underline-offset-2 hover:text-accent transition-colors"
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href ?? "#"}
        className="text-gold underline underline-offset-2 hover:text-accent transition-colors"
      >
        {children}
      </Link>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gold pl-5 py-1 my-6 italic text-accent/80 bg-gold/5 pr-4 rounded-r-sm">
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="bg-stone-100 text-accent border border-stone-200 rounded px-1.5 py-0.5 text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse border border-border-subtle text-sm">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-border-subtle px-4 py-2 bg-accent/5 text-left font-semibold text-accent">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-border-subtle px-4 py-2">{children}</td>
  ),
  hr: () => <hr className="border-border-subtle my-8" />,
};
