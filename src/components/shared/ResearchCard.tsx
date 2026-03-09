"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { formatDateShort } from "@/lib/utils";
import type { ResearchPostMeta } from "@/types";

interface ResearchCardProps {
  post: ResearchPostMeta;
}

export default function ResearchCard({ post }: ResearchCardProps) {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="card-base group flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="section-label text-xs">{post.category}</span>
        <div className="flex items-center gap-1 text-xs text-primary-text/40">
          <Clock size={11} />
          {post.readingTime}
        </div>
      </div>

      <Link href={`/research/${post.slug}`} className="flex-1 flex flex-col">
        <h3 className="font-serif text-lg text-primary-text leading-snug mb-2 group-hover:text-accent transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-primary-text/70 leading-relaxed mb-4 flex-1">
          {post.summary}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
          <time className="text-xs text-primary-text/40">{formatDateShort(post.date)}</time>
          <span className="flex items-center gap-1 text-xs text-accent font-medium group-hover:gap-2 transition-all">
            Read post
            <ArrowRight size={13} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
