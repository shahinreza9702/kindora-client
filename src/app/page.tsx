import { HeroSection } from "@/components/home/hero-section";
import { Navbar } from "@/components/layout/navbar";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
      </main>
    </>
  );
}