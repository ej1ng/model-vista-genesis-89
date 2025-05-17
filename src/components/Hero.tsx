
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import AnimateOnScroll from './AnimateOnScroll';

const Hero = () => {
  const { toast } = useToast();
  
  return (
    <div className="relative min-h-screen flex flex-col justify-center mesh-bg overflow-hidden pt-24 pb-16">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-10" />
      
      {/* Hero content */}
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <AnimateOnScroll animation="animate-fade-in translate-y-0" className="w-full">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Transform <span className="gradient-text">images</span> into stunning <span className="gradient-text">3D models</span> instantly
            </h1>
          </AnimateOnScroll>
          
          <AnimateOnScroll animation="animate-fade-in translate-y-0" delay={200} className="w-full">
            <p className="text-xl text-muted-foreground max-w-3xl mb-16">
              Prompt2CAD uses advanced AI to convert your 2D images into detailed, 
              ready-to-use 3D models in seconds. Perfect for designers, developers, and creators.
            </p>
          </AnimateOnScroll>
          
          <AnimateOnScroll animation="animate-fade-in translate-y-0" delay={400} className="w-full relative max-w-5xl">
            {/* Background glow effects */}
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-indigo-500/20 rounded-full filter blur-3xl animate-pulse-slow" />
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse-slow" />
            
            {/* Image frame */}
            <div className="relative rounded-xl overflow-hidden border border-border/50 bg-black/30 backdrop-blur-sm shadow-xl">
              <div className="p-1">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* This is where the demo video/animation would go */}
                    <div className="w-full h-full bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 flex items-center justify-center">
                      <div className="relative w-3/4 h-3/4 rounded-lg overflow-hidden shadow-2xl">
                        {/* Split view showing 2D to 3D transformation */}
                        <div className="absolute inset-0 flex">
                          <div className="w-1/2 h-full bg-cover bg-center relative" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1600)'}}>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/70" />
                            <div className="absolute bottom-4 left-4 text-sm font-medium px-2 py-1 bg-black/50 rounded-md">
                              2D Image
                            </div>
                          </div>
                          <div className="w-1/2 h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 rounded-lg animate-rotate-slow">
                              <div className="w-full h-full bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-pink-500/80 rounded-lg animate-pulse-slow transform scale-90 rotate-12" />
                            </div>
                            <div className="absolute bottom-4 right-4 text-sm font-medium px-2 py-1 bg-black/50 rounded-md">
                              3D Model
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Controls bar */}
              <div className="px-4 py-3 border-t border-border/50 bg-black/40 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-xs text-muted-foreground">Prompt2CAD Demo</div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
      
      {/* Abstract shapes */}
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full filter blur-3xl animate-float" />
    </div>
  );
};

export default Hero;
