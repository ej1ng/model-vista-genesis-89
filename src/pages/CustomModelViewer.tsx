import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, RefreshCw, Upload, PenTool, Box } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import ModelViewer3D from '@/components/ModelViewer3D';

const CustomModelViewer = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [drawingImage, setDrawingImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dimensions, setDimensions] = useState({
    width: '10 cm',
    height: '15 cm',
    depth: '5 cm'
  });
  
  // Get the drawing data from location state
  const imageData = location.state?.imageData;
  
  useEffect(() => {
    if (!imageData) {
      setError('No drawing provided');
      setLoading(false);
      return;
    }
    
    setDrawingImage(imageData);
    
    // Simulate model generation
    const timer = setTimeout(() => {
      setLoading(false);
      toast({
        title: "Custom 3D Model Generated",
        description: "Your custom 3D model has been created based on your drawing.",
      });
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [imageData, toast]);
  
  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your custom 3D model will download shortly.",
    });
    // In a real app, this would trigger an actual download
  };
  
  const handleGoBack = () => {
    navigate('/');
  };
  
  const handleRetry = () => {
    navigate('/');
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setDrawingImage(event.target.result);
        setLoading(true);
        
        // Simulate processing new drawing
        setTimeout(() => {
          setLoading(false);
          toast({
            title: "New Custom 3D Model Generated",
            description: "Your custom 3D model has been updated based on your new drawing.",
          });
        }, 3000);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };
  
  const handleDimensionChange = (dimension: string, value: string) => {
    setDimensions(prev => ({
      ...prev,
      [dimension]: value
    }));
    
    // In a real app, this would trigger a model update
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Model Dimensions Updated",
        description: `The ${dimension} has been updated to ${value}.`,
      });
    }, 1500);
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
            Back to home
          </Button>
          
          {/* Split view: Drawing and 3D Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Drawing Panel */}
            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold flex items-center">
                <PenTool className="mr-2 h-5 w-5" />
                Object Drawing
              </h2>
              
              <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                {drawingImage ? (
                  <img 
                    src={drawingImage} 
                    alt="Drawing" 
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <p className="text-muted-foreground">No drawing available</p>
                )}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={triggerFileUpload}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload New Drawing
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
                <h2 className="text-xl font-semibold flex items-center">
                  <Box className="mr-2 h-5 w-5" />
                  Custom 3D Model
                </h2>
              </div>
              
              <div className="aspect-square bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden flex items-center justify-center relative">
                {loading ? (
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Generating your custom 3D model...</p>
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
              
              <Button 
                onClick={handleDownload}
                className="w-full"
                disabled={loading || !!error}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Custom 3D Model
              </Button>
            </div>
          </div>
          
          {/* Dimensions Controls */}
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Model Dimensions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Width</label>
                <div className="flex">
                  <input 
                    type="text" 
                    value={dimensions.width}
                    onChange={(e) => handleDimensionChange('width', e.target.value)}
                    className="flex-1 px-3 py-2 bg-black/50 rounded-l-md border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="px-3 py-2 bg-black/70 border border-l-0 border-border rounded-r-md text-muted-foreground">
                    cm
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Height</label>
                <div className="flex">
                  <input 
                    type="text" 
                    value={dimensions.height}
                    onChange={(e) => handleDimensionChange('height', e.target.value)}
                    className="flex-1 px-3 py-2 bg-black/50 rounded-l-md border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="px-3 py-2 bg-black/70 border border-l-0 border-border rounded-r-md text-muted-foreground">
                    cm
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Depth</label>
                <div className="flex">
                  <input 
                    type="text" 
                    value={dimensions.depth}
                    onChange={(e) => handleDimensionChange('depth', e.target.value)}
                    className="flex-1 px-3 py-2 bg-black/50 rounded-l-md border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="px-3 py-2 bg-black/70 border border-l-0 border-border rounded-r-md text-muted-foreground">
                    cm
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-md">
              <p className="text-sm">
                <strong>Tip:</strong> Adjust the dimensions to match your desired object size. The 3D model will update automatically.
              </p>
            </div>
          </div>
          
          {/* Additional options and information */}
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Model Specifications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-black/30 rounded-lg">
                <h3 className="font-medium mb-1">File Format</h3>
                <p className="text-muted-foreground">STL, OBJ, GLB</p>
              </div>
              <div className="p-4 bg-black/30 rounded-lg">
                <h3 className="font-medium mb-1">Polygon Count</h3>
                <p className="text-muted-foreground">18,742 triangles</p>
              </div>
              <div className="p-4 bg-black/30 rounded-lg">
                <h3 className="font-medium mb-1">Material</h3>
                <p className="text-muted-foreground">Generic plastic</p>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                Need to make adjustments? Upload a new drawing or modify the dimensions.
              </p>
              <Button variant="outline" onClick={triggerFileUpload}>
                <Upload className="mr-2 h-4 w-4" />
                Upload New Drawing
              </Button>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default CustomModelViewer;