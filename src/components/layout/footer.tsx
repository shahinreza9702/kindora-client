
import Link from "next/link";
import {
  HeartHandshake,
  ArrowRight,
  Heart,
} from "lucide-react";

const footerLinks = {
  explore: [
    { name: "Home", href: "/" },
    { name: "Upcoming Events", href: "/upcoming-events" },
    { name: "About Us", href: "/about" },
  ],
  account: [
    { name: "Login", href: "/login" },
    { name: "Get Started", href: "/register" },
    { name: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <HeartHandshake className="h-6 w-6" />
              </div>

              <span className="text-2xl font-bold tracking-tight text-foreground">
                Kindora
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
              Connect with passionate people, discover meaningful
              volunteering opportunities, and create positive
              change in your community.
            </p>

            <Link
              href="/upcoming-events"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
            >
              Explore opportunities
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-semibold text-foreground">
              Explore
            </h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-emerald-600"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="font-semibold text-foreground">
              Get Involved
            </h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.account.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-emerald-600"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kindora. All rights reserved.
          </p>

          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with
            <Heart className="h-4 w-4 fill-emerald-600 text-emerald-600" />
            for stronger communities.
          </p>
        </div>
      </div>
    </footer>
  );
}
