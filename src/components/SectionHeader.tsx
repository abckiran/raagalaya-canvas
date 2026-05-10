import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: Props) => (
  <div
    className={cn(
      "max-w-2xl",
      align === "center" ? "mx-auto text-center" : "text-left",
      className
    )}
  >
    {eyebrow && (
      <p className="eyebrow mb-4 flex items-center gap-3 justify-center">
        <span className="gold-divider" /> {eyebrow} <span className="gold-divider" />
      </p>
    )}
    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary leading-[1.15]">
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
        {description}
      </p>
    )}
  </div>
);

export default SectionHeader;
