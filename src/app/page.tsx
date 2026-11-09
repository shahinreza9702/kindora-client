import { FeaturesSection } from "@/components/home/features-section";
import { GallerySection } from "@/components/home/gallery-section";
import { HeroSection } from "@/components/home/hero-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { ImpactSection } from "@/components/home/impact-section";
import { RecentEventsSection } from "@/components/home/recent-events-section";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <RecentEventsSection />
        <ImpactSection />
        <GallerySection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}