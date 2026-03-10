import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { mdxComponents } from "./mdx-components";

/**
 * Server-side MDX renderer.
 *
 * next-mdx-remote/rsc creates the MDXContent component via Reflect.construct
 * and returns React.createElement(Content, ...) — a React element whose `type`
 * is a plain function.  React 19 RSC refuses to serialise such elements across
 * the server→client boundary, throwing "Functions cannot be passed directly to
 * Client Components".
 *
 * The fix: compile + run the MDX with @mdx-js/mdx directly, then CALL the
 * resulting component as a plain function.  This executes it entirely on the
 * server and returns a JSX tree of primitives + proper Client Component
 * references — fully serialisable by React 19.
 */
export async function MDXRenderer({ source }: { source: string }) {
  const { default: Content } = await evaluate(source, {
    ...(runtime as Parameters<typeof evaluate>[1]),
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
    ],
  });

  // Call as a function rather than returning React.createElement(Content, ...)
  // so the component is fully rendered server-side and no function reference
  // ever crosses the RSC serialisation boundary.
  return Content({ components: mdxComponents });
}
