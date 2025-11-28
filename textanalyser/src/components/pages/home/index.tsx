"use client";
import * as React from "react";
import Intro from "./intro";
import Features from "./features";
import Highlights from "./highlights";

/**
 * FadeInSection: Component that applies fade-in animation on scroll
 */
function FadeInSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0px) scale(1)"
          : "translateY(30px) scale(0.98)",
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * FloatingParticles: Animated background particles
 */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-sky-400/30 dark:bg-sky-500/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(5px); }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-linear-to-b from-blue-50 via-indigo-50 to-purple-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 min-h-screen transition-colors duration-500">
      {/* Scroll progress bar with gradient */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 z-50 transform-gpu shadow-lg"
        style={{ 
          width: `${scrollProgress}%`,
          boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
        }}
      />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative w-full min-h-screen flex flex-col items-center justify-start pt-20 pb-12 overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(59, 130, 246, 0.15) 0%,
              rgba(147, 51, 234, 0.1) 40%,
              transparent 100%
            )
          `,
        }}
      >
        {/* Enhanced dark mode overlay */}
        <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(30,58,138,0.3)_0%,rgba(88,28,135,0.2)_40%,transparent_100%)] pointer-events-none" />

        {/* Animated background elements with enhanced colors */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-linear-to-br from-blue-300 to-indigo-400 dark:from-blue-600/30 dark:to-indigo-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-20 animate-pulse" />
          <div
            className="absolute -bottom-32 right-40 w-96 h-96 bg-linear-to-br from-purple-300 to-pink-400 dark:from-purple-600/30 dark:to-pink-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-20 animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/3 -right-32 w-80 h-80 bg-linear-to-br from-cyan-300 to-blue-400 dark:from-cyan-600/30 dark:to-blue-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-15 animate-pulse"
            style={{ animationDelay: "4s" }}
          />
        </div>

        {/* Floating particles */}
        <FloatingParticles />

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Main content container */}
        <div className="relative z-10 w-full flex flex-col items-center gap-12">
          {/* Intro Section with enhanced glow */}
          <FadeInSection delay={0}>
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-purple-500 dark:from-blue-500 dark:to-purple-600 blur-3xl opacity-20 dark:opacity-30 animate-pulse pointer-events-none" />
              <div className="relative z-10">
                <Intro />
              </div>
            </div>
          </FadeInSection>

          {/* Features Section - Enhanced Card Style */}
          <FadeInSection delay={200}>
            <div className="w-full max-w-7xl px-4 mx-auto">
              <div className="group bg-white/90 dark:bg-slate-800/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-blue-200/50 dark:border-blue-500/20 overflow-hidden transition-all duration-500 hover:shadow-blue-500/20 hover:shadow-3xl hover:border-blue-300/70 dark:hover:border-blue-400/40 hover:-translate-y-1">
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <Features />
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Highlights Section - Enhanced Dark Card Style */}
          <FadeInSection delay={400}>
            <div className="w-full max-w-7xl px-4 mx-auto mb-12">
              <div className="group bg-linear-to-br from-slate-900 via-blue-950 to-purple-950 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 rounded-3xl shadow-2xl border border-blue-500/30 dark:border-blue-500/20 overflow-hidden transition-all duration-500 hover:shadow-purple-500/30 hover:shadow-3xl hover:border-blue-400/50 dark:hover:border-blue-400/30 hover:-translate-y-1">
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <Highlights />
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-all duration-300 group">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
            Scroll
          </span>
          <div className="animate-bounce group-hover:scale-110 transition-transform">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 blur-lg opacity-50" />
              <svg
                className="relative w-6 h-6 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-24 px-4 text-center bg-linear-to-b from-purple-100 via-blue-100 to-indigo-200 dark:from-blue-950 dark:via-purple-950 dark:to-slate-950 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/30 dark:bg-blue-600/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300/30 dark:bg-purple-600/20 rounded-full filter blur-3xl" />
        </div>

        <FadeInSection>
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-block mb-4 px-4 py-1.5 bg-linear-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-blue-300/50 dark:border-blue-500/30 rounded-full">
              <span className="text-sm font-semibold bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Get Started Today
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent mb-6">
              Ready to Analyze Your Text?
            </h2>
            
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-10 max-w-xl mx-auto">
              Get started with our powerful text analysis tools in seconds. Experience the future of content analysis.
            </p>
            
            <a
              href="/tools/analyser"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500 dark:hover:from-blue-600 dark:hover:via-purple-600 dark:hover:to-pink-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative">Launch Analyser</span>
              <svg
                className="relative w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <span>Instant results</span>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}