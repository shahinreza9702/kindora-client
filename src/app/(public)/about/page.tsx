
import Link from "next/link";
import {
  HeartHandshake,
  Target,
  Eye,
  Users,
  CalendarCheck,
  ArrowRight,
  HandHeart,
  Sprout,
  Globe2,
} from "lucide-react";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const values = [
  {
    icon: HeartHandshake,
    title: "Compassion",
    description:
      "We believe every act of kindness matters and can make a meaningful difference in someone's life.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We bring people together to build stronger, more connected, and supportive communities.",
  },
  {
    icon: Sprout,
    title: "Positive Impact",
    description:
      "We encourage meaningful initiatives that create positive and lasting change.",
  },
];

const steps = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Discover Events",
    description:
      "Explore upcoming volunteering and social development events in your community.",
  },
  {
    number: "02",
    icon: HandHeart,
    title: "Join a Cause",
    description:
      "Find an initiative that matches your interests and become part of the team.",
  },
  {
    number: "03",
    icon: Globe2,
    title: "Make an Impact",
    description:
      "Work together with others and contribute to meaningful community change.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-600/10 px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                <HeartHandshake className="h-4 w-4" />
                About Kindora
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Small Acts.
                <span className="mt-2 block text-emerald-600 dark:text-emerald-400">
                  Meaningful Change.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Kindora is a community-driven platform that connects
                passionate people with meaningful volunteering opportunities
                and social development initiatives.
              </p>

              <Link
                href="/upcoming-events"
                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Explore Events
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Who We Are
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Bringing People Together for a Better Tomorrow
            </h2>

            <p className="mt-6 leading-8 text-muted-foreground">
              Kindora provides a space where individuals can discover
              community initiatives, organize social service events, and
              participate in causes that matter to them.
            </p>

            <p className="mt-4 leading-8 text-muted-foreground">
              Whether it is cleaning a neighborhood, planting trees,
              supporting people in need, or spreading awareness, we believe
              collective action can help create stronger communities.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-border bg-emerald-600/5 p-8 sm:p-12">
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-600/10 blur-3xl" />

            <HeartHandshake className="relative h-16 w-16 text-emerald-600 dark:text-emerald-400" />

            <h3 className="relative mt-8 text-2xl font-bold">
              Together, We Can Make a Difference
            </h3>

            <p className="relative mt-4 leading-8 text-muted-foreground">
              Every person has something valuable to contribute. Kindora
              makes it easier to turn good intentions into meaningful
              community action.
            </p>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="border-y border-border bg-muted/30">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8">
            <article className="rounded-2xl border border-border bg-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400">
                <Target className="h-6 w-6" />
              </div>

              <h2 className="mt-6 text-2xl font-bold">Our Mission</h2>

              <p className="mt-4 leading-8 text-muted-foreground">
                To connect people with opportunities to volunteer,
                collaborate, and contribute to social development through
                accessible community initiatives.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400">
                <Eye className="h-6 w-6" />
              </div>

              <h2 className="mt-6 text-2xl font-bold">Our Vision</h2>

              <p className="mt-4 leading-8 text-muted-foreground">
                To inspire a culture of kindness and collaboration where
                people actively participate in building stronger and more
                sustainable communities.
              </p>
            </article>
          </div>
        </section>

        {/* Core Values */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              What Matters to Us
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Core Values
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              The principles that guide our community and everything we
              encourage people to do.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-2xl border border-border bg-card p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold">
                    {value.title}
                  </h3>

                  <p className="mt-3 leading-7 text-muted-foreground">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section className="border-y border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Get Involved
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How Kindora Works
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <article key={step.number} className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                      <Icon className="h-7 w-7" />
                    </div>

                    <p className="mt-5 text-sm font-bold tracking-widest text-emerald-600 dark:text-emerald-400">
                      {step.number}
                    </p>

                    <h3 className="mt-2 text-xl font-semibold">
                      {step.title}
                    </h3>

                    <p className="mx-auto mt-3 max-w-sm leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Be Part of Something Meaningful
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-muted-foreground">
            Discover opportunities, connect with people, and take your first
            step toward making a positive difference.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/upcoming-events"
              className="rounded-xl bg-emerald-700 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Browse Events
            </Link>

            <Link
              href="/register"
              className="rounded-xl border border-border px-7 py-3.5 text-sm font-semibold transition hover:border-emerald-600 hover:text-emerald-600"
            >
              Join Kindora
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
