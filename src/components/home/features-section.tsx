
import {
  CalendarDays,
  HandHeart,
  MapPin,
  Users,
} from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Discover Events",
    description:
      "Explore upcoming community events and find meaningful opportunities to make a difference.",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  },
  {
    icon: HandHeart,
    title: "Make an Impact",
    description:
      "Participate in social initiatives and contribute your time and skills to meaningful causes.",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  },
  {
    icon: Users,
    title: "Build Community",
    description:
      "Connect with like-minded people and work together to create stronger communities.",
    color: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400",
  },
  {
    icon: MapPin,
    title: "Support Locally",
    description:
      "Find volunteering opportunities in your area and bring positive change to your neighborhood.",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-emerald-600/10 px-4 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            Why Choose Kindora?
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Making a Difference,
            <span className="text-emerald-600">
              {" "}Together.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground">
            We make it easier for people to discover opportunities,
            connect with communities, and turn good intentions
            into meaningful actions.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600/40 hover:shadow-lg"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color}`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
