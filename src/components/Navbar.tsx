import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isHomePage) {
      // If we're on the home page, scroll to the section
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 100, // Offset for the navbar
          behavior: 'smooth'
        });
      }
    } else {
      // If we're on another page, navigate to home and add the hash
      navigate(`/${id === 'top' ? '' : '#' + id}`);
    }
  };

  const goToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
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
          <a href="/" className="flex items-center" onClick={goToHome}>
            <span className="text-2xl font-bold gradient-text">Prompt2CAD</span>
          </a>
          
          <nav className="hidden md:flex ml-10 space-x-8">
            <a 
              href="/" 
              onClick={goToHome}
              className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            >
              Home
            </a>
            <a 
              href={isHomePage ? "#how-it-works" : "/#how-it-works"} 
              onClick={handleNavigation('how-it-works')}
              className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            >
              How It Works
            </a>
            <a 
              href={isHomePage ? "#converter" : "/#converter"} 
              onClick={handleNavigation('converter')}
              className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            >
              Try It Now
            </a>
          </nav>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
