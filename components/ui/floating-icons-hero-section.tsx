import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Interface for the props of each individual icon.
export interface IconProps {
  id: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  className: string; // Used for custom positioning of the icon.
  label?: string;
}

// Interface for the main hero component's props.
export interface FloatingIconsHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  icons: IconProps[];
}

// A single icon component with its own motion logic
export const FloatingRepellingIcon = ({
  mouseX,
  mouseY,
  iconData,
  index = 0,
}: {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  iconData: IconProps;
  index?: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  // Motion values for the icon's position, with spring physics for smooth movement
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  React.useEffect(() => {
    const handleMouseMove = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(mouseX.current - (rect.left + rect.width / 2), 2) +
            Math.pow(mouseY.current - (rect.top + rect.height / 2), 2)
        );

        // If the cursor is close enough, repel the icon
        if (distance < 150) {
          const angle = Math.atan2(
            mouseY.current - (rect.top + rect.height / 2),
            mouseX.current - (rect.left + rect.width / 2)
          );
          // The closer the cursor, the stronger the repulsion
          const force = (1 - distance / 150) * 50;
          x.set(-Math.cos(angle) * force);
          y.set(-Math.sin(angle) * force);
        } else {
          // Return to original position when cursor is away
          x.set(0);
          y.set(0);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      key={iconData.id}
      style={{
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn('absolute z-20 pointer-events-auto', iconData.className)}
      title={iconData.label}
    >
      {/* Inner wrapper for the continuous floating animation */}
      <motion.div
        className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 p-2.5 rounded-2xl shadow-xl bg-white/95 backdrop-blur-md border border-slate-200/90 hover:border-skybrand-400 hover:shadow-2xl transition-colors duration-200"
        animate={{
          y: [0, -8, 0, 8, 0],
          x: [0, 6, 0, -6, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 5 + (index % 5),
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        <iconData.icon className="w-6 h-6 md:w-7 md:h-7 text-slate-800" />
      </motion.div>
    </motion.div>
  );
};

// Reusable perimeter wrapper for placing floating repelling icons around any element
export const FloatingIconsWrapper: React.FC<{
  icons: IconProps[];
  children: React.ReactNode;
  className?: string;
}> = ({ icons, children, className }) => {
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    mouseX.current = event.clientX;
    mouseY.current = event.clientY;
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn('relative w-full', className)}
    >
      {/* Floating Icons Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {icons.map((iconData, index) => (
          <FloatingRepellingIcon
            key={iconData.id}
            mouseX={mouseX}
            mouseY={mouseY}
            iconData={iconData}
            index={index}
          />
        ))}
      </div>
      {children}
    </div>
  );
};

const FloatingIconsHero = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & FloatingIconsHeroProps
>(({ className, title, subtitle, ctaText, ctaHref, icons, ...props }, ref) => {
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    mouseX.current = event.clientX;
    mouseY.current = event.clientY;
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        'relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-background',
        className
      )}
      {...props}
    >
      {/* Container for the background floating icons */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {icons.map((iconData, index) => (
          <FloatingRepellingIcon
            key={iconData.id}
            mouseX={mouseX}
            mouseY={mouseY}
            iconData={iconData}
            index={index}
          />
        ))}
      </div>

      {/* Container for the foreground content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text">
          {title}
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-lg text-muted-foreground">
          {subtitle}
        </p>
        <div className="mt-10">
          <Button asChild size="lg" className="px-8 py-6 text-base font-semibold">
            <a href={ctaHref}>{ctaText}</a>
          </Button>
        </div>
      </div>
    </section>
  );
});

FloatingIconsHero.displayName = 'FloatingIconsHero';

export { FloatingIconsHero };

// --- Company & Social Logo SVG Components ---

export const IconInstagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
    <rect x="5" y="5" width="14" height="14" rx="4" stroke="white" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="3.2" stroke="white" strokeWidth="1.8" />
    <circle cx="15.8" cy="8.2" r="0.9" fill="white" />
    <defs>
      <radialGradient id="ig-grad" cx="0.2" cy="1" r="1.2">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="25%" stopColor="#fd5949" />
        <stop offset="50%" stopColor="#d6249f" />
        <stop offset="100%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
  </svg>
);

export const IconYouTube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.582 6.186A2.482 2.482 0 0 0 19.82 4.42C18.1 4 12 4 12 4s-6.1 0-7.82.42c-.98.26-1.74.98-1.762 1.766C2 7.94 2 12 2 12s0 4.06.418 5.814c.022.786.782 1.506 1.762 1.766C6.1 20 12 20 12 20s6.1 0 7.82-.42c.98-.26 1.74-.98 1.762-1.766C22 16.06 22 12 22 12s0-4.06-.418-5.814z" fill="#FF0000" />
    <path d="M9.75 15.5V8.5L15.75 12 9.75 15.5z" fill="white" />
  </svg>
);

export const IconLinkedIn = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#0A66C2" />
    <path d="M6.5 9.5H9V18H6.5V9.5ZM7.75 6C8.58 6 9.25 6.67 9.25 7.5C9.25 8.33 8.58 9 7.75 9C6.92 9 6.25 8.33 6.25 7.5C6.25 6.67 6.92 6 7.75 6ZM10.5 9.5H13V10.8H13.04C13.4 10.1 14.3 9.3 15.6 9.3C18.3 9.3 18.8 11.1 18.8 13.4V18H16.3V14C16.3 13 16.28 11.8 14.88 11.8C13.46 11.8 13.25 12.9 13.25 13.9V18H10.75V9.5H10.5Z" fill="white" />
  </svg>
);

export const IconGoogle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.9999 12.24C21.9999 11.4933 21.9333 10.76 21.8066 10.0533H12.3333V14.16H17.9533C17.7333 15.3467 17.0133 16.3733 15.9666 17.08V19.68H19.5266C21.1933 18.16 21.9999 15.4533 21.9999 12.24Z" fill="#4285F4" />
    <path d="M12.3333 22C15.2333 22 17.6866 21.0533 19.5266 19.68L15.9666 17.08C15.0199 17.7333 13.7933 18.16 12.3333 18.16C9.52659 18.16 7.14659 16.28 6.27992 13.84H2.59326V16.5133C4.38659 20.0267 8.05992 22 12.3333 22Z" fill="#34A853" />
    <path d="M6.2799 13.84C6.07324 13.2267 5.9599 12.58 5.9599 11.92C5.9599 11.26 6.07324 10.6133 6.2799 10L2.59326 7.32667C1.86659 8.78667 1.45326 10.32 1.45326 11.92C1.45326 13.52 1.86659 15.0533 2.59326 16.5133L6.2799 13.84Z" fill="#FBBC05" />
    <path d="M12.3333 5.68C13.8933 5.68 15.3133 6.22667 16.3866 7.24L19.6 4.02667C17.68 2.29333 15.2266 1.33333 12.3333 1.33333C8.05992 1.33333 4.38659 3.97333 2.59326 7.32667L6.27992 10C7.14659 7.56 9.52659 5.68 12.3333 5.68Z" fill="#EA4335" />
  </svg>
);

export const IconFigma = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2z" fill="#2C2C2C" />
    <path d="M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5V7z" fill="#0ACF83" />
    <path d="M12 12a5 5 0 0 1-5-5 5 5 0 0 1 5-5v10z" fill="#A259FF" />
    <path d="M12 17a5 5 0 0 1-5-5h10a5 5 0 0 1-5 5z" fill="#F24E1E" />
    <path d="M7 12a5 5 0 0 1 5 5v-5H7z" fill="#FF7262" />
  </svg>
);

export const IconX = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" className="text-slate-900" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25zM17.03 19.75h1.866L7.156 4.25H5.16l11.874 15.5z" />
  </svg>
);

export const IconSpotify = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.125 14.175c-.188.3-.563.413-.863.225-2.437-1.5-5.5-1.725-9.15-1.012-.338.088-.675-.15-.763-.488-.088-.337.15-.675.488-.762 3.937-.787 7.287-.525 9.975 1.125.3.187.412.562.225.862zm.9-2.7c-.225.363-.675.488-1.037.263-2.7-1.65-6.825-2.1-9.975-1.162-.413.113-.825-.15-1-.562-.15-.413.15-.825.563-1 .362-.112 3.487-.975 6.6 1.312.362.225.487.675.262 1.038v.112zm.113-2.887c-3.225-1.875-8.55-2.025-11.512-1.125-.487.15-.975-.15-1.125-.637-.15-.488.15-.975.638-1.125 3.337-.975 9.15-.787 12.825 1.312.45.263.6.825.337 1.275-.263.45-.825.6-1.275.337v-.038z" fill="#1DB954" />
  </svg>
);

export const IconNotion = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" className="text-slate-900" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm.111 5.889h3.222v10.222h-3.222V7.889zm-4.333 0h3.222v10.222H7.778V7.889z" />
  </svg>
);

export const IconSlack = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" fill="#36C5F0" />
    <path d="M9 15.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="#2EB67D" />
    <path d="M14 8.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" fill="#ECB22E" />
    <path d="M15.5 15a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" fill="#E01E5A" />
    <path d="M10 14h4v-1.5a1.5 1.5 0 0 0-1.5-1.5h-1a1.5 1.5 0 0 0-1.5 1.5V14Z" fill="#E01E5A" />
    <path d="M8.5 14a1.5 1.5 0 0 0 1.5 1.5h1.5v-1a1.5 1.5 0 0 0-1.5-1.5H8.5v1Z" fill="#ECB22E" />
    <path d="M15.5 10a1.5 1.5 0 0 0-1.5-1.5H12.5v4a1.5 1.5 0 0 0 1.5 1.5h1.5v-4Z" fill="#36C5F0" />
    <path d="M14 8.5a1.5 1.5 0 0 0-1.5-1.5h-1v4a1.5 1.5 0 0 0 1.5 1.5h1v-4Z" fill="#2EB67D" />
  </svg>
);
