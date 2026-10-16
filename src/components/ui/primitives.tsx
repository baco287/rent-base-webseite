import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className = "", wide = false, children }: { className?: string; wide?: boolean; children: ReactNode }) {
  return <div className={`mx-auto w-full ${wide ? "max-w-[1680px] 2xl:px-16" : "max-w-[1240px]"} px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "light" | "outline-light" | "ghost" | "gold" | "outline-gold";
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
  "outline-light": "border border-white/25 text-white hover:border-white/60 hover:bg-white/[0.04]",
  /* Gold wie im Referenzbild: Hauptknopf gefüllt, in der Kopfzeile als Kontur */
  gold: "btn-gold",
  "outline-gold": "border border-gold-400/80 text-gold-300 hover:border-gold-300 hover:bg-gold-300/[0.06]",
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
 * Abschnittskopf wie im Referenzbild: goldenes Label in Versalien, darunter eine kräftige Headline.
 * Auf dunklem Grund steht der Abschnitt in einem Element mit der Klasse „on-dark“.
 */
export function SectionHead({
  label,
  title,
  text,
  id,
  align = "left",
  className = "",
  size = "lg",
}: {
  /** veraltet: Abschnittsnummern werden in V3 nicht mehr angezeigt */
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
      <p className={`label ${align === "center" ? "text-center" : ""}`}>{label}</p>
      <h2 id={id} className={`display mt-5 ${size === "xl" ? "text-[clamp(2.3rem,5.6vw,4.6rem)]" : size === "md" ? "text-[clamp(2rem,3.6vw,3rem)]" : "text-[clamp(2.15rem,4.4vw,3.6rem)]"}`}>
        {title}
      </h2>
      {text && <p className={`lead mt-6 max-w-[34rem] ${align === "center" ? "mx-auto" : ""}`}>{text}</p>}
    </div>
  );
}
