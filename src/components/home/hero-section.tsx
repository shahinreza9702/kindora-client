
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  HeartHandshake,
  Leaf,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8">
        {/* Left Content */}
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-600/10 px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
            <Heart className="h-4 w-4" />
            Together, We Make a Difference
          </div>

          <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Small Acts,
            <span className="block text-emerald-600">
              Big Changes.
            </span>
            Stronger Communities.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground sm:text-lg">
            Join hands with passionate people, participate in
            meaningful community events, and turn your kindness
            into real-world impact.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-emerald-600 text-white transition-colors hover:bg-emerald-700"
            >
              <Link href="/upcoming-events">
                Explore Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
            >
              <Link href="/register">
                Become a Volunteer
                <HeartHandshake className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Community Highlights */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-5 border-t pt-7">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-emerald-600" />
              <div>
                <p className="font-semibold text-foreground">
                  Community
                </p>
                <p className="text-xs text-muted-foreground">
                  Together as one
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <HeartHandshake className="h-6 w-6 text-emerald-600" />
              <div>
                <p className="font-semibold text-foreground">
                  Volunteering
                </p>
                <p className="text-xs text-muted-foreground">
                  Give your time
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative rounded-[2rem] border bg-muted/40 p-5 shadow-xl sm:p-8">
            <div className="rounded-3xl bg-emerald-600 p-8 text-white sm:p-10">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-medium">
                  Make an Impact
                </span>
                <HeartHandshake className="h-8 w-8" />
              </div>

              <div className="py-12 text-center">
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-white/30 bg-white/10">
                  <HeartHandshake className="h-16 w-16" />
                </div>

                <h2 className="mt-7 text-3xl font-bold">
                  Kindness Connects Us
                </h2>

                <p className="mt-3 text-sm leading-6 text-emerald-50">
                  Every helping hand brings us closer to a
                  better tomorrow.
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/20 pt-5">
                <span className="text-sm text-emerald-50">
                  One community
                </span>
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <Leaf className="h-4 w-4" />
                  Positive Change
                </span>
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-lg sm:-left-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                <Heart className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">
                  Spread Kindness
                </p>
                <p className="text-xs text-muted-foreground">
                  Change starts with you
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
