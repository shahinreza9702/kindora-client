
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Clock,
  HeartHandshake,
  LoaderCircle,
} from "lucide-react";
import { toast } from "sonner";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialForm: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (message.length < 10) {
      toast.error("Message must be at least 10 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Frontend demo only: no backend request is made.
      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.success("Thank you! Your demo submission was successful.");

      setForm(initialForm);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <section className="border-b border-border bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-600/10 px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
              <MessageCircle className="h-4 w-4" />
              Get in Touch
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s Start a
              <span className="mt-2 block text-emerald-600 dark:text-emerald-400">
                Conversation.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl leading-8 text-muted-foreground sm:text-lg">
              Have a question, suggestion, or idea? We would love to hear
              from you. Get in touch and let&apos;s make a difference together.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:px-8">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Contact Information
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              We&apos;re Here to Help
            </h2>

            <p className="mt-4 leading-8 text-muted-foreground">
              Whether you want to learn more about Kindora, share feedback,
              or explore community initiatives, this page is a place to start.
            </p>

            <div className="mt-10 space-y-7">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400">
                  <Mail className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Use the contact form to share your message with us.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold">Community</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Connect with people and initiatives in your local area.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400">
                  <Clock className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold">Response</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    This demonstration form does not send or store messages.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-emerald-600/20 bg-emerald-600/5 p-6">
              <div className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-400">
                <HeartHandshake className="h-5 w-5" />
                Want to get involved?
              </div>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Explore upcoming community events and find a cause that
                matters to you.
              </p>

              <Link
                href="/upcoming-events"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400"
              >
                Explore Events
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-2xl font-bold">Send Us a Message</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Fill out the form below. All fields are required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Your Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    minLength={2}
                    maxLength={80}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  minLength={3}
                  maxLength={120}
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Your Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={7}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                />

                <p className="mt-2 text-right text-xs text-muted-foreground">
                  {form.message.length}/2000 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="text-xs leading-6 text-muted-foreground">
                Demo only: submitting this form displays a confirmation
                message but does not deliver or save your message.
              </p>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
