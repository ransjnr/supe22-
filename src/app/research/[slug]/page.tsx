import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getAllSlugs, getPostBySlug } from "@/lib/mdx";
import { mdxComponents } from "@/lib/mdx-components";
import { formatDate } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { meta } = getPostBySlug(params.slug);
    return {
      title: meta.title,
      description: meta.summary,
      openGraph: {
        title: meta.title,
        description: meta.summary,
        type: "article",
        publishedTime: meta.date,
        tags: meta.tags,
      },
    };
  } catch {
    return { title: "Post not found" };
  }
}

export default function ResearchPost({ params }: Props) {
  let meta;
  let source;

  try {
    const result = getPostBySlug(params.slug);
    meta = result.meta;
    source = result.source;
  } catch {
    notFound();
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container-max section-padding">
        {/* Back link */}
        <Link
          href="/research"
          className="inline-flex items-center gap-2 text-sm text-primary-text/60 hover:text-accent transition-colors mb-10"
        >
          <ArrowLeft size={15} />
          Back to Research
        </Link>

        <article className="max-w-3xl">
          {/* Header */}
          <header className="mb-10 pb-8 border-b border-border-subtle">
            <p className="section-label mb-3">{meta.category}</p>
            <h1 className="font-serif text-3xl md:text-4xl text-primary-text leading-tight mb-4">
              {meta.title}
            </h1>
            <p className="text-base text-primary-text/65 leading-relaxed mb-6">{meta.summary}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-primary-text/50">
              <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {meta.readingTime}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {meta.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  <Tag size={10} className="mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* MDX Content */}
          <div className="prose prose-editorial prose-sm max-w-none">
            <MDXRemote
              source={source}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  ],
                },
              }}
            />
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-border-subtle">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Link
                href="/research"
                className="inline-flex items-center gap-2 text-sm text-primary-text/60 hover:text-accent transition-colors"
              >
                <ArrowLeft size={15} />
                All research posts
              </Link>
              <Link href="/contact" className="btn-primary text-sm">
                Get in touch
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
