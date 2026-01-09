export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-[var(--accent-primary)] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" />
        <div className="absolute top-60 -right-40 w-96 h-96 bg-[var(--accent-secondary)] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-[var(--accent-tertiary)] rounded-full mix-blend-multiply filter blur-[128px] opacity-15 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="border-b border-[var(--border)] backdrop-blur-xl bg-[var(--background)]/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <span className="font-semibold text-xl tracking-tight">Creator Hub</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#feedback" className="text-sm text-[var(--foreground)]/70 hover:text-[var(--accent-primary)] transition-colors">Feedback</a>
            <a href="#tips" className="text-sm text-[var(--foreground)]/70 hover:text-[var(--accent-secondary)] transition-colors">Tips & Tricks</a>
            <a href="#vision" className="text-sm text-[var(--foreground)]/70 hover:text-[var(--accent-tertiary)] transition-colors">Vision Board</a>
          </nav>
          <button className="px-5 py-2.5 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
            Submit
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-secondary)] animate-pulse" />
            <span className="text-sm text-[var(--foreground)]/70">Community-Powered Platform</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="gradient-text">AI Creator</span>
            <br />
            <span className="text-[var(--foreground)]">Digital Business</span>
          </h1>
          <p className="text-xl text-[var(--foreground)]/60 max-w-xl mx-auto mb-10">
            Share feedback, exchange tips, and build your vision with fellow AI creators. Nothing moves forward without solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-[var(--foreground)] text-[var(--background)] rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Submit Feedback
            </button>
            <button className="px-8 py-4 border border-[var(--border)] rounded-full font-medium hover:bg-[var(--surface)] transition-colors">
              Explore Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Creators', value: '0', accent: 'var(--accent-primary)' },
            { label: 'Feedback Submitted', value: '0', accent: 'var(--accent-secondary)' },
            { label: 'Tips Shared', value: '0', accent: 'var(--accent-tertiary)' },
            { label: 'Solutions Implemented', value: '0', accent: 'var(--accent-primary)' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: stat.accent }}>{stat.value}</div>
              <div className="text-sm text-[var(--foreground)]/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Three Pillars */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Feedback & Solutions */}
          <div id="feedback" className="glow-card p-8 group cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-primary)]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Feedback & Solutions</h3>
            <p className="text-[var(--foreground)]/60 mb-6">
              Submit issues with proposed solutions. Nothing moves forward without a solution-first approach.
            </p>
            <div className="flex items-center gap-2 text-[var(--accent-primary)] text-sm font-medium">
              Submit Feedback
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Tips & Tricks */}
          <div id="tips" className="glow-card p-8 group cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-secondary)]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-[var(--accent-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Tips & Tricks</h3>
            <p className="text-[var(--foreground)]/60 mb-6">
              Share your knowledge with the community. Help fellow creators level up their skills.
            </p>
            <div className="flex items-center gap-2 text-[var(--accent-secondary)] text-sm font-medium">
              Share a Tip
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Vision Board */}
          <div id="vision" className="glow-card p-8 group cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-tertiary)]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-[var(--accent-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Vision Board</h3>
            <p className="text-[var(--foreground)]/60 mb-6">
              Set goals and find accountability partners. Track your progress with the community.
            </p>
            <div className="flex items-center gap-2 text-[var(--accent-tertiary)] text-sm font-medium">
              Set Your Vision
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Categories */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-semibold mb-8 text-center">Creator Categories</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            'AI Creator',
            'Written Content',
            'Digital Music',
            'Digital Image',
            'Video/Animation',
            'Software & Dev',
            'Organization',
            'Guru/Educator',
            'Digital Business',
            'Marketing & PR',
            'Voice/Audio',
            'Automation/No-Code',
          ].map((category, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] text-sm hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-colors cursor-pointer"
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--surface)]/30">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-medium">Creator Hub</span>
            </div>
            <p className="text-sm text-[var(--foreground)]/50">
              Built with collaboration in mind. Nothing moves forward without solutions.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-[var(--foreground)]/50 hover:text-[var(--accent-primary)] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="text-[var(--foreground)]/50 hover:text-[var(--accent-secondary)] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
