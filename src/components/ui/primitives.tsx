import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "light" | "outline-light";
  size?: "md" | "lg";
  arrow?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

const base =
  "group inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap cursor-pointer transition-[background-color,border-color,color,box-shadow] duration-200 ease-out active:translate-y-px";
const variants = {
  primary: "bg-ink text-white hover:bg-[#262c31] shadow-[0_1px_0_rgb(255_255_255/0.08)_inset]",
  secondary: "border border-line-strong bg-white text-ink hover:border-ink-3 hover:bg-surface",
  ghost: "text-ink-2 hover:text-ink",
  /* auf dunklem Grund */
  light: "bg-white text-ink hover:bg-gold-50",
  "outline-light": "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
};
const sizes = { md: "h-10 px-4 text-sm", lg: "h-12 px-6 text-[15px]" };

/** Link im Button-Stil. Externe Ziele und mailto öffnen ohne Next-Router. */
export function Button({ href, variant = "primary", size = "md", arrow = false, className = "", children, ...rest }: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
    </>
  );
  if (href.startsWith("#") || href.startsWith("/")) {
    return (
      <Link href={href} className={cls} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...rest}>
      {content}
    </a>
  );
}

export function SectionHeader({ eyebrow, title, text, align = "left", id, tone = "light" }: { eyebrow?: string; title: ReactNode; text?: ReactNode; align?: "left" | "center"; id?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`} data-reveal>
      {eyebrow && <p className={`eyebrow mb-4 ${dark ? "text-gold-300" : ""}`}>{eyebrow}</p>}
      <h2 id={id} className={`display text-[2.25rem] sm:text-[2.75rem] lg:text-[3.1rem] ${dark ? "text-white" : ""}`}>
        {title}
      </h2>
      {text && <p className={`mt-5 text-[17px] leading-relaxed ${dark ? "text-white/70" : "text-ink-2"}`}>{text}</p>}
    </div>
  );
}
