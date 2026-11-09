"use client";

import Link from "next/link";
import { Menu, X, HeartHandshake } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/upcoming-events" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <HeartHandshake className="h-5 w-5" />
          </div>

          <span className="text-xl font-bold tracking-tight">
            Kindora
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-emerald-600"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>

          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/register">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t bg-background px-4 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-emerald-600"
              >
                {link.name}
              </Link>
            ))}

            <div className="flex flex-col gap-2 border-t pt-4">
              <Button variant="outline" asChild>
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </Button>

              <Button
                asChild
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}