import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className = "", wide = false, children }: { className?: string; wide?: boolean; children: ReactNode }) {
  return <div className={`mx-auto w-full ${wide ? "max-w-[1440px]" : "max-w-[1240px]"} px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "light" | "outline-light" | "ghost";
  size?: "md" | "lg";
  arrow?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-[5px] font-medium tracking-[-0.01em] whitespace-nowrap cursor-pointer transition-[background-color,border-color,color] duration-200 ease-out";
const variants = {
  /* auf hell */
  primary: "bg-ink text-white hover:bg-[#2a2e32]",
  secondary: "border border-line-strong text-ink hover:border-ink",
  ghost: "text-ink-2 hover:text-ink",
  /* auf dunkel */
  light: "bg-white text-ink hover:bg-gold-50",
  "outline-light": "border border-white/20 text-white hover:border-white/55",
};
const sizes = { md: "h-10 px-4 text-sm", lg: "h-[52px] px-6 text-[15px]" };

/** Link im Button-Stil. Interne Ziele über den Next-Router, alles andere als normaler Link. */
export function Button({ href, variant = "primary", size = "md", arrow = false, className = "", children, ...rest }: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />}
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

/**
 * Abschnittskopf im Stil eines technischen Dokuments: Nummer und Thema in Monospace, darunter eine große Headline.
 * Auf dunklem Grund steht der Abschnitt in einem Element mit der Klasse „on-dark“.
 */
export function SectionHead({
  no,
  label,
  title,
  text,
  id,
  align = "left",
  className = "",
  size = "lg",
}: {
  no?: string;
  label: string;
  title: ReactNode;
  text?: ReactNode;
  id?: string;
  align?: "left" | "center";
  className?: string;
  size?: "md" | "lg" | "xl";
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} ${className}`} data-reveal>
      <p className={`label flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        {no && <span>{no}</span>}
        {no && <span aria-hidden className="h-px w-8 bg-current opacity-60" />}
        <span>{label}</span>
      </p>
      <h2 id={id} className={`display mt-6 ${size === "xl" ? "text-[clamp(2.4rem,7vw,5.25rem)]" : size === "md" ? "text-[clamp(2.2rem,4.2vw,3.4rem)]" : "text-[clamp(2.2rem,5.4vw,4.1rem)]"}`}>
        {title}
      </h2>
      {text && <p className={`lead mt-6 max-w-[34rem] ${align === "center" ? "mx-auto" : ""}`}>{text}</p>}
    </div>
  );
}
