import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import ModelViewer3D from '@/components/ModelViewer3D';

const ModelViewer = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get the image data from location state
  const imageData = location.state?.imageData;
  
  useEffect(() => {
    if (!imageData) {
      setError('No image data provided');
      setLoading(false);
      return;
    }
    
    // Simulate model generation
    const timer = setTimeout(() => {
      setLoading(false);
      toast({
        title: "3D Model Generated",
        description: "Your 3D model is ready to view and download.",
      });
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [imageData, toast]);
  
  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your 3D model will download shortly.",
    });
    // In a real app, this would trigger an actual download
  };
  
  const handleGoBack = () => {
    navigate('/');
  };
  
  const handleRetry = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container max-w-5xl">
          <Button 
            variant="ghost" 
            className="mb-6 -ml-2" 
            onClick={handleGoBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to camera
          </Button>
          
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-6 md:p-8 space-y-6">
            <h1 className="text-2xl font-bold">Your 3D Model</h1>
            
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden flex items-center justify-center">
              {loading ? (
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Generating your 3D model...</p>
                </div>
              ) : error ? (
                <div className="text-center text-muted-foreground p-6">
                  <p className="mb-4">{error}</p>
                  <Button variant="outline" onClick={handleRetry}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try again
                  </Button>
                </div>
              ) : (
                // 3D Model viewer instead of placeholder
                <div className="w-full h-full">
                  <ModelViewer3D modelPath="/prosthetic-arm.glb" />
                </div>
              )}
            </div>
            
            {!loading && !error && (
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Generated from your captured image</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleRetry}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Capture new image
                  </Button>
                  <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download model
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ModelViewer; 