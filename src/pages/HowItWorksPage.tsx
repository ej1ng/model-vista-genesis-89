
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <section className="pt-32 pb-16 mesh-bg relative">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How <span className="gradient-text">Prompt2CAD</span> Works
            </h1>
            <p className="text-xl text-muted-foreground">
              Our innovative approach to converting 2D images into 3D models using the latest in machine learning technology.
            </p>
          </div>
        </div>
      </section>
      
      <HowItWorks />
      
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">The Technology Behind Prompt2CAD</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Prompt2CAD uses a combination of state-of-the-art computer vision algorithms and neural networks to analyze 2D images and generate accurate 3D models.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-3">Computer Vision Analysis</h3>
                <p className="text-muted-foreground">
                  Our system first analyzes your image using advanced computer vision techniques to identify object boundaries, estimate depth information, and understand the spatial relationships of different parts of the object.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Neural Network Reconstruction</h3>
                <p className="text-muted-foreground">
                  Next, our neural networks create a detailed 3D representation based on the analyzed data, inferring the complete structure even from a single image by drawing on its training from millions of 3D models.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Texture Mapping</h3>
                <p className="text-muted-foreground">
                  The system extracts textures from your original image and intelligently maps them onto the 3D model, preserving the visual appearance of the original object.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Optimization and Refinement</h3>
                <p className="text-muted-foreground">
                  Finally, we optimize the 3D model for efficiency and usability, ensuring it's ready for your chosen application, whether that's game development, 3D printing, or AR/VR experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <CTA />
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
