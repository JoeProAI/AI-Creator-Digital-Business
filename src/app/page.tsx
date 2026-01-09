'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [passedSections, setPassedSections] = useState<Set<string>>(new Set());
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());

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
            <div className="flex items-center gap-[var(--space-3)]">
              <div className="w-10 h-10 bg-[var(--color-text)] flex items-center justify-center">
                <span className="text-[var(--color-bg)] font-bold text-lg font-display">C</span>
              </div>
              <span className="text-[var(--text-sm)] uppercase tracking-[0.2em] font-semibold hidden sm:block">
                Creator Hub
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-[var(--space-6)]">
              <a href="#feedback" className="text-[var(--text-sm)] uppercase tracking-widest hover:text-[var(--color-accent)] transition-colors">
                Feedback
              </a>
              <a href="#tips" className="text-[var(--text-sm)] uppercase tracking-widest hover:text-[var(--color-accent)] transition-colors">
                Tips
              </a>
              <a href="#vision" className="text-[var(--text-sm)] uppercase tracking-widest hover:text-[var(--color-accent)] transition-colors">
                Vision
              </a>
            </nav>

            <button className="brutal-btn brutal-btn-primary">
              Submit
            </button>
          </div>
        </div>
      </header>

      {/* Hero - Typographic authority */}
      <section className="border-b-[4px] border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-[var(--space-4)] md:px-[var(--space-6)] py-[var(--space-12)] md:py-[calc(var(--space-12)*1.5)]">
          <div className="grid md:grid-cols-[2fr_1fr] gap-[var(--space-8)] items-end">
            <div>
              <span className="brutal-label brutal-label-accent mb-[var(--space-4)] inline-block">
                Est. 2025
              </span>
              <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] tracking-[-0.02em] mb-[var(--space-4)]">
                Creator<br />
                <span className="italic">Digital</span><br />
                Business
              </h1>
              <p className="text-[var(--text-lg)] text-[var(--color-muted)] max-w-[500px] leading-relaxed">
                A collective space for digital creators. Share problems with solutions.
                Exchange knowledge. Build accountability. Nothing advances without action.
              </p>
            </div>

            <div className="brutal-card brutal-shadow-lg">
              <div className="text-[var(--text-xs)] uppercase tracking-[0.2em] text-[var(--color-muted)] mb-[var(--space-2)]">
                Status
              </div>
              <div className="brutal-stat text-[var(--color-accent)]">0</div>
              <div className="text-[var(--text-sm)] mt-[var(--space-2)]">Active creators</div>

              <div className="h-[2px] bg-[var(--color-border)] my-[var(--space-4)]" />

              <div className="grid grid-cols-2 gap-[var(--space-4)]">
                <div>
                  <div className="text-[var(--text-2xl)] font-display">0</div>
                  <div className="text-[var(--text-xs)] uppercase tracking-widest text-[var(--color-muted)]">Submissions</div>
                </div>
                <div>
                  <div className="text-[var(--text-2xl)] font-display">0</div>
                  <div className="text-[var(--text-xs)] uppercase tracking-widest text-[var(--color-muted)]">Solutions</div>
                </div>
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
              className={`section-marker p-[var(--space-6)] ${passedSections.has('01') ? 'is-passed' : ''}`}
            >
              <div className="text-[var(--text-xs)] uppercase tracking-[0.3em] text-[var(--color-muted)] mb-[var(--space-3)]">
                01 / Feedback
              </div>
              <h2 className="font-display text-[var(--text-2xl)] mb-[var(--space-3)]">
                Problems<br />&amp; Solutions
              </h2>
              <p className="text-[var(--color-muted)] mb-[var(--space-6)] leading-relaxed">
                Submit issues paired with proposed fixes. No complaint advances without a path forward.
                Weekly themed submissions to the collective.
              </p>
              <button className="brutal-btn w-full justify-between group">
                <span>Submit feedback</span>
                <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </article>

            {/* Tips */}
            <article
              id="tips"
              ref={registerSection('02')}
              data-section="02"
              className={`section-marker p-[var(--space-6)] ${passedSections.has('02') ? 'is-passed' : ''}`}
            >
              <div className="text-[var(--text-xs)] uppercase tracking-[0.3em] text-[var(--color-muted)] mb-[var(--space-3)]">
                02 / Knowledge
              </div>
              <h2 className="font-display text-[var(--text-2xl)] mb-[var(--space-3)]">
                Tips<br />&amp; Tricks
              </h2>
              <p className="text-[var(--color-muted)] mb-[var(--space-6)] leading-relaxed">
                Share what works. Platform expertise, workflow optimizations, tool configurations.
                Inform collective planning through shared intelligence.
              </p>
              <button className="brutal-btn w-full justify-between group">
                <span>Share knowledge</span>
                <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </article>

            {/* Vision */}
            <article
              id="vision"
              ref={registerSection('03')}
              data-section="03"
              className={`section-marker p-[var(--space-6)] ${passedSections.has('03') ? 'is-passed' : ''}`}
            >
              <div className="text-[var(--text-xs)] uppercase tracking-[0.3em] text-[var(--color-muted)] mb-[var(--space-3)]">
                03 / Accountability
              </div>
              <h2 className="font-display text-[var(--text-2xl)] mb-[var(--space-3)]">
                Vision<br />Board
              </h2>
              <p className="text-[var(--color-muted)] mb-[var(--space-6)] leading-relaxed">
                Declare intentions publicly. Find partners. Track progress together.
                Shared commitment creates momentum.
              </p>
              <button className="brutal-btn w-full justify-between group">
                <span>Set your vision</span>
                <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
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
              { name: 'Written Content', code: 'WRT' },
              { name: 'Digital Music', code: 'MUS' },
              { name: 'Digital Image', code: 'IMG' },
              { name: 'Video / Animation', code: 'VID' },
              { name: 'Software & Dev', code: 'DEV' },
              { name: 'Organization', code: 'ORG' },
              { name: 'Education', code: 'EDU' },
              { name: 'Digital Business', code: 'BIZ' },
              { name: 'Marketing & PR', code: 'MKT' },
              { name: 'Voice / Audio', code: 'AUD' },
              { name: 'Automation', code: 'AUT' },
              { name: 'Other', code: '...' },
            ].map((cat) => (
              <button
                key={cat.code}
                className="brutal-btn text-[var(--text-xs)] py-[var(--space-2)] px-[var(--space-3)]"
              >
                <span className="text-[var(--color-muted)]">[{cat.code}]</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - Sequential */}
      <section className="border-b-[4px] border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-[var(--space-4)] md:px-[var(--space-6)] py-[var(--space-8)]">
          <h2 className="font-display text-[var(--text-xl)] mb-[var(--space-6)]">Process</h2>

          <div className="grid md:grid-cols-4 gap-[var(--space-4)]">
            {[
              { step: '01', title: 'Submit', desc: 'Share feedback with a solution, tip, or vision goal via form.' },
              { step: '02', title: 'Collect', desc: 'Data flows to organized sheets. Categories parsed automatically.' },
              { step: '03', title: 'Review', desc: 'Weekly themed batches presented to the collective.' },
              { step: '04', title: 'Connect', desc: 'Matching creators found. Accountability partnerships formed.' },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-[var(--text-hero)] font-display text-[var(--color-border)] opacity-20 absolute -top-4 -left-2">
                  {item.step}
                </div>
                <div className="relative pt-[var(--space-8)]">
                  <h3 className="text-[var(--text-lg)] font-semibold mb-[var(--space-2)]">{item.title}</h3>
                  <p className="text-[var(--text-sm)] text-[var(--color-muted)] leading-relaxed">{item.desc}</p>
                </div>
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
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1] mb-[var(--space-4)]">
                Ready to<br />contribute?
              </h2>
              <p className="text-[var(--color-bg)] opacity-70 max-w-[400px]">
                Join the collective. Your expertise strengthens the whole.
                No observers. Only participants.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-[var(--space-3)]">
              <button className="brutal-btn bg-[var(--color-bg)] text-[var(--color-text)] border-[var(--color-bg)]">
                Submit Feedback
              </button>
              <button className="brutal-btn border-[var(--color-bg)] text-[var(--color-bg)] bg-transparent hover:bg-[var(--color-bg)] hover:text-[var(--color-text)]">
                Share a Tip
              </button>
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
              <span className="text-[var(--text-xs)] uppercase tracking-[0.15em]">
                Creator Digital Business
              </span>
            </div>

            <p className="text-[var(--text-xs)] text-[var(--color-muted)]">
              Nothing moves forward without solutions.
            </p>

            <div className="flex items-center gap-[var(--space-4)]">
              <a
                href="#"
                className="text-[var(--text-xs)] uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                aria-label="X (formerly Twitter)"
              >
                X
              </a>
              <a
                href="#"
                className="text-[var(--text-xs)] uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                aria-label="GitHub"
              >
                GH
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
