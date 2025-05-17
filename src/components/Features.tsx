
import { cn } from '@/lib/utils';
import { LayoutGrid, Image, Layers, Download } from 'lucide-react';
import AnimateOnScroll from './AnimateOnScroll';

const features = [
  {
    icon: Image,
    title: "Simple Image Upload",
    description: "Just upload any image of an object and our AI will analyze it from all angles."
  },
  {
    icon: Layers,
    title: "Advanced 3D Conversion",
    description: "Our algorithms transform your 2D image into a detailed 3D model with accurate textures."
  },
  {
    icon: LayoutGrid,
    title: "Real-time Editing",
    description: "Fine-tune your 3D model right in the browser with our intuitive editing tools."
  },
  {
    icon: Download,
    title: "Multiple Export Formats",
    description: "Download your 3D models in various formats compatible with all major 3D software."
  }
];

const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="features">
      <div className="container relative z-10">
        <AnimateOnScroll animation="animate-fade-in translate-y-0" className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our cutting-edge technology makes 3D modeling accessible to everyone, 
            no technical expertise required.
          </p>
        </AnimateOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <AnimateOnScroll 
              key={i}
              animation="animate-fade-in scale-100"
              delay={100 * (i + 1)}
              threshold={0.2}
            >
              <div 
                className={cn(
                  "group relative p-6 rounded-xl",
                  "bg-secondary/50 backdrop-blur-sm border border-border/50",
                  "transition-all duration-500 hover:-translate-y-2",
                  "hover:shadow-lg hover:shadow-primary/10"
                )}
              >
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                <div className="relative bg-secondary/80 backdrop-blur-sm rounded-lg p-6">
                  <div className="mb-4 bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 right-0 h-96 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 -z-10 transform -translate-y-1/2 skew-y-3" />
    </section>
  );
};

export default Features;
