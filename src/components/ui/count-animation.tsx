"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import React, { useEffect, useRef } from "react";

export interface CountAnimationProps {
  number: number;
  className?: string;
  duration?: number;
  formatValue?: (value: number) => string;
  prefix?: string;
  suffix?: string;
}

function CountAnimation({
  number,
  className,
  duration = 2,
  formatValue,
  prefix = "",
  suffix = "",
}: CountAnimationProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const roundedVal = Math.round(latest);
    if (formatValue) {
      return `${prefix}${formatValue(roundedVal)}${suffix}`;
    }
    return `${prefix}${roundedVal.toLocaleString()}${suffix}`;
  });

  useEffect(() => {
    const animation = animate(count, number, { 
      duration,
      ease: "easeOut"
    });

    return animation.stop;
  }, [number, duration, count]);

  return <motion.span className={cn(className)}>{rounded}</motion.span>;
}

export { CountAnimation };
