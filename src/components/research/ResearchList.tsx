"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import FilterBar from "@/components/shared/FilterBar";
import ResearchCard from "@/components/shared/ResearchCard";
import type { ResearchPostMeta } from "@/types";

interface ResearchListProps {
  posts: ResearchPostMeta[];
  categories: string[];
}

export default function ResearchList({ posts, categories }: ResearchListProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    let result = posts;

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [posts, activeCategory, search]);

  return (
    <>
      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-text/40" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts by title, topic, or tag…"
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-border-subtle rounded-sm
                     focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold bg-white"
        />
      </div>

      {/* Filter */}
      <FilterBar
        options={["All", ...categories]}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      {/* Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((post) => (
          <ResearchCard key={post.slug} post={post} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-sm text-primary-text/50 py-8">
            No posts found for &quot;{search}&quot;.
          </p>
        )}
      </div>
    </>
  );
}
