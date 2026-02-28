import { Metadata } from "next";
import LandingPageClient from "@/components/landing/client-page";

export const metadata: Metadata = {
  title: "StudyG — Focus Deeply, Learn Faster",
  description:
    "Transform your digital habits. Block distractions instantly and turn wasted screen time into effortless learning mastery with FSRS algorithms.",
};

export default function HomePage() {
  return <LandingPageClient />;
}
