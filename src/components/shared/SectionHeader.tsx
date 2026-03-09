import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  heading: string;
  subheading?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  label,
  heading,
  subheading,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && "text-center", className)}>
      {label && (
        <p className="section-label mb-3">{label}</p>
      )}
      <h2 className="section-heading mb-4">{heading}</h2>
      {subheading && (
        <p className={cn(
          "text-base text-primary-text/70 leading-relaxed",
          centered ? "max-w-2xl mx-auto" : "max-w-2xl"
        )}>
          {subheading}
        </p>
      )}
    </div>
  );
}
