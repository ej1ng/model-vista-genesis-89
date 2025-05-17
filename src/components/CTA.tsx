
import { Button } from '@/components/ui/button';

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden mesh-bg">
      <div className="absolute inset-0 grid-bg opacity-10" />
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to transform your <span className="gradient-text">creative workflow</span>?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of designers, developers, and creators who are already using 
            Prompt2CAD to bring their ideas to life in 3D.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="px-8 py-6 text-lg">
              Get Started for Free
            </Button>
            
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
              View Pricing
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • Free tier includes 5 conversions per month
          </p>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default CTA;
