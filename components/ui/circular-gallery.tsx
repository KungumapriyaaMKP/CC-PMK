import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Define the type for a single gallery item
export interface GalleryItem {
  common: string;
  binomial: string;
  badge?: string;
  photo: {
    url: string; 
    text: string;
    pos?: string;
    by: string;
  };
}

// Define the props for the CircularGallery component
export interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation when not scrolling. */
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 560, autoRotateSpeed = 0.04, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isInteracting, setIsInteracting] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const startRotationRef = useRef(0);

    // Effect to handle scroll-based rotation
    useEffect(() => {
      const handleScroll = () => {
        setIsInteracting(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        const scrollRotation = scrollProgress * 360 * 1.5;
        setRotation(scrollRotation);

        scrollTimeoutRef.current = setTimeout(() => {
          setIsInteracting(false);
        }, 150);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, []);

    // Effect for auto-rotation when not interacting
    useEffect(() => {
      const autoRotate = () => {
        if (!isInteracting && !isDraggingRef.current) {
          setRotation((prev) => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isInteracting, autoRotateSpeed]);

    // Touch and mouse drag interaction
    const handleMouseDown = (e: React.MouseEvent) => {
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      startRotationRef.current = rotation;
      setIsInteracting(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - startXRef.current;
      setRotation(startRotationRef.current + deltaX * 0.25);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      setTimeout(() => setIsInteracting(false), 200);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      if (!e.touches[0]) return;
      isDraggingRef.current = true;
      startXRef.current = e.touches[0].clientX;
      startRotationRef.current = rotation;
      setIsInteracting(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (!isDraggingRef.current || !e.touches[0]) return;
      const deltaX = e.touches[0].clientX - startXRef.current;
      setRotation(startRotationRef.current + deltaX * 0.25);
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
      setTimeout(() => setIsInteracting(false), 200);
    };

    const anglePerItem = 360 / items.length;
    
    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative w-full h-full flex items-center justify-center select-none cursor-grab active:cursor-grabbing", className)}
        style={{ perspective: '2000px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.2, 1 - (normalizedAngle / 160));

            return (
              <div
                key={item.photo.url + i} 
                role="group"
                aria-label={item.common}
                className="absolute w-[260px] sm:w-[300px] h-[370px] sm:h-[420px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-130px',
                  marginTop: '-185px',
                  opacity: opacity,
                  transition: 'opacity 0.3s linear'
                }}
              >
                <div className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden group border border-white/20 dark:border-white/10 bg-slate-900/40 backdrop-blur-md">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />

                  {/* Top Badge Overlay */}
                  {item.badge && (
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-navy-950/85 text-skybrand-300 border border-skybrand-400/40 shadow-sm backdrop-blur-sm">
                        {item.badge}
                      </span>
                    </div>
                  )}

                  {/* Gradient Backing & Video Metadata Card */}
                  <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 bg-gradient-to-t from-navy-950/95 via-navy-950/70 to-transparent text-white space-y-1">
                    <h2 className="text-base sm:text-lg font-heading font-bold text-white leading-snug">
                      {item.common}
                    </h2>
                    <p className="text-xs italic text-skybrand-200 font-editorial line-clamp-2">
                      {item.binomial}
                    </p>
                    <div className="pt-2 flex items-center justify-between border-t border-white/10 text-[10px] text-slate-300">
                      <span>{item.photo.by}</span>
                      <span className="text-skybrand-400 font-bold uppercase tracking-wider">Verified Peak</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
