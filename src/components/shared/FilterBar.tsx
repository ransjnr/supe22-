"use client";

import { cn } from "@/lib/utils";

interface FilterBarProps {
  options: string[];
  active: string;
  onChange: (value: string) => void;
}

export default function FilterBar({ options, active, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter options">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          aria-pressed={active === option}
          className={cn(
            "px-4 py-1.5 text-sm font-medium rounded-sm border transition-all duration-150",
            active === option
              ? "bg-accent text-white border-accent"
              : "bg-white text-primary-text border-border-subtle hover:border-accent hover:text-accent"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
