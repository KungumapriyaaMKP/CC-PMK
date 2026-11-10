import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Define the type for a single gallery item
export interface GalleryItem {
  id?: string;
  common: string;
  binomial: string;
  badge?: string;
  statusTag?: string;
  reelId?: string;
  reelUrl?: string;
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
  /** Callback triggered when a gallery item is clicked */
  onItemClick?: (item: GalleryItem) => void;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 320, autoRotateSpeed = 0.12, onItemClick, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isInteracting, setIsInteracting] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [effectiveRadius, setEffectiveRadius] = useState(radius);

    const localRef = useRef<HTMLDivElement>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const isDraggingRef = useRef(false);
    const hasDraggedRef = useRef(false);
    const startXRef = useRef(0);
    const startRotationRef = useRef(0);

    // Responsive radius adjustment: reduced horizontal spacing between cards
    useEffect(() => {
      const updateDimensions = () => {
        if (typeof window === 'undefined') return;
        const w = window.innerWidth;
        if (w < 640) {
          // Mobile: tight, compact circle with minimal horizontal gaps
          setEffectiveRadius(Math.min(210, w * 0.52));
        } else if (w < 1024) {
          // Tablet
          setEffectiveRadius(Math.min(270, w * 0.38));
        } else {
          // Desktop: compact radius bringing cards closer horizontally
          setEffectiveRadius(radius);
        }
      };

      updateDimensions();
      window.addEventListener('resize', updateDimensions, { passive: true });
      return () => window.removeEventListener('resize', updateDimensions);
    }, [radius]);

    // IntersectionObserver to pause auto-rotation when off-screen (eliminates idle latency)
    useEffect(() => {
      const el = localRef.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
        },
        { threshold: 0.05 }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    // Effect to handle scroll-based rotation (debounced/throttled)
    useEffect(() => {
      if (!isInView) return;

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
    }, [isInView]);

    // Effect for auto-rotation: Only active when visible in viewport
    useEffect(() => {
      if (!isInView) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        return;
      }

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
    }, [isInView, isInteracting, autoRotateSpeed]);

    // Touch and mouse drag interaction
    const handleMouseDown = (e: React.MouseEvent) => {
      isDraggingRef.current = true;
      hasDraggedRef.current = false;
      startXRef.current = e.clientX;
      startRotationRef.current = rotation;
      setIsInteracting(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - startXRef.current;
      if (Math.abs(deltaX) > 6) {
        hasDraggedRef.current = true;
      }
      setRotation(startRotationRef.current + deltaX * 0.25);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      setTimeout(() => setIsInteracting(false), 200);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      if (!e.touches[0]) return;
      isDraggingRef.current = true;
      hasDraggedRef.current = false;
      startXRef.current = e.touches[0].clientX;
      startRotationRef.current = rotation;
      setIsInteracting(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (!isDraggingRef.current || !e.touches[0]) return;
      const deltaX = e.touches[0].clientX - startXRef.current;
      if (Math.abs(deltaX) > 6) {
        hasDraggedRef.current = true;
      }
      setRotation(startRotationRef.current + deltaX * 0.25);
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
      setTimeout(() => setIsInteracting(false), 200);
    };

    const anglePerItem = items.length > 0 ? 360 / items.length : 60;
    
    return (
      <div
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative w-full h-full flex items-center justify-center select-none cursor-grab active:cursor-grabbing touch-pan-y", className)}
        style={{ perspective: '1600px' }}
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
                key={(item.reelId || item.photo?.url || "item") + i} 
                role="group"
                aria-label={item.common}
                className="absolute w-[185px] sm:w-[230px] md:w-[260px] h-[310px] sm:h-[360px] md:h-[400px] -ml-[92px] sm:-ml-[115px] md:-ml-[130px] -mt-[155px] sm:-mt-[180px] md:-mt-[200px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${effectiveRadius}px)`,
                  left: '50%',
                  top: '50%',
                  opacity: opacity,
                  transition: 'opacity 0.25s linear'
                }}
              >
                <div 
                  onClick={() => {
                    if (!hasDraggedRef.current && onItemClick) {
                      onItemClick(item);
                    }
                  }}
                  className="relative w-full h-full rounded-none shadow-xl overflow-hidden group border border-slate-300 bg-slate-950 cursor-pointer hover:border-white transition-all duration-300"
                >
                  {/* Full resolution verified reel cover image */}
                  {item.photo?.url && (
                    <img
                      src={item.photo.url}
                      alt={item.photo.text || item.common}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{ objectPosition: item.photo.pos || 'center' }}
                      loading="lazy"
                      decoding="async"
                    />
                  )}

                  {/* Subtle Dark Vignette & Centered Play Indicator */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:bg-[#0F172A] transition-all duration-300">
                      <svg className="w-5 h-5 fill-current ml-0.5 text-white" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom Gradient Overlay & Meta Info */}
                  <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent text-white space-y-1 z-20 pointer-events-none">
                    <h3 className="text-xs sm:text-[15px] font-sans font-bold text-white leading-snug tracking-tight">
                      {item.common}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-slate-300 font-sans line-clamp-2 leading-relaxed">
                      {item.binomial}
                    </p>
                    <div className="pt-1.5 sm:pt-2 flex items-center justify-between border-t border-white/15 text-[9px] sm:text-[9.5px] text-slate-300 font-sans">
                      <span className="font-semibold text-slate-200 truncate max-w-[100px]">{item.photo?.by || "Career Compass"}</span>
                      <span className="text-emerald-400 font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1">
                        Click Here ↗
                      </span>
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
