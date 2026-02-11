import HeroSection from "@/components/HeroSection";
import DualEngineSection from "@/components/DualEngineSection";
import ModulesSection from "@/components/ModulesSection";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection />
      <StatsSection />
      <DualEngineSection />
      <ModulesSection />
      <CTASection />
    </main>
  );
};

export default Index;
