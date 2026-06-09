import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyHireMeSection } from "@/components/sections/WhyHireMeSection";

export const metadata: Metadata = {
  title: "John Mark R. Adora | Portfolio",
  description:
    "Portfolio homepage for John Mark R. Adora, introducing his software development background, strengths, and education.",
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <WhyHireMeSection />
      <EducationSection />
    </main>
  );
}
