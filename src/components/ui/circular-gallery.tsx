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
  ({ items, className, radius = 520, autoRotateSpeed = 0.04, onItemClick, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isInteracting, setIsInteracting] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const isDraggingRef = useRef(false);
    const hasDraggedRef = useRef(false);
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
                key={(item.reelId || item.photo?.url || "item") + i} 
                role="group"
                aria-label={item.common}
                className="absolute w-[220px] sm:w-[260px] h-[340px] sm:h-[400px] -ml-[110px] sm:-ml-[130px] -mt-[170px] sm:-mt-[200px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: '50%',
                  top: '50%',
                  opacity: opacity,
                  transition: 'opacity 0.3s linear'
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
                  {/* Underneath fallback image */}
                  {item.photo?.url && (
                    <img
                      src={item.photo.url}
                      alt={item.photo.text || item.common}
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                      style={{ objectPosition: item.photo.pos || 'center' }}
                    />
                  )}

                  {/* Instagram Reel Embed iframe */}
                  {item.reelId && (
                    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black/90">
                      <iframe
                        src={`https://www.instagram.com/reel/${item.reelId}/embed/`}
                        className="w-full h-full border-0 pointer-events-none scale-100"
                        allowFullScreen
                        scrolling="no"
                        loading="lazy"
                        title={item.common}
                      />
                    </div>
                  )}


                  {/* Bottom Gradient Overlay & Meta Info */}
                  <div className="absolute bottom-0 left-0 w-full p-3.5 sm:p-4 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent text-white space-y-1 z-20 pointer-events-none">
                    <h3 className="text-sm sm:text-[15px] font-sans font-bold text-white leading-snug tracking-tight">
                      {item.common}
                    </h3>
                    <p className="text-[11px] text-slate-300 font-sans line-clamp-2 leading-relaxed">
                      {item.binomial}
                    </p>
                    <div className="pt-2 flex items-center justify-between border-t border-white/15 text-[9.5px] text-slate-300 font-sans">
                      <span className="font-semibold text-slate-200">{item.photo?.by || "Career Compass"}</span>
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
