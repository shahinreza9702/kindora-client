
import { ArrowRight, Mail } from "lucide-react";

export function NewsletterSection() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-emerald-700 px-6 py-14 text-white sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
          {/* Content */}
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
              <Mail className="h-6 w-6" />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Stay Connected.
              <span className="block text-emerald-200">
                Stay Inspired.
              </span>
            </h2>

            <p className="mt-5 max-w-lg leading-7 text-emerald-50">
              Discover upcoming volunteering opportunities,
              community stories, and new ways to make a
              difference.
            </p>
          </div>

          {/* Newsletter UI */}
          <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm sm:p-8">
            <h3 className="text-xl font-semibold">
              Join Our Community
            </h3>

            <p className="mt-2 text-sm leading-6 text-emerald-50">
              Get updates and inspiring stories delivered
              to your inbox.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email address"
                aria-label="Email address"
                disabled
                className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-emerald-100/70 disabled:cursor-not-allowed disabled:opacity-80"
              />

              <button
                type="button"
                disabled
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-800 transition-colors disabled:cursor-not-allowed disabled:opacity-90"
              >
                Coming Soon
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-4 text-xs text-emerald-100">
              Newsletter subscriptions will be available soon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
