
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
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
          <NavLink to="/" className="flex items-center">
            <span className="text-2xl font-bold gradient-text">Prompt2CAD</span>
          </NavLink>
          
          <nav className="hidden md:flex ml-10 space-x-8">
            <NavLink 
              to="/" 
              end
              className={({isActive}) => cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              Home
            </NavLink>
            <NavLink 
              to="/how-it-works" 
              className={({isActive}) => cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              How It Works
            </NavLink>
            <NavLink 
              to="/examples" 
              className={({isActive}) => cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              Try It Now
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden md:inline-flex">Sign In</Button>
          <Button>Try for Free</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
