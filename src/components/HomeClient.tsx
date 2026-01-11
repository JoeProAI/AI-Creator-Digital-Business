'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Google Form URLs
const FORMS = {
  roster: 'https://forms.gle/tutbWMinipTX3UHF6',
  tips: 'https://forms.gle/p6pR3sMGQ8iuFEpD9',
  vision: 'https://forms.gle/6cH5dpkiZbaVxRVg9',
  awards: 'https://forms.gle/tNVU3tYkrXkg3YhP8',
};

interface HomeClientProps {
  stats: {
    creatorCount: number;
    feedbackCount: number;
    tipsCount: number;
    visionCount: number;
  };
}

export default function HomeClient({ stats }: HomeClientProps) {
  const [passedSections, setPassedSections] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());

  // Trigger entrance animations on mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Live clock for that "alive" feel
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Signature element: Track scroll position to thicken section borders
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute('data-section');
          if (!sectionId) return;

          setPassedSections((prev) => {
            const next = new Set(prev);
            if (entry.boundingClientRect.top < 200) {
              next.add(sectionId);
            }
            return next;
          });
        });
      },
      { threshold: 0, rootMargin: '-200px 0px 0px 0px' }
    );

    sectionsRef.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const registerSection = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionsRef.current.set(id, el);
  };

  return (
    <div className="min-h-screen">
      {/* Header - Stark, functional */}
      <header className="border-b-[4px] border-[var(--color-border)] bg-[var(--color-surface)] sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className={`flex items-center gap-[var(--space-3)] ${isLoaded ? 'animate-slide-in' : 'will-animate'}`}>
              <div className="w-10 h-10 bg-[var(--color-text)] flex items-center justify-center hover-glitch">
                <span className="text-[var(--color-bg)] font-bold text-lg font-display">C</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-[var(--text-sm)] uppercase tracking-[0.15em] font-semibold">
                  COX Coop
                </span>
                <div className="flex items-center gap-2 text-[var(--text-xs)] text-[var(--color-muted)]">
                  <span className="w-1.5 h-1.5 bg-[var(--color-success)] animate-pulse" />
                  <span>Live</span>
                  <span className="animate-ticker">{currentTime}</span>
                </div>
              </div>
            </div>

            <nav className={`hidden md:flex items-center gap-[var(--space-6)] ${isLoaded ? 'animate-fade-in delay-2' : 'will-animate'}`}>
              <a href="#feedback" className="text-[var(--text-sm)] uppercase tracking-widest hover-underline">
                Feedback
              </a>
              <a href="#tips" className="text-[var(--text-sm)] uppercase tracking-widest hover-underline">
                Tips
              </a>
              <a href="#vision" className="text-[var(--text-sm)] uppercase tracking-widest hover-underline">
                Vision
              </a>
              <Link href="/roster" className="text-[var(--text-sm)] uppercase tracking-widest hover-underline">
                Roster
              </Link>
            </nav>

            <a
              href={FORMS.roster}
              target="_blank"
              rel="noopener noreferrer"
              className={`brutal-btn brutal-btn-primary ${isLoaded ? 'animate-slide-in delay-3' : 'will-animate'}`}
            >
              Join
            </a>
          </div>
        </div>
      </header>

      {/* Marquee - Adds motion and life */}
      <div className="bg-[var(--color-text)] text-[var(--color-bg)] py-2 overflow-hidden border-b-[2px] border-[var(--color-border)]">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="text-[var(--text-xs)] uppercase tracking-[0.3em] mx-8">
              Problems need solutions &bull; Share your knowledge &bull; Build accountability &bull; Connect with creators &bull; Nothing moves without action &bull; Join the COX Coop &bull;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Hero - Typographic authority */}
      <section className="border-b-[4px] border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-[var(--space-4)] md:px-[var(--space-6)] py-[var(--space-12)] md:py-[calc(var(--space-12)*1.5)]">
          <div className="grid md:grid-cols-[2fr_1fr] gap-[var(--space-8)] items-end">
            <div>
              <span className={`brutal-label brutal-label-accent mb-[var(--space-4)] inline-block ${isLoaded ? 'animate-slide-up' : 'will-animate'}`}>
                Est. 2025
              </span>
              <h1 className={`font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] tracking-[-0.02em] mb-[var(--space-4)] ${isLoaded ? 'animate-slide-up delay-1' : 'will-animate'}`}>
                <span className="hover-glitch inline-block">COX</span><br />
                <span className="italic">Coop</span>
              </h1>
              <p className={`text-[var(--text-lg)] text-[var(--color-muted)] max-w-[500px] leading-relaxed ${isLoaded ? 'animate-slide-up delay-2' : 'will-animate'}`}>
                The digital creator cooperative. Share problems with solutions.
                Exchange knowledge. Build accountability. Nothing advances without action.
              </p>

              <div className={`flex flex-wrap gap-[var(--space-3)] mt-[var(--space-6)] ${isLoaded ? 'animate-slide-up delay-3' : 'will-animate'}`}>
                <a
                  href={FORMS.roster}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-btn brutal-btn-primary"
                >
                  Get Started
                </a>
                <Link href="/roster" className="brutal-btn">
                  View Roster
                </Link>
              </div>
            </div>

            <div className={`brutal-card brutal-shadow-lg animate-border-pulse ${isLoaded ? 'animate-slide-up delay-4' : 'will-animate'}`}>
              <div className="flex items-center justify-between mb-[var(--space-2)]">
                <div className="text-[var(--text-xs)] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  Status
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[var(--color-success)] animate-pulse" />
                  <span className="text-[var(--text-xs)] text-[var(--color-success)]">Online</span>
                </div>
              </div>
              <div className="brutal-stat text-[var(--color-accent)] counter-animate">{stats.creatorCount}</div>
              <div className="text-[var(--text-sm)] mt-[var(--space-2)]">Active creators</div>

              <div className="h-[2px] bg-[var(--color-border)] my-[var(--space-4)]" />

              <div className="grid grid-cols-3 gap-[var(--space-3)]">
                <div className="hover-lift cursor-default">
                  <div className="text-[var(--text-xl)] font-display counter-animate">{stats.feedbackCount}</div>
                  <div className="text-[var(--text-xs)] uppercase tracking-widest text-[var(--color-muted)]">Feedback</div>
                </div>
                <div className="hover-lift cursor-default">
                  <div className="text-[var(--text-xl)] font-display counter-animate">{stats.tipsCount}</div>
                  <div className="text-[var(--text-xs)] uppercase tracking-widest text-[var(--color-muted)]">Tips</div>
                </div>
                <div className="hover-lift cursor-default">
                  <div className="text-[var(--text-xl)] font-display counter-animate">{stats.visionCount}</div>
                  <div className="text-[var(--text-xs)] uppercase tracking-widest text-[var(--color-muted)]">Vision</div>
                </div>
              </div>

              <div className="h-[2px] bg-[var(--color-border)] my-[var(--space-4)]" />

              <div className="text-[var(--text-xs)] text-[var(--color-muted)] flex items-center justify-between">
                <span>Last updated</span>
                <span className="font-semibold">Just now</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars - Grid system */}
      <section className="border-b-[4px] border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="brutal-grid grid-cols-1 md:grid-cols-3">
            {/* Feedback */}
            <article
              id="feedback"
              ref={registerSection('01')}
              data-section="01"
              className={`section-marker p-[var(--space-6)] group flex flex-col ${passedSections.has('01') ? 'is-passed' : ''}`}
            >
              <div className="text-[var(--text-xs)] uppercase tracking-[0.3em] text-[var(--color-muted)] mb-[var(--space-3)] flex items-center justify-between">
                <span>01 / Feedback</span>
                <span className="w-8 h-[2px] bg-[var(--color-border)] group-hover:bg-[var(--color-accent)] group-hover:w-12 transition-all" />
              </div>
              <h2 className="font-display text-[var(--text-2xl)] mb-[var(--space-3)] group-hover:translate-x-1 transition-transform">
                Problems<br />&amp; Solutions
              </h2>
              <p className="text-[var(--color-muted)] mb-[var(--space-6)] leading-relaxed flex-grow">
                Submit issues paired with proposed fixes. No complaint advances without a path forward.
                Weekly themed submissions to the COX Coop.
              </p>
              <a
                href={FORMS.roster}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn w-full justify-between group/btn mt-auto"
              >
                <span>Submit feedback</span>
                <span className="transform group-hover/btn:translate-x-2 transition-transform">&rarr;</span>
              </a>
            </article>

            {/* Tips */}
            <article
              id="tips"
              ref={registerSection('02')}
              data-section="02"
              className={`section-marker p-[var(--space-6)] group flex flex-col ${passedSections.has('02') ? 'is-passed' : ''}`}
            >
              <div className="text-[var(--text-xs)] uppercase tracking-[0.3em] text-[var(--color-muted)] mb-[var(--space-3)] flex items-center justify-between">
                <span>02 / Knowledge</span>
                <span className="w-8 h-[2px] bg-[var(--color-border)] group-hover:bg-[var(--color-accent)] group-hover:w-12 transition-all" />
              </div>
              <h2 className="font-display text-[var(--text-2xl)] mb-[var(--space-3)] group-hover:translate-x-1 transition-transform">
                Tips<br />&amp; Tricks
              </h2>
              <p className="text-[var(--color-muted)] mb-[var(--space-6)] leading-relaxed flex-grow">
                Share what works. Platform expertise, workflow optimizations, tool configurations.
                Inform COX Coop planning through shared intelligence.
              </p>
              <a
                href={FORMS.tips}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn w-full justify-between group/btn mt-auto"
              >
                <span>Share knowledge</span>
                <span className="transform group-hover/btn:translate-x-2 transition-transform">&rarr;</span>
              </a>
            </article>

            {/* Vision */}
            <article
              id="vision"
              ref={registerSection('03')}
              data-section="03"
              className={`section-marker p-[var(--space-6)] group flex flex-col ${passedSections.has('03') ? 'is-passed' : ''}`}
            >
              <div className="text-[var(--text-xs)] uppercase tracking-[0.3em] text-[var(--color-muted)] mb-[var(--space-3)] flex items-center justify-between">
                <span>03 / Accountability</span>
                <span className="w-8 h-[2px] bg-[var(--color-border)] group-hover:bg-[var(--color-accent)] group-hover:w-12 transition-all" />
              </div>
              <h2 className="font-display text-[var(--text-2xl)] mb-[var(--space-3)] group-hover:translate-x-1 transition-transform">
                Vision<br />Board
              </h2>
              <p className="text-[var(--color-muted)] mb-[var(--space-6)] leading-relaxed flex-grow">
                Declare intentions publicly. Find partners. Track progress together.
                Shared commitment creates momentum.
              </p>
              <a
                href={FORMS.vision}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn w-full justify-between group/btn mt-auto"
              >
                <span>Set your vision</span>
                <span className="transform group-hover/btn:translate-x-2 transition-transform">&rarr;</span>
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Categories - Raw tags */}
      <section className="border-b-[4px] border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-[var(--space-4)] md:px-[var(--space-6)] py-[var(--space-8)]">
          <div className="flex items-start justify-between mb-[var(--space-6)] flex-wrap gap-4">
            <div>
              <h2 className="font-display text-[var(--text-xl)] mb-[var(--space-2)]">Creator Categories</h2>
              <p className="text-[var(--text-sm)] text-[var(--color-muted)]">Select your domain. Filter by expertise.</p>
            </div>
            <span className="brutal-label">12 categories</span>
          </div>

          <div className="flex flex-wrap gap-[var(--space-2)]">
            {[
              { name: 'Written Content', code: 'WRT', hot: false },
              { name: 'Digital Music', code: 'MUS', hot: true },
              { name: 'Digital Image', code: 'IMG', hot: true },
              { name: 'Video / Animation', code: 'VID', hot: true },
              { name: 'Software & Dev', code: 'DEV', hot: false },
              { name: 'Organization', code: 'ORG', hot: false },
              { name: 'Education', code: 'EDU', hot: true },
              { name: 'Digital Business', code: 'BIZ', hot: false },
              { name: 'Marketing & PR', code: 'MKT', hot: false },
              { name: 'Voice / Audio', code: 'AUD', hot: false },
              { name: 'Automation', code: 'AUT', hot: false },
              { name: 'Other', code: '...', hot: false },
            ].map((cat) => (
              <Link
                key={cat.code}
                href={`/roster?category=${encodeURIComponent(cat.name)}`}
                className={`brutal-btn text-[var(--text-xs)] py-[var(--space-2)] px-[var(--space-3)] ${cat.hot ? 'border-[var(--color-accent)]' : ''}`}
              >
                <span className={cat.hot ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]'}>[{cat.code}]</span>
                <span>{cat.name}</span>
                {cat.hot && <span className="w-1.5 h-1.5 bg-[var(--color-accent)] animate-pulse" />}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - Sequential */}
      <section className="border-b-[4px] border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-[var(--space-4)] md:px-[var(--space-6)] py-[var(--space-8)]">
          <div className="flex items-center justify-between mb-[var(--space-6)]">
            <h2 className="font-display text-[var(--text-xl)]">Process</h2>
            <span className="text-[var(--text-xs)] uppercase tracking-widest text-[var(--color-muted)]">4 steps</span>
          </div>

          <div className="grid md:grid-cols-4 gap-[var(--space-4)]">
            {[
              { step: '01', title: 'Submit', desc: 'Share feedback with a solution, tip, or vision goal via form.', active: true },
              { step: '02', title: 'Collect', desc: 'Data flows to organized sheets. Categories parsed automatically.', active: false },
              { step: '03', title: 'Review', desc: 'Weekly themed batches presented to the COX Coop.', active: false },
              { step: '04', title: 'Connect', desc: 'Matching creators found. Accountability partnerships formed.', active: false },
            ].map((item, index) => (
              <div
                key={item.step}
                className={`relative group hover-lift cursor-default p-[var(--space-4)] border-[2px] ${item.active ? 'border-[var(--color-border)] bg-[var(--color-surface)] brutal-shadow' : 'border-transparent'}`}
              >
                <div className={`text-[clamp(2rem,6vw,4rem)] font-display opacity-20 absolute top-0 left-2 transition-colors ${item.active ? 'text-[var(--color-accent)]' : 'text-[var(--color-border)]'} group-hover:text-[var(--color-accent)]`}>
                  {item.step}
                </div>
                <div className="relative pt-[var(--space-6)]">
                  <div className="flex items-center gap-2 mb-[var(--space-2)]">
                    <h3 className="text-[var(--text-lg)] font-semibold">{item.title}</h3>
                    {item.active && <span className="brutal-label brutal-label-accent text-[10px]">Current</span>}
                  </div>
                  <p className="text-[var(--text-sm)] text-[var(--color-muted)] leading-relaxed">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-[var(--space-2)] w-[var(--space-4)] h-[2px] bg-[var(--color-border)]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[var(--color-text)] text-[var(--color-bg)]">
        <div className="max-w-[1400px] mx-auto px-[var(--space-4)] md:px-[var(--space-6)] py-[var(--space-12)]">
          <div className="grid md:grid-cols-2 gap-[var(--space-8)] items-center">
            <div>
              <div className="text-[var(--text-xs)] uppercase tracking-[0.3em] opacity-50 mb-[var(--space-3)]">
                Join the COX Coop
              </div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1] mb-[var(--space-4)]">
                Ready to<br />contribute?
              </h2>
              <p className="opacity-70 max-w-[400px]">
                Join the COX Coop. Your expertise strengthens the whole.
                No observers. Only participants.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-[var(--space-3)]">
              <a
                href={FORMS.roster}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn bg-[var(--color-bg)] text-[var(--color-text)] border-[var(--color-bg)] hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] hover:text-[var(--color-bg)]"
              >
                Join the Roster
              </a>
              <a
                href={FORMS.tips}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn border-[var(--color-bg)] text-[var(--color-bg)] bg-transparent hover:bg-[var(--color-bg)] hover:text-[var(--color-text)]"
              >
                Share a Tip
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal, functional */}
      <footer className="border-t-[4px] border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-[var(--space-4)] md:px-[var(--space-6)] py-[var(--space-6)]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-[var(--space-4)]">
            <div className="flex items-center gap-[var(--space-3)]">
              <div className="w-8 h-8 bg-[var(--color-text)] flex items-center justify-center">
                <span className="text-[var(--color-bg)] font-bold text-sm font-display">C</span>
              </div>
              <div>
                <span className="text-[var(--text-xs)] uppercase tracking-[0.15em] block">
                  COX Coop
                </span>
                <span className="text-[var(--text-xs)] text-[var(--color-muted)]">
                  {new Date().getFullYear()}
                </span>
              </div>
            </div>

            <p className="text-[var(--text-xs)] text-[var(--color-muted)] max-w-[300px]">
              Nothing moves forward without solutions. Built by creators, for creators.
            </p>

            <div className="flex items-center gap-[var(--space-4)]">
              <a
                href="#"
                className="text-[var(--text-xs)] uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors hover-underline"
                aria-label="X (formerly Twitter)"
              >
                X
              </a>
              <a
                href="https://github.com/JoeProAI/AI-Creator-Digital-Business"
                className="text-[var(--text-xs)] uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors hover-underline"
                aria-label="GitHub"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
