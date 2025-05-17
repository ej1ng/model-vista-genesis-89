import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Offset for the navbar
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50 py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <a href="#top" className="flex items-center" onClick={scrollToSection('top')}>
            <span className="text-2xl font-bold gradient-text">Prompt2CAD</span>
          </a>
          
          <nav className="hidden md:flex ml-10 space-x-8">
            <a 
              href="#top" 
              onClick={scrollToSection('top')}
              className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            >
              Home
            </a>
            <a 
              href="#how-it-works" 
              onClick={scrollToSection('how-it-works')}
              className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            >
              How It Works
            </a>
            <a 
              href="#converter" 
              onClick={scrollToSection('converter')}
              className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            >
              Try It Now
            </a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden md:inline-flex">Sign In</Button>
          <Button onClick={scrollToSection('converter')}>Try for Free</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
