"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface BrandButtonProps {
    href: string;
    children: ReactNode;
    variant?: "primary" | "secondary";
    className?: string;
}

export default function BrandButton({
    href,
    children,
    variant = "primary",
    className = "",
}: BrandButtonProps) {
    const base =
        "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl";

    const styles =
        variant === "primary"
            ? "bg-gradient-to-r from-gold to-amber-400 text-navy shadow-lg shadow-gold/20"
            : "border border-white/55 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20";

    return (
        <Link href={href} className={`${base} ${styles} ${className}`}>
            {children}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
    );
}
