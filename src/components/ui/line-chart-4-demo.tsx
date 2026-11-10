'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button-1';
import { Card, CardContent, CardHeader, CardTitle, CardToolbar } from '@/components/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/line-charts-4';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar, Download, Filter, MoreHorizontal, RefreshCw, Share2 } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

// Social media engagement data throughout the day (percentage)
const engagementData = [
  { time: '6AM', facebook: 2, instagram: 8, linkedin: 5 },
  { time: '7AM', facebook: 5, instagram: 12, linkedin: 8 },
  { time: '8AM', facebook: 8, instagram: 18, linkedin: 15 },
  { time: '9AM', facebook: 12, instagram: 25, linkedin: 22 },
  { time: '10AM', facebook: 15, instagram: 35, linkedin: 28 },
  { time: '11AM', facebook: 18, instagram: 42, linkedin: 32 },
  { time: '12PM', facebook: 22, instagram: 38, linkedin: 35 },
  { time: '1PM', facebook: 25, instagram: 45, linkedin: 30 },
  { time: '2PM', facebook: 28, instagram: 48, linkedin: 33 },
  { time: '3PM', facebook: 30, instagram: 52, linkedin: 38 },
  { time: '4PM', facebook: 26, instagram: 46, linkedin: 35 },
  { time: '5PM', facebook: 24, instagram: 44, linkedin: 32 },
  { time: '6PM', facebook: 22, instagram: 40, linkedin: 28 },
  { time: '7PM', facebook: 20, instagram: 38, linkedin: 25 },
  { time: '8PM', facebook: 18, instagram: 35, linkedin: 22 },
];

// Rich, distinctive platform colors
const chartConfig = {
  instagram: {
    label: 'Instagram',
    color: '#E1306C', // Iconic Instagram Vibrant Pink/Magenta
  },
  linkedin: {
    label: 'LinkedIn',
    color: '#0A66C2', // Official LinkedIn Blue
  },
  facebook: {
    label: 'Facebook',
    color: '#6366F1', // Vibrant Royal Indigo
  },
} satisfies ChartConfig;

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const ChartLabel = ({ label, color }: { label: string; color: string }) => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }}></div>
      <span className="text-slate-600 font-medium">{label}</span>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-none border border-slate-200 bg-white p-3 shadow-md min-w-[160px]">
        <div className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-2 pb-1.5 border-b border-slate-100 flex items-center justify-between">
          <span>{label}</span>
          <span className="text-[10px] text-slate-400 font-mono">Engagement</span>
        </div>
        <div className="space-y-2">
          {payload.map((entry, index) => {
            const config = chartConfig[entry.dataKey as keyof typeof chartConfig];
            return (
              <div key={index} className="flex items-center justify-between gap-3 text-xs">
                <ChartLabel label={config?.label || entry.dataKey} color={config?.color || entry.color} />
                <span className="font-bold font-mono text-slate-900">{entry.value}%</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

const ChartLegend = ({ label, color }: { label: string; color: string }) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className="size-3.5 border-2 rounded-full bg-white shadow-2xs flex items-center justify-center"
        style={{ borderColor: color }}
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      </div>
      <span className="text-xs sm:text-sm font-semibold text-slate-800">{label}</span>
    </div>
  );
};

export default function LineChart4() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [animProgress, setAnimProgress] = useState(0);
  const [replayKey, setReplayKey] = useState(0);

  // Trigger growth animation whenever the graph is scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          // Reset progress so it grows again whenever scrolled back by
          setIsInView(false);
          setAnimProgress(0);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smooth 60fps graph growth animation
  useEffect(() => {
    if (!isInView) {
      setAnimProgress(0);
      return;
    }

    let start: number | null = null;
    const duration = 1500; // 1.5s organic curve growth
    let animId: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const t = Math.min(1, elapsed / duration);
      // Cubic ease-out for natural biological deceleration
      const ease = 1 - Math.pow(1 - t, 3);
      setAnimProgress(ease);

      if (t < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isInView, replayKey]);

  // Scaled data points that dynamically grow into full curve peaks
  const animatedData = useMemo(() => {
    return engagementData.map((item, idx) => {
      // Gentle left-to-right wave propagation
      const pointDelay = (idx / (engagementData.length - 1)) * 0.25;
      const effectiveT = Math.max(0, Math.min(1, (animProgress - pointDelay) / (1 - pointDelay)));
      const pointProgress = Math.pow(effectiveT, 1.4);

      return {
        time: item.time,
        facebook: +(item.facebook * pointProgress).toFixed(1),
        instagram: +(item.instagram * pointProgress).toFixed(1),
        linkedin: +(item.linkedin * pointProgress).toFixed(1),
      };
    });
  }, [animProgress]);

  const handleReplay = () => {
    setAnimProgress(0);
    setReplayKey(k => k + 1);
  };

  return (
    <div ref={containerRef} className="w-full flex items-center justify-center">
      <Card className="w-full bg-white border-slate-200 shadow-sm rounded-none overflow-hidden">
        <CardHeader className="border-0 pt-6 pb-4">
          <div>
            <CardTitle className="text-base sm:text-lg font-semibold text-slate-900">
              Social Media Engagement Activity
            </CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">
              Cross-platform hourly retention and engagement peak analysis
            </p>
          </div>
          <CardToolbar>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleReplay}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Replay Growth
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="h-4 w-4 mr-2" />
                  Change Date
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Filter className="h-4 w-4 mr-2" />
                  Filter Platforms
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardToolbar>
        </CardHeader>

        <CardContent className="ps-0 pe-4 pb-6">
          <ChartContainer
            config={chartConfig}
            className="h-[210px] w-full mb-6 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-initial"
          >
            <LineChart
              data={animatedData}
              margin={{
                top: 8,
                right: 15,
                left: -10,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="4 8"
                stroke="#E2E8F0"
                strokeOpacity={0.8}
                horizontal={true}
                vertical={false}
              />

              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748B' }}
                tickMargin={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748B' }}
                tickFormatter={(value) => `${value}%`}
                domain={[0, 60]}
                tickMargin={10}
              />

              <ChartTooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#CBD5E1' }} />

              {/* Instagram Line (Top Peak) */}
              <Line 
                dataKey="instagram" 
                type="monotone" 
                stroke={chartConfig.instagram.color} 
                strokeWidth={2.8} 
                dot={false}
                isAnimationActive={false}
                activeDot={{ r: 5.5, fill: chartConfig.instagram.color, stroke: '#ffffff', strokeWidth: 2 }}
              />

              {/* LinkedIn Line (Middle Growth) */}
              <Line 
                dataKey="linkedin" 
                type="monotone" 
                stroke={chartConfig.linkedin.color} 
                strokeWidth={2.4} 
                dot={false}
                isAnimationActive={false}
                activeDot={{ r: 5, fill: chartConfig.linkedin.color, stroke: '#ffffff', strokeWidth: 2 }}
              />

              {/* Facebook Line (Baseline Baseline) */}
              <Line 
                dataKey="facebook" 
                type="monotone" 
                stroke={chartConfig.facebook.color} 
                strokeWidth={2.2} 
                dot={false}
                isAnimationActive={false}
                activeDot={{ r: 4.5, fill: chartConfig.facebook.color, stroke: '#ffffff', strokeWidth: 2 }}
              />
            </LineChart>
          </ChartContainer>

          {/* Color-Coded Legend */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 pt-1">
            <ChartLegend label="Instagram" color={chartConfig.instagram.color} />
            <ChartLegend label="LinkedIn" color={chartConfig.linkedin.color} />
            <ChartLegend label="Facebook" color={chartConfig.facebook.color} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
