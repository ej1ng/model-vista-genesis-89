
import { useEffect, useRef, useState, ReactNode } from 'react';

interface AnimateOnScrollProps {
  children: ReactNode;
  animation: string; // Animation class to apply
  threshold?: number; // Visibility threshold (0-1)
  delay?: number; // Delay in milliseconds
  className?: string;
}

const AnimateOnScroll = ({
  children,
  animation,
  threshold = 0.1,
  delay = 0,
  className = ''
}: AnimateOnScrollProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element is in view, set it to visible
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          
          // Once visible, no need to observe anymore
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold, delay]);
  
  return (
    <div 
      ref={ref} 
      className={`${className} transition-all duration-700 ${isVisible ? animation : 'opacity-0'}`}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;
