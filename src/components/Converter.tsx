
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Image, Upload, ArrowRight, Download, Layers } from 'lucide-react';

const Converter = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setCompleted(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "No image selected",
        description: "Please select an image to convert.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      toast({
        title: "Conversion complete!",
        description: "Your 3D model is ready to download.",
      });
    }, 3000);
  };

  return (
    <section className="py-24 relative overflow-hidden" id="converter">
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Try It Now</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Upload an image and see how our technology transforms it into a 3D model.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="p-1 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 rounded-xl">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left side - Image upload */}
                  <div className="space-y-4">
                    <div className="font-medium text-lg flex items-center">
                      <Image className="w-5 h-5 mr-2" />
                      <span>Input Image</span>
                    </div>
                    
                    <div className="border-2 border-dashed border-border rounded-lg overflow-hidden h-64 relative">
                      {preview ? (
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
                      {preview && (
                        <button
                          type="button"
                          className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md hover:bg-black/80 transition-colors"
                          onClick={() => {
                            setFile(null);
                            setPreview(null);
                            setCompleted(false);
                          }}
                        >
                          Change
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Right side - 3D Model view */}
                  <div className="space-y-4">
                    <div className="font-medium text-lg flex items-center">
                      <Layers className="w-5 h-5 mr-2" />
                      <span>3D Model</span>
                    </div>
                    
                    <div className="border border-border rounded-lg overflow-hidden h-64 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                      {completed ? (
                        <div className="w-40 h-40 bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 rounded-lg animate-rotate-slow">
                          <div className="w-full h-full bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-pink-500/80 rounded-lg animate-pulse-slow transform scale-90 rotate-12" />
                        </div>
                      ) : processing ? (
                        <div className="text-center">
                          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-2"></div>
                          <p className="text-muted-foreground text-sm">Processing...</p>
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground">
                          <Layers className="w-10 h-10 mx-auto mb-2" />
                          <p>Your 3D model will appear here</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                  <p className="text-sm text-muted-foreground">
                    {file ? `Selected file: ${file.name}` : "No file selected"}
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    {completed ? (
                      <Button variant="outline" className="flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Download 3D Model
                      </Button>
                    ) : (
                      <Button 
                        type="submit" 
                        disabled={!file || processing}
                        className="flex items-center"
                      >
                        {processing ? (
                          <>Processing...</>
                        ) : (
                          <>
                            Convert to 3D
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
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
