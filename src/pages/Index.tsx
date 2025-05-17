
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Converter from "@/components/Converter";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mesh-bg">
        <Navbar />
        <Hero />
      </div>
      <Features />
      <HowItWorks />
      <Converter />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
