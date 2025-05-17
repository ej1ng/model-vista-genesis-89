import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, RefreshCw, Layers, Settings2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import ModelViewer3D from '@/components/ModelViewer3D';

const CustomModelViewer = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get data from location state
  const sourceImage = location.state?.sourceImage;
  const drawingImage = location.state?.drawingImage;
  
  useEffect(() => {
    if (!sourceImage || !drawingImage) {
      setError('Missing required images');
      setLoading(false);
      return;
    }
    
    // Simulate custom model generation
    const timer = setTimeout(() => {
      setLoading(false);
      toast({
        title: "Custom 3D Model Generated",
        description: "Your custom 3D model is ready to view and download.",
      });
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [sourceImage, drawingImage, toast]);
  
  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your custom 3D model will download shortly.",
    });
    // In a real app, this would trigger an actual download
  };
  
  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
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
            Back to model viewer
          </Button>
          
          {/* Custom model header */}
          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Your Custom 3D Model</h1>
                <p className="text-muted-foreground mt-1">
                  Generated based on your source image and drawing specifications
                </p>
              </div>
              
              <Button onClick={handleDownload} disabled={loading || !!error}>
                <Download className="mr-2 h-4 w-4" />
                Download Model
              </Button>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left sidebar - Source materials */}
            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold">Source Materials</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Original Image</h3>
                  <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                    {sourceImage ? (
                      <img 
                        src={sourceImage} 
                        alt="Source" 
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <p className="text-muted-foreground">No image</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Your Drawing</h3>
                  <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                    {drawingImage ? (
                      <img 
                        src={drawingImage} 
                        alt="Drawing" 
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <p className="text-muted-foreground">No drawing</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Center - 3D Model */}
            <div className="lg:col-span-2 bg-black/70 backdrop-blur-sm rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Custom 3D Model</h2>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Layers className="h-4 w-4 mr-2" />
                    Layers
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings2 className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
              
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden flex items-center justify-center">
                {loading ? (
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg font-medium mb-2">Generating Custom Model</p>
                    <p className="text-muted-foreground">This may take a few minutes...</p>
                  </div>
                ) : error ? (
                  <div className="text-center text-muted-foreground p-6">
                    <p className="mb-4">{error}</p>
                    <Button variant="outline" onClick={handleGoBack}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Go back and try again
                    </Button>
                  </div>
                ) : (
                  <div className="w-full h-full">
                    <ModelViewer3D modelPath="/prosthetic-arm.glb" />
                  </div>
                )}
              </div>
              
              {/* Model details */}
              {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="p-3 bg-black/30 rounded-lg">
                    <h3 className="font-medium text-sm mb-1">File Format</h3>
                    <p className="text-muted-foreground text-sm">STL, OBJ, GLB</p>
                  </div>
                  <div className="p-3 bg-black/30 rounded-lg">
                  </div>
                  <div className="p-3 bg-black/30 rounded-lg">
                    <h3 className="font-medium text-sm mb-1">Scale</h3>
                    <p className="text-muted-foreground text-sm">1:1 (life-size)</p>
                  </div>
                </div>
              )}
              
              {/* Actions */}
              {!loading && !error && (
                <div className="flex flex-wrap gap-3 mt-4">
                  <Button onClick={handleDownload} className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download Model
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regenerate
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomModelViewer;