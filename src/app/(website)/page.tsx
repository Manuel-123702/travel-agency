import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import TrustBadges from "@/components/sections/TrustBadges";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Destinations from "@/components/sections/Destinations";
import VisaCalculator from "@/components/sections/VisaCalculator";
import ImmigrationQuiz from "@/components/sections/ImmigrationQuiz";
import SuccessStories from "@/components/sections/SuccessStories";
import Testimonials from "@/components/sections/Testimonials";
import PricingSection from "@/components/sections/PricingSection";
import ConsultationPlanner from "@/components/sections/ConsultationPlanner";
import EvaluationForm from "@/components/sections/EvaluationForm";
import FAQSection from "@/components/sections/FAQSection";
import BlogPreview from "@/components/sections/BlogPreview";
import NewsletterCTA from "@/components/sections/NewsletterCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <TrustBadges />
      <About />
      <Services />
      <Process />
      <Destinations />
      <VisaCalculator />
      <ImmigrationQuiz />
      <SuccessStories />
      <Testimonials />
      <PricingSection />
      <ConsultationPlanner />
      <EvaluationForm />
      <FAQSection />
      <BlogPreview />
      <NewsletterCTA />
    </>
  );
}
