import AnimateOnScroll from './AnimateOnScroll';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Upload your image",
    description: "Upload a clear image of the object you want to convert to 3D. Our system works best with well-lit photos from multiple angles.",
    color: "from-indigo-500 to-blue-600",
    icon: "📷"
  },
  {
    number: "02",
    title: "AI processes your image",
    description: "Our advanced neural networks analyze the image, detect edges, and estimate depth of your object.",
    color: "from-purple-500 to-indigo-600",
    icon: "🧠"
  },
  {
    number: "03",
    title: "Prompt a model",
    description: "Prompt to generate a custom tool, device, or accessory and we will build you a 3D model automatically.",
    color: "from-fuchsia-500 to-purple-600",
    icon: "💬"
  },
  {
    number: "04",
    title: "Download or use",
    description: "Download your 3D model in your preferred format, ready to use in games, AR/VR applications, 3D printing, or any other project.",
    color: "from-pink-500 to-fuchsia-600",
    icon: "📥"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-black/30" id="how-it-works">
      {/* Animated dots background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse ${Math.random() * 5 + 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <div className="container relative z-10">
        <AnimateOnScroll animation="animate-fade-in translate-y-0" className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our streamlined process makes converting images to 3D models simple, 
            fast, and accurate.
          </p>
        </AnimateOnScroll>
        
        <div className="max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <AnimateOnScroll 
              key={i}
              animation={i % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right"}
              delay={150 * i}
              threshold={0.1}
              className="mb-12 last:mb-0"
            >
              <div className="flex flex-col md:flex-row items-start">
                <div className="flex-shrink-0 mr-8 mb-4 md:mb-0">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg shadow-primary/20 animate-breathe`} style={{ animationDelay: `${i * 0.2}s` }}>
                    <span className="text-white font-bold text-2xl">{step.icon}</span>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                  
                  {i < steps.length - 1 && (
                    <div className="flex items-center mt-6 mb-6">
                      <div className="h-0.5 bg-gradient-to-r from-indigo-500/50 to-transparent flex-grow" />
                      <ArrowRight className="mx-2 text-indigo-500/50 animate-bounce-slow" />
                    </div>
                  )}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-10" />
    </section>
  );
};

export default HowItWorks;
