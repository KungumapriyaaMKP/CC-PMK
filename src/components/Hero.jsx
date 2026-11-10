import React, { useRef, useEffect, useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowRight, 
  ArrowDown,
  Volume2,
  VolumeX
} from 'lucide-react';
import { AGENCY_INFO } from '../data/content';

export default function Hero({ onOpenAudit }) {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const userManuallyMuted = useRef(false);

  // Guarantee automatic playback with audio ON as default on page load
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Default audio ON as requested
    video.muted = false;
    video.defaultMuted = false;
    video.volume = 1.0;
    setIsMuted(false);

    // Global unlock handler: on first user gesture of any kind (click, tap, scroll, key, touch),
    // immediately unmute and play with sound if the browser's autoplay policy temporarily held it back.
    const unlockAudio = () => {
      if (!userManuallyMuted.current && videoRef.current) {
        const v = videoRef.current;
        v.muted = false;
        v.volume = 1.0;
        v.play().then(() => {
          setIsMuted(false);
        }).catch(() => {});
      }
      interactionEvents.forEach(evt => {
        window.removeEventListener(evt, unlockAudio);
        document.removeEventListener(evt, unlockAudio);
      });
    };

    const interactionEvents = ['click', 'pointerdown', 'touchstart', 'touchend', 'keydown', 'wheel', 'scroll'];

    const startPlayback = () => {
      if (window.scrollY < 150 && !userManuallyMuted.current) {
        video.muted = false;
        video.volume = 1.0;
      }
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Unmuted autoplay succeeded directly!
            if (window.scrollY < 150 && !userManuallyMuted.current) {
              video.muted = false;
              video.volume = 1.0;
              setIsMuted(false);
            }
          })
          .catch(() => {
            // Browser autoplay policy restricted unmuted sound before user interaction.
            // Play visually with muted=true, and unlock sound on the very first gesture.
            video.muted = true;
            setIsMuted(true);
            video.play().catch(() => {});

            interactionEvents.forEach(evt => {
              window.addEventListener(evt, unlockAudio, { once: true, passive: true });
              document.addEventListener(evt, unlockAudio, { once: true, passive: true });
            });
          });
      }
    };

    startPlayback();

    video.addEventListener('loadeddata', startPlayback);
    window.addEventListener('focus', startPlayback);

    return () => {
      video.removeEventListener('loadeddata', startPlayback);
      window.removeEventListener('focus', startPlayback);
      interactionEvents.forEach(evt => {
        window.removeEventListener(evt, unlockAudio);
        document.removeEventListener(evt, unlockAudio);
      });
    };
  }, []);

  // Automatically MUTE when user scrolls past Hero, auto-restore when scrolled back to top
  useEffect(() => {
    const video = videoRef.current;
    const hero = heroRef.current;
    if (!video || !hero) return;

    const handleScroll = () => {
      const heroHeight = hero.offsetHeight || window.innerHeight;
      
      // As soon as user scrolls down past 30% of the hero, instantly mute automatically
      if (window.scrollY > heroHeight * 0.3) {
        if (!video.muted) {
          video.muted = true;
          setIsMuted(true);
        }
      } else if (window.scrollY < 60 && !userManuallyMuted.current) {
        // When user scrolls back to the top of Hero, restore audio
        if (video.muted) {
          video.muted = false;
          video.volume = 1.0;
          video.play().then(() => {
            setIsMuted(false);
          }).catch(() => {});
        }
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When hero leaves viewport, guarantee audio is muted
        if (!entry.isIntersecting || entry.intersectionRatio < 0.15) {
          if (!video.muted) {
            video.muted = true;
            setIsMuted(true);
          }
        }
      },
      { threshold: [0, 0.15, 0.5, 0.8, 1.0] }
    );

    observer.observe(hero);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSound = (e) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      video.volume = 1.0;
      userManuallyMuted.current = false;
      video.play().then(() => {
        setIsMuted(false);
      }).catch(() => {
        video.muted = false;
        setIsMuted(false);
      });
    } else {
      video.muted = true;
      userManuallyMuted.current = true;
      setIsMuted(true);
    }
  };

  const scrollToNext = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative w-full h-[100dvh] min-h-[580px] sm:min-h-[640px] flex items-center overflow-hidden bg-black text-white"
    >
      {/* 1. Full Screen Background Video (Clean, Bright, Natural Lighting, Audio Enabled at Top, Auto-Mutes on Scroll) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          src="/assets/showcase-video.mp4"
          autoPlay
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-[48%_center] sm:object-[52%_center] lg:object-[58%_center]"
        />

        {/* Light subtle scrim strictly behind text area for crisp readability without darkening the video */}
        <div className="hidden sm:block absolute inset-y-0 left-0 w-full md:w-1/2 bg-gradient-to-r from-black/45 via-black/25 to-transparent pointer-events-none" />
        <div className="sm:hidden absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 via-50% to-transparent pointer-events-none" />
      </div>

      {/* Floating Audio Control Pill */}
      <div className="absolute top-20 sm:top-24 right-3 sm:right-8 z-30">
        <button
          type="button"
          onClick={toggleSound}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[9.5px] sm:text-[10.5px] font-mono font-bold uppercase tracking-wider text-white bg-black/60 hover:bg-black/80 border border-white/30 backdrop-blur-md rounded-none shadow-lg transition-all"
          title={isMuted ? "Click to Unmute Audio" : "Sound Active - Auto-mutes when scrolling"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
              <span>Unmute Audio</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Audio On</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Front Landing Page Content Overlay (Brought Down to Lower-Left to Keep Face Fully Open) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-6 sm:pb-8 flex flex-col justify-end h-full">
        
        {/* Main Left-Aligned Headline & Actions (Positioned Lower-Left) */}
        <div className="max-w-xl lg:max-w-2xl space-y-4 sm:space-y-5 text-left pb-2 sm:pb-3">
          <div className="space-y-1 sm:space-y-2">
            <h1 className="font-serif font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-white tracking-[-0.01em] leading-[1.1] uppercase drop-shadow-md">
              WE BUILD SOCIAL <br />
              STRATEGIES THAT <br />
              <span className="italic text-slate-200">
                GROW BUSINESSES.
              </span>
            </h1>
          </div>

          {/* High-Converting Action CTAs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
            <button
              type="button"
              onClick={onOpenAudit}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 text-[11px] sm:text-xs font-bold text-[#0F172A] bg-white hover:bg-slate-100 rounded-none shadow-lg hover:shadow-xl transition-all group uppercase tracking-[0.14em] sm:tracking-[0.16em]"
            >
              <span>Start A Project</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0F172A] group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={scrollToNext}
              className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 sm:px-5 sm:py-3 text-[11px] sm:text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md rounded-none shadow-md transition-all group uppercase tracking-[0.14em] sm:tracking-[0.16em]"
            >
              <span>Explore Strategy</span>
              <ArrowDown className="w-3.5 h-3.5 text-white group-hover:translate-y-0.5 transition-transform stroke-[2]" />
            </button>

            <a
              href={`https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent("Hi Poojaa, I saw your Career Compass video reel and would like to work with you on social growth.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-3 text-[11px] sm:text-xs font-bold text-white bg-black/60 hover:bg-black/80 border border-white/25 backdrop-blur-md rounded-none transition-all group uppercase tracking-[0.12em]"
              title="Direct WhatsApp"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[1.75]" />
            </a>
          </div>

          {/* Four Metric Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-3 border-t border-white/20 max-w-xl">
            <div>
              <div className="font-sans font-black text-lg sm:text-xl lg:text-2xl text-white">2 Cr+</div>
              <div className="text-[9px] sm:text-[9.5px] font-mono text-slate-300 uppercase tracking-wider mt-0.5">Campaign Views</div>
            </div>
            <div>
              <div className="font-sans font-black text-lg sm:text-xl lg:text-2xl text-white">11M</div>
              <div className="text-[9px] sm:text-[9.5px] font-mono text-slate-300 uppercase tracking-wider mt-0.5">Peak Reel</div>
            </div>
            <div>
              <div className="font-sans font-black text-lg sm:text-xl lg:text-2xl text-white">46.5k</div>
              <div className="text-[9px] sm:text-[9.5px] font-mono text-slate-300 uppercase tracking-wider mt-0.5">Audience Built</div>
            </div>
            <div>
              <div className="font-sans font-black text-lg sm:text-xl lg:text-2xl text-white">6 Yrs</div>
              <div className="text-[9px] sm:text-[9.5px] font-mono text-slate-300 uppercase tracking-wider mt-0.5">Data Analytics</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Scroll Indicator */}
        <div className="flex items-center justify-start pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={scrollToNext}
            className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white transition-colors group cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-none bg-white animate-bounce" />
            <span className="uppercase tracking-widest text-[10.5px]">Scroll To Explore</span>
            <ArrowDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
