
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Converter from "@/components/Converter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mesh-bg">
        <Navbar />
        <Hero />
      </div>
      <HowItWorks />
      <Converter />
      <Footer />
    </div>
  );
};

export default Index;
