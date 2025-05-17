import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ModelViewer from "./pages/ModelViewer";
import CustomModelViewer from "./pages/CustomModelViewer";
import NotFound from "./pages/NotFound";
import AnimatedBackground from "@/components/AnimatedBackground";
import CursorLight from "@/components/CursorLight";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AnimatedBackground />
      <CursorLight />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/model-viewer" element={<ModelViewer />} />
          <Route path="/custom-model-viewer" element={<CustomModelViewer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
