
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    description: "Perfect for trying out Prompt2CAD",
    price: "$0",
    features: [
      "5 model conversions per month",
      "Basic editing tools",
      "720p model quality",
      "Standard export formats (OBJ, STL)",
      "Community support"
    ]
  },
  {
    name: "Pro",
    description: "For professionals and serious creators",
    price: "$19",
    featured: true,
    features: [
      "50 model conversions per month",
      "Advanced editing tools",
      "1080p model quality",
      "All export formats",
      "Priority support",
      "Batch processing (5 at once)",
      "Custom texturing tools"
    ]
  },
  {
    name: "Enterprise",
    description: "For teams and businesses",
    price: "Custom",
    features: [
      "Unlimited model conversions",
      "4K model quality",
      "Team collaboration features",
      "API access",
      "Dedicated support",
      "Batch processing (unlimited)",
      "Custom integration options",
      "On-premise deployment available"
    ]
  }
];

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <section className="pt-32 pb-16 mesh-bg relative">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, <span className="gradient-text">transparent</span> pricing
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that's right for you and start creating amazing 3D models today.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={cn(
                  "relative rounded-xl overflow-hidden border",
                  plan.featured 
                    ? "border-primary/50 bg-secondary/80" 
                    : "border-border/50 bg-secondary/50"
                )}
              >
                {plan.featured && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="text-4xl font-bold">{plan.price}</div>
                    {plan.price !== "Custom" && (
                      <div className="text-muted-foreground text-sm">per month</div>
                    )}
                  </div>
                  
                  <Button 
                    className={cn(
                      "w-full mb-8",
                      !plan.featured && "bg-secondary-foreground hover:bg-secondary-foreground/90"
                    )}
                  >
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Button>
                  
                  <div className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start">
                        <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Need a custom solution?</h3>
            <p className="text-muted-foreground mb-6">
              We offer custom plans for large teams and specialized needs. 
              Contact our sales team to discuss your requirements.
            </p>
            <Button variant="outline" size="lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PricingPage;
