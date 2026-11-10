import React, { useRef, useEffect, useCallback } from 'react';

export default function OrganicHeroReveal({
  imageDefault = '/assets/poojaa-muthukumar.jpg',
  imageAlternate = '/assets/poojaa-alternate.jpg',
  alt = 'Poojaa Muthukumar: Founder and Social Media Growth Strategist',
  className = '',
  aspectRatioClass = 'aspect-[4/5]',
  objectPosition = 'center 16%',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(0);
  const altImageRef = useRef(null);
  const isLoadedRef = useRef(false);

  // State tracked in refs for 60 FPS performance without React re-renders
  const stateRef = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
    scale: 0,
    targetScale: 0,
    time: 0,
    isActive: false,
    width: 0,
    height: 0,
    dpr: 1,
    reducedMotion: false,
  });

  // Preload Alternate Image
  useEffect(() => {
    const img = new Image();
    img.src = imageAlternate;
    img.onload = () => {
      altImageRef.current = img;
      isLoadedRef.current = true;
    };
  }, [imageAlternate]);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      stateRef.current.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }, []);

  // Update canvas size matching container dimensions and devicePixelRatio
  const updateSize = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);

    stateRef.current.width = rect.width;
    stateRef.current.height = rect.height;
    stateRef.current.dpr = dpr;

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  }, []);

  // Compute object-cover rendering rectangle for image on canvas
  const drawCoverImage = useCallback((ctx, img, width, height) => {
    if (!img || !img.naturalWidth || !img.naturalHeight) return;

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;
    let renderW, renderH;

    if (imgRatio > canvasRatio) {
      renderH = height;
      renderW = height * imgRatio;
    } else {
      renderW = width;
      renderH = width / imgRatio;
    }

    // Align with CSS object-[center_16%]
    const x = (width - renderW) * 0.5;
    const y = (height - renderH) * 0.16;

    ctx.drawImage(img, x, y, renderW, renderH);
  }, []);

  // Main 60 FPS animation loop
  const animate = useCallback(() => {
    const s = stateRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Smooth lerp interpolation for inertia and natural lag
    const dx = s.targetX - s.currentX;
    const dy = s.targetY - s.currentY;
    s.vx = dx * 0.12;
    s.vy = dy * 0.12;
    s.currentX += s.vx;
    s.currentY += s.vy;

    // Smooth scale lerp (in/out)
    s.scale += (s.targetScale - s.scale) * 0.14;
    s.time += 0.025;

    const dpr = s.dpr;
    const w = s.width;
    const h = s.height;

    // Clear entire canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // If completely closed and inactive, pause animation loop to save CPU
    if (s.scale <= 0.003 && s.targetScale === 0) {
      s.scale = 0;
      s.isActive = false;
      return;
    }

    if (!isLoadedRef.current || !altImageRef.current) {
      animFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    // Scale drawing context to account for high-DPI displays
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Build Organic Liquid Blob Mask
    // Base radius approximately 140px to 175px (giving 280px to 350px overall portal diameter)
    const baseRadius = (150 + Math.min(w, h) * 0.05) * s.scale;
    const numPoints = 24;
    const points = [];

    // Movement velocity for dynamic fluid stretch
    const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
    const motionAngle = Math.atan2(s.vy, s.vx);

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;

      // Multi-harmonic sinusoidal perturbation: produces asymmetric, continuously morphing edges
      let r = baseRadius;
      if (!s.reducedMotion) {
        const harmonic1 = Math.sin(angle * 3 + s.time * 2.2) * 0.18;
        const harmonic2 = Math.cos(angle * 5 - s.time * 1.6 + 1.2) * 0.12;
        const harmonic3 = Math.sin(angle * 7 + s.time * 2.8 + 2.5) * 0.08;
        const harmonic4 = Math.cos(angle * 2 - s.time * 0.9 + 0.7) * 0.10;

        // Dynamic fluid elongation along direction of velocity
        const velocityStretch = Math.cos(angle - motionAngle) * Math.min(speed / 12, 1) * 0.16;

        r = baseRadius * (1 + harmonic1 + harmonic2 + harmonic3 + harmonic4 + velocityStretch);
      }

      points.push({
        x: s.currentX + Math.cos(angle) * r,
        y: s.currentY + Math.sin(angle) * r,
      });
    }

    // Draw organic closed cubic curve path
    ctx.save();
    ctx.beginPath();

    // Start at midpoint between first and last point
    const firstMidX = (points[0].x + points[numPoints - 1].x) / 2;
    const firstMidY = (points[0].y + points[numPoints - 1].y) / 2;
    ctx.moveTo(firstMidX, firstMidY);

    for (let i = 0; i < numPoints; i++) {
      const nextIdx = (i + 1) % numPoints;
      const midX = (points[i].x + points[nextIdx].x) / 2;
      const midY = (points[i].y + points[nextIdx].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
    }
    ctx.closePath();

    // Apply soft feathered boundary filter
    // 14px blur creates a gentle, fluid transition from Image 2 into Image 1
    ctx.filter = 'blur(14px)';
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Composite: Draw Alternate Image 2 ONLY where the feathered organic mask exists
    ctx.globalCompositeOperation = 'source-in';
    ctx.filter = 'none';
    drawCoverImage(ctx, altImageRef.current, w, h);

    ctx.restore();

    // Continue loop
    animFrameRef.current = requestAnimationFrame(animate);
  }, [drawCoverImage]);

  // Start animation loop if not already running
  const ensureLoop = useCallback(() => {
    if (!stateRef.current.isActive) {
      stateRef.current.isActive = true;
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  // Pointer event handlers (unified for mouse, touch, and pen)
  const handlePointerEnter = (e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const s = stateRef.current;
    s.targetX = x;
    s.targetY = y;
    // Initialize current position to pointer location on first entry to avoid jumping
    if (s.scale < 0.05) {
      s.currentX = x;
      s.currentY = y;
    }
    s.targetScale = 1;
    ensureLoop();
  };

  const handlePointerMove = (e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const s = stateRef.current;
    s.targetX = e.clientX - rect.left;
    s.targetY = e.clientY - rect.top;
    s.targetScale = 1;
    ensureLoop();
  };

  const handlePointerLeave = () => {
    stateRef.current.targetScale = 0;
    ensureLoop();
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;

      const s = stateRef.current;
      s.targetX = x;
      s.targetY = y;
      s.currentX = x;
      s.currentY = y;
      s.targetScale = 1;
      ensureLoop();
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const s = stateRef.current;
      s.targetX = e.touches[0].clientX - rect.left;
      s.targetY = e.touches[0].clientY - rect.top;
      s.targetScale = 1;
      ensureLoop();
    }
  };

  const handleTouchEnd = () => {
    stateRef.current.targetScale = 0;
    ensureLoop();
  };

  // Resize listener
  useEffect(() => {
    updateSize();
    const handleResize = () => updateSize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [updateSize]);

  return (
    <div
      ref={containerRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{ touchAction: 'pan-y' }}
      className={`relative w-full overflow-hidden cursor-crosshair select-none ${aspectRatioClass} ${className}`}
    >
      {/* LAYER 1: Permanent Base Hero Image (Default) */}
      <img
        src={imageDefault}
        alt={alt}
        className="w-full h-full object-cover pointer-events-none transition-transform duration-700 ease-out"
        style={{ objectPosition }}
      />

      {/* LAYER 2: Alternate Image rendered through dynamically morphing organic liquid mask */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
