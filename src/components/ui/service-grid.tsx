// components/ui/service-grid.tsx

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Interface for a single service item.
 * @property {string} name - The name of the service.
 * @property {string} imageUrl - The URL for the service's representative image.
 * @property {string} href - The URL to navigate to when the service is clicked.
 */
export interface Service {
  name: string;
  imageUrl: string;
  href: string;
  tagline?: string;
  category?: string;
  badge?: string;
}

/**
 * Props for the ServiceGrid component.
 * @property {string} title - The main heading for the grid.
 * @property {string} [subtitle] - An optional subheading displayed below the title.
 * @property {Service[]} services - An array of service objects to display in the grid.
 * @property {string} [className] - Optional additional CSS classes for the container.
 * @property {(service: Service) => void} [onServiceClick] - Optional callback when a service is clicked.
 */
export interface ServiceGridProps {
  title: string;
  subtitle?: string;
  services: Service[];
  className?: string;
  onServiceClick?: (service: Service) => void;
}

const ServiceGrid = React.forwardRef<HTMLDivElement, ServiceGridProps>(
  ({ title, subtitle, services, className, onServiceClick, ...props }, ref) => {
    // Animation variants for the container to orchestrate children animations
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
        },
      },
    };

    // Animation variants for each grid item
    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 12,
        },
      },
    };

    return (
      <section
        ref={ref}
        className={cn("w-full py-12 md:py-16 lg:py-20 bg-white", className)}
        {...props}
      >
        <div className="container mx-auto px-4 md:px-6">
          {/* Header Section */}
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10 md:mb-14">
            <div className="space-y-3 max-w-3xl">
              <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#0F172A] tracking-[-0.01em] uppercase">
                {title}
              </h2>
              {subtitle && (
                <p className="max-w-[720px] text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed font-sans">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Animated Grid Section */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {services.map((service, index) => (
              <motion.a
                key={index}
                href={service.href}
                onClick={(e) => {
                  if (onServiceClick) {
                    e.preventDefault();
                    onServiceClick(service);
                  }
                }}
                className="group flex flex-col items-center justify-start gap-3 text-center cursor-pointer select-none"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-none border border-slate-200/90 bg-white p-2.5 shadow-2xs group-hover:border-[#0F172A] group-hover:shadow-md transition-all duration-300 relative overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={`${service.name} service icon`}
                    width={100}
                    height={100}
                    className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&auto=format&fit=crop&q=80";
                    }}
                  />
                </div>
                <span className="text-sm font-semibold text-[#0F172A] transition-colors duration-300 group-hover:text-black font-sans tracking-tight">
                  {service.name}
                </span>
                {service.badge && (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 -mt-1.5">
                    {service.badge}
                  </span>
                )}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }
);

ServiceGrid.displayName = "ServiceGrid";

export { ServiceGrid };
export default ServiceGrid;
