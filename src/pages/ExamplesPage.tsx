
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const examples = [
  {
    name: "Coffee Cup",
    category: "Household",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800",
    description: "Generated from a single image, this 3D model includes precise handle curvature and texture details."
  },
  {
    name: "Desk Chair",
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800",
    description: "Complex office chair with articulated arms and accurate proportions created from multiple reference images."
  },
  {
    name: "Sneakers",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800",
    description: "Athletic shoes with detailed texture mapping and complex curves, ready for virtual try-on applications."
  },
  {
    name: "Vintage Camera",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800",
    description: "Antique camera with intricate details and working mechanical parts that can be animated."
  },
  {
    name: "Potted Plant",
    category: "Decor",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800",
    description: "Organic plant model with realistic leaf structures and detailed pot texturing."
  },
  {
    name: "Guitar",
    category: "Instruments",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800",
    description: "Acoustic guitar with string details and wood grain texturing captured from reference photos."
  }
];

const ExamplesPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <section className="pt-32 pb-16 mesh-bg relative">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              See <span className="gradient-text">Prompt2CAD</span> in Action
            </h1>
            <p className="text-xl text-muted-foreground">
              Browse our gallery of 2D to 3D conversions and see the quality of models our technology can produce.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {examples.map((example, i) => (
              <div 
                key={i} 
                className="group relative bg-secondary/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={example.image} 
                    alt={example.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute top-3 left-3 bg-black/60 text-xs px-2 py-1 rounded-md">
                    {example.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{example.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{example.description}</p>
                  
                  <Button variant="ghost" size="sm" className="group-hover:text-primary transition-colors">
                    View 3D Model <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" className="px-6">
              Load More Examples
            </Button>
          </div>
        </div>
      </section>
      
      <CTA />
      <Footer />
    </div>
  );
};

export default ExamplesPage;
