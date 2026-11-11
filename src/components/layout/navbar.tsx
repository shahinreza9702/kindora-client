
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  HeartHandshake,
  CalendarPlus,
  ClipboardList,
  CalendarCheck,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/upcoming-events" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const dashboardLinks = [
  {
    name: "Create Event",
    href: "/create-event",
    icon: CalendarPlus,
  },
  {
    name: "Manage Events",
    href: "/manage-events",
    icon: ClipboardList,
  },
  {
    name: "Joined Events",
    href: "/joined-events",
    icon: CalendarCheck,
  },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout failed.");
        return;
      }

      setIsMenuOpen(false);
      toast.success("Logged out successfully.");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const avatarFallback = user?.name
    ?.trim()
    .charAt(0)
    .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white transition-transform group-hover:scale-105">
            <HeartHandshake className="h-5 w-5" />
          </div>

          <span className="text-xl font-bold tracking-tight text-foreground">
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

          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-muted" />
          ) : user ? (
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border p-1 pr-3 transition-colors hover:bg-muted"
                aria-label="Open profile menu"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white">
                    {avatarFallback}
                  </div>
                )}

                <span className="max-w-28 truncate text-sm font-medium">
                  {user.name}
                </span>
              </button>

              {/* Profile Dropdown */}
              <div className="invisible absolute right-0 top-full z-50 w-56 translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="rounded-xl border bg-background p-2 shadow-lg">
                  <div className="border-b px-3 py-2">
                    <p className="truncate text-sm font-semibold">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  <div className="py-2">
                    {dashboardLinks.map((link) => {
                      const Icon = link.icon;

                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
                        >
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>

                  <div className="border-t pt-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-950/30"
                    >
                      <LogOut className="h-4 w-4" />
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>

              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
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

            <div className="flex flex-col gap-3 border-t pt-4">
              {isPending ? (
                <div className="h-10 animate-pulse rounded-lg bg-muted" />
              ) : user ? (
                <>
                  <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white">
                        {avatarFallback}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {dashboardLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 text-sm font-medium text-muted-foreground transition-colors hover:text-emerald-600"
                      >
                        <Icon className="h-4 w-4" />
                        {link.name}
                      </Link>
                    );
                  })}

                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full text-red-600 hover:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </Button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
