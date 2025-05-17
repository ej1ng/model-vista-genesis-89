import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, RefreshCw, Upload, Image as ImageIcon, PenTool, Box } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import ModelViewer3D from '@/components/ModelViewer3D';

const ModelViewer = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [drawingImage, setDrawingImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const drawingInputRef = useRef<HTMLInputElement>(null);
  
  // Get the image data from location state
  const imageData = location.state?.imageData;
  
  useEffect(() => {
    if (!imageData) {
      setError('No image data provided');
      setLoading(false);
      return;
    }
    
    setSourceImage(imageData);
    
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
  
  const handleGenerateCustomModel = () => {
    // Redirect to custom model viewer page with source and drawing images
    navigate('/custom-model-viewer', { 
      state: { 
        sourceImage, 
        drawingImage 
      } 
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setSourceImage(event.target.result);
        setLoading(true);
        
        // Simulate processing new image
        setTimeout(() => {
          setLoading(false);
          toast({
            title: "New 3D Model Generated",
            description: "Your 3D model has been updated based on the new image.",
          });
        }, 3000);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleDrawingUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setDrawingImage(event.target.result);
        toast({
          title: "Drawing uploaded",
          description: "Your drawing will be used to refine the 3D model.",
        });
      }
    };
    reader.readAsDataURL(file);
  };
  
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };
  
  const triggerDrawingUpload = () => {
    drawingInputRef.current?.click();
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
          
          {/* Split view: Source Image and 3D Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Source Image Panel */}
            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold flex items-center">
                <ImageIcon className="mr-2 h-5 w-5" />
                Source Image
              </h2>
              
              <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                {sourceImage ? (
                  <img 
                    src={sourceImage} 
                    alt="Source" 
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <p className="text-muted-foreground">No image available</p>
                )}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={triggerFileUpload}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload New Image
              </Button>
              <input 
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/png,image/jpeg"
                onChange={handleFileChange}
              />
            </div>
            
            {/* 3D Model Panel */}
            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Generated 3D Model</h2>
                
                {/* Drawing Upload Button */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={triggerDrawingUpload}
                  className="flex items-center gap-1"
                >
                  <PenTool className="h-4 w-4" />
                  <span className="hidden sm:inline">Upload Drawing</span>
                </Button>
                <input 
                  type="file"
                  ref={drawingInputRef}
                  className="hidden"
                  accept="image/png,image/jpeg"
                  onChange={handleDrawingUpload}
                />
              </div>
              
              <div className="aspect-square bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden flex items-center justify-center relative">
                {/* Drawing overlay if available */}
                {drawingImage && !loading && !error && (
                  <div className="absolute top-2 right-2 z-10 w-1/3 h-1/3 rounded-md overflow-hidden border-2 border-white/20 shadow-lg bg-black/50">
                    <img 
                      src={drawingImage} 
                      alt="Drawing" 
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-xs py-1 px-2 text-center">
                      Your Drawing
                    </div>
                  </div>
                )}
                
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
                  <div className="w-full h-full">
                    <ModelViewer3D modelPath="/prosthetic-arm.glb" />
                  </div>
                )}
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={handleDownload}
                  className="flex-1"
                  disabled={loading || !!error}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Model
                </Button>
                
                {/* Generate Custom 3D Model Button */}
                <Button 
                  onClick={handleGenerateCustomModel}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  disabled={loading || !!error || !drawingImage}
                >
                  <Box className="mr-2 h-4 w-4" />
                  Generate 3D Model
                </Button>
              </div>
            </div>
          </div>
          
          {/* Drawing guidance section */}
          {drawingImage ? (
            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <PenTool className="mr-2 h-5 w-5" />
                Drawing Refinements
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Your Drawing</h3>
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                    <img 
                      src={drawingImage} 
                      alt="Drawing" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium mb-2">Refinement Status</h3>
                    <p className="text-muted-foreground mb-4">
                      We're analyzing your drawing to refine the 3D model. This process helps us understand your specific requirements better.
                    </p>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">Processing drawing (45%)</p>
                  </div>
                  
                  <div className="flex gap-3 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={triggerDrawingUpload}
                      className="flex-1"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New Drawing
                    </Button>
                    
                    <Button 
                      onClick={handleGenerateCustomModel}
                      className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                      disabled={!drawingImage}
                    >
                      <Box className="mr-2 h-4 w-4" />
                      Generate 3D Model
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          
          {/* Additional options and information */}
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Model Specifications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-black/30 rounded-lg">
                <h3 className="font-medium mb-1">File Format</h3>
                <p className="text-muted-foreground">STL, OBJ, GLB</p>
              </div>
              <div className="p-4 bg-black/30 rounded-lg">
              </div>
              <div className="p-4 bg-black/30 rounded-lg">
                <h3 className="font-medium mb-1">Scale</h3>
                <p className="text-muted-foreground">1:1 (life-size)</p>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                Need to make adjustments? Upload a new image or return to the camera.
              </p>
              <Button variant="outline" onClick={handleRetry}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Return to Camera
              </Button>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default ModelViewer; 