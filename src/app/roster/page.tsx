import { getCreatorRoster, Creator } from '@/lib/sheets';
import Link from 'next/link';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function RosterPage() {
  const creators = await getCreatorRoster();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b-[4px] border-[var(--color-border)] bg-[var(--color-surface)] sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-[var(--space-3)]">
              <div className="w-10 h-10 bg-[var(--color-text)] flex items-center justify-center hover-glitch">
                <span className="text-[var(--color-bg)] font-bold text-lg font-display">C</span>
              </div>
              <span className="text-[var(--text-sm)] uppercase tracking-[0.15em] font-semibold hidden sm:block">
                COX Coop
              </span>
            </Link>

            <nav className="flex items-center gap-[var(--space-6)]">
              <Link href="/" className="text-[var(--text-sm)] uppercase tracking-widest hover-underline">
                Home
              </Link>
              <span className="text-[var(--text-sm)] uppercase tracking-widest text-[var(--color-accent)]">
                Roster
              </span>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-[1400px] mx-auto px-[var(--space-4)] md:px-[var(--space-6)] py-[var(--space-8)]">
        {/* Page Header */}
        <div className="flex items-start justify-between mb-[var(--space-8)] flex-wrap gap-4">
          <div>
            <h1 className="font-display text-[var(--text-2xl)] md:text-[clamp(2rem,5vw,3rem)] mb-[var(--space-2)]">
              Creator Roster
            </h1>
            <p className="text-[var(--color-muted)]">
              {creators.length} creators registered in the COX Coop
            </p>
          </div>
          <span className="brutal-label brutal-label-accent">
            Live Data
          </span>
        </div>

        {/* Roster Grid */}
        {creators.length === 0 ? (
          <div className="brutal-card text-center py-[var(--space-12)]">
            <div className="text-[var(--text-2xl)] font-display mb-[var(--space-3)]">No Creators Yet</div>
            <p className="text-[var(--color-muted)] mb-[var(--space-6)]">
              The roster is empty. Be the first to join the COX Coop!
            </p>
            <p className="text-[var(--text-sm)] text-[var(--color-muted)]">
              If you&apos;ve already registered, the sheet may need to be set to public view access.
            </p>
          </div>
        ) : (
          <div className="grid gap-[var(--space-4)] md:grid-cols-2 lg:grid-cols-3">
            {creators.map((creator, index) => (
              <CreatorCard key={creator.handle || index} creator={creator} index={index} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-[4px] border-[var(--color-border)] mt-[var(--space-12)]">
        <div className="max-w-[1400px] mx-auto px-[var(--space-4)] md:px-[var(--space-6)] py-[var(--space-6)]">
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-xs)] text-[var(--color-muted)]">
              COX Coop &copy; {new Date().getFullYear()}
            </span>
            <Link href="/" className="text-[var(--text-xs)] uppercase tracking-widest hover-underline">
              Back to Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CreatorCard({ creator, index }: { creator: Creator; index: number }) {
  const isOpenForCollab = creator.openForCollab?.toLowerCase().includes('yes');
  const willingToFacilitate = creator.willingToFacilitate?.toLowerCase().includes('yes');

  return (
    <article className="brutal-card brutal-card-elevated group">
      {/* Header */}
      <div className="flex items-start justify-between mb-[var(--space-3)]">
        <div>
          <div className="text-[var(--text-xs)] text-[var(--color-muted)] uppercase tracking-widest mb-1">
            #{String(index + 1).padStart(2, '0')}
          </div>
          <h3 className="font-display text-[var(--text-lg)] group-hover:text-[var(--color-accent)] transition-colors">
            {creator.userName || 'Anonymous'}
          </h3>
          {creator.handle && (
            <a
              href={`https://x.com/${creator.handle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-sm)] text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              @{creator.handle.replace('@', '')}
            </a>
          )}
        </div>
        <div className="flex flex-col gap-1">
          {isOpenForCollab && (
            <span className="brutal-label text-[10px] border-[var(--color-success)] text-[var(--color-success)]">
              Open to Collab
            </span>
          )}
          {willingToFacilitate && (
            <span className="brutal-label text-[10px] border-[var(--color-accent)] text-[var(--color-accent)]">
              Facilitator
            </span>
          )}
        </div>
      </div>

      {/* Content Type */}
      {creator.contentType && (
        <div className="mb-[var(--space-3)]">
          <div className="text-[var(--text-xs)] uppercase tracking-widest text-[var(--color-muted)] mb-1">
            Content Type
          </div>
          <div className="text-[var(--text-sm)]">{creator.contentType}</div>
        </div>
      )}

      {/* Focus Area */}
      {creator.focusArea && (
        <div className="mb-[var(--space-3)]">
          <div className="text-[var(--text-xs)] uppercase tracking-widest text-[var(--color-muted)] mb-1">
            Focus Area
          </div>
          <p className="text-[var(--text-sm)] text-[var(--color-muted)] line-clamp-2">
            {creator.focusArea}
          </p>
        </div>
      )}

      {/* Specialties */}
      {creator.specialties && (
        <div className="mb-[var(--space-3)]">
          <div className="text-[var(--text-xs)] uppercase tracking-widest text-[var(--color-muted)] mb-1">
            Specialties
          </div>
          <p className="text-[var(--text-sm)] text-[var(--color-muted)] line-clamp-2">
            {creator.specialties}
          </p>
        </div>
      )}

      {/* Issue & Solution (if provided) */}
      {creator.issue && (
        <div className="border-t border-[var(--color-border)] pt-[var(--space-3)] mt-[var(--space-3)]">
          <div className="text-[var(--text-xs)] uppercase tracking-widest text-[var(--color-accent)] mb-1">
            Issue Reported
          </div>
          <p className="text-[var(--text-sm)] text-[var(--color-muted)] line-clamp-2 mb-2">
            {creator.issue}
          </p>
          {creator.proposedSolution && (
            <>
              <div className="text-[var(--text-xs)] uppercase tracking-widest text-[var(--color-success)] mb-1">
                Proposed Solution
              </div>
              <p className="text-[var(--text-sm)] text-[var(--color-muted)] line-clamp-2">
                {creator.proposedSolution}
              </p>
            </>
          )}
        </div>
      )}
    </article>
  );
}
