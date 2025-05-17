import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Converter from "@/components/Converter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mesh-bg" id="top">
        <Navbar />
        <Hero />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="converter">
        <Converter />
      </div>
    </div>
  );
};

export default Index;
