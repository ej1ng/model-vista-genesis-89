import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Image, Upload, ArrowRight, Camera, XCircle } from 'lucide-react';
import { useCamera } from '@/hooks/use-camera';
import { useNavigate } from 'react-router-dom';

const Converter = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  
  const {
    videoRef,
    isCameraActive,
    startCamera,
    stopCamera,
    takePhoto,
    error: cameraError
  } = useCamera();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleCameraToggle = async () => {
    if (showCamera) {
      stopCamera();
      setShowCamera(false);
    } else {
      setShowCamera(true);
      await startCamera();
    }
  };

  const handleCapture = async () => {
    try {
      const photoData = await takePhoto();
      setPreview(photoData);
      
      // Convert data URL to File object
      const blob = await fetch(photoData).then(r => r.blob());
      const newFile = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
      setFile(newFile);
      
      // Close camera after capturing
      stopCamera();
      setShowCamera(false);
    } catch (err) {
      toast({
        title: "Failed to capture photo",
        description: err as string,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "No image selected",
        description: "Please select an image or take a photo to convert.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    
    // Navigate to the model viewer with both the image preview and the file
    setTimeout(() => {
      setProcessing(false);
      navigate('/model-viewer', { 
        state: { 
          imageData: preview,
          imageFile: file
        } 
      });
    }, 1500);
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    stopCamera();
    setShowCamera(false);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Try It Now</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Upload an image or use your camera to transform it into a 3D model.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="p-1 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 rounded-xl">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <div className="font-medium text-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <Image className="w-5 h-5 mr-2" />
                      <span>Input Image</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        className="flex items-center"
                        onClick={handleCameraToggle}
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        {showCamera ? "Hide Camera" : "Use Camera"}
                      </Button>
                      
                      {(preview || showCamera) && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          className="flex items-center text-destructive hover:text-destructive"
                          onClick={handleReset}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reset
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-border rounded-lg overflow-hidden h-80 relative">
                    {showCamera ? (
                      <div className="w-full h-full flex flex-col">
                        <video 
                          ref={videoRef}
                          autoPlay 
                          playsInline
                          className="w-full h-full object-cover"
                        />
                        
                        {cameraError && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                            <p className="text-destructive">{cameraError}</p>
                          </div>
                        )}
                        
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                          <Button 
                            type="button"
                            onClick={handleCapture}
                            className="rounded-full w-14 h-14 flex items-center justify-center"
                            disabled={!isCameraActive}
                          >
                            <span className="sr-only">Take Photo</span>
                            <div className="w-10 h-10 rounded-full border-2 border-white" />
                          </Button>
                        </div>
                      </div>
                    ) : preview ? (
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="w-full h-full object-contain" 
                      />
                    ) : (
                      <label htmlFor="image-upload" className="flex flex-col items-center justify-center h-full cursor-pointer">
                        <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                        <span className="text-muted-foreground">Click or drag to upload</span>
                        <span className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</span>
                      </label>
                    )}
                    <input 
                      type="file"
                      id="image-upload"
                      className="sr-only"
                      accept="image/png,image/jpeg"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                
                {/* Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                  <p className="text-sm text-muted-foreground">
                    {file ? `Selected: ${file.name}` : "No image selected"}
                  </p>
                  
                  <Button 
                    type="submit" 
                    disabled={!file || processing || showCamera}
                    className="flex items-center"
                  >
                    {processing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Generate 3D Model
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl -z-10" />
    </section>
  );
};

export default Converter;
