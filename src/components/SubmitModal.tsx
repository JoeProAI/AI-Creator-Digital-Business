'use client';

import { useState } from 'react';

type ModalType = 'feedback' | 'tip' | 'vision' | null;

interface SubmitModalProps {
  type: ModalType;
  onClose: () => void;
}

export default function SubmitModal({ type, onClose }: SubmitModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!type) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      const response = await fetch(`/api/submit/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 2000);
      } else {
        const result = await response.json();
        setError(result.error || 'Submission failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const titles = {
    feedback: 'Submit Feedback',
    tip: 'Share a Tip',
    vision: 'Set Your Vision',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--color-text)] opacity-80"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[var(--color-surface)] border-[4px] border-[var(--color-border)] w-full max-w-[500px] max-h-[90vh] overflow-y-auto brutal-shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-[var(--space-4)] border-b-[2px] border-[var(--color-border)]">
          <h2 className="font-display text-[var(--text-xl)]">{titles[type]}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-bg)] transition-colors"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Success State */}
        {success ? (
          <div className="p-[var(--space-6)] text-center">
            <div className="text-[var(--text-2xl)] mb-[var(--space-2)]">&#10003;</div>
            <p className="text-[var(--text-lg)]">Submitted successfully!</p>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="p-[var(--space-4)]">
            {/* Common Fields */}
            <div className="grid grid-cols-2 gap-[var(--space-3)] mb-[var(--space-4)]">
              <div>
                <label className="block text-[var(--text-xs)] uppercase tracking-widest mb-[var(--space-1)]">
                  Name
                </label>
                <input
                  type="text"
                  name="userName"
                  className="brutal-input"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-[var(--text-xs)] uppercase tracking-widest mb-[var(--space-1)]">
                  X Handle
                </label>
                <input
                  type="text"
                  name="handle"
                  className="brutal-input"
                  placeholder="@handle"
                />
              </div>
            </div>

            {/* Type-specific Fields */}
            {type === 'feedback' && (
              <>
                <div className="mb-[var(--space-3)]">
                  <label className="block text-[var(--text-xs)] uppercase tracking-widest mb-[var(--space-1)]">
                    Category
                  </label>
                  <select name="category" className="brutal-input">
                    <option value="">Select category...</option>
                    <option value="Platform">Platform Issue</option>
                    <option value="Tools">Tools & Software</option>
                    <option value="Workflow">Workflow</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-[var(--space-3)]">
                  <label className="block text-[var(--text-xs)] uppercase tracking-widest mb-[var(--space-1)]">
                    Issue *
                  </label>
                  <textarea
                    name="issue"
                    className="brutal-input min-h-[80px]"
                    placeholder="Describe the problem..."
                    required
                  />
                </div>
                <div className="mb-[var(--space-4)]">
                  <label className="block text-[var(--text-xs)] uppercase tracking-widest mb-[var(--space-1)]">
                    Proposed Solution *
                  </label>
                  <textarea
                    name="solution"
                    className="brutal-input min-h-[80px]"
                    placeholder="Your solution..."
                    required
                  />
                </div>
              </>
            )}

            {type === 'tip' && (
              <>
                <div className="mb-[var(--space-3)]">
                  <label className="block text-[var(--text-xs)] uppercase tracking-widest mb-[var(--space-1)]">
                    Category
                  </label>
                  <select name="category" className="brutal-input">
                    <option value="">Select category...</option>
                    <option value="AI Tools">AI Tools</option>
                    <option value="Workflow">Workflow</option>
                    <option value="Content">Content Creation</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-[var(--space-3)]">
                  <label className="block text-[var(--text-xs)] uppercase tracking-widest mb-[var(--space-1)]">
                    Tip *
                  </label>
                  <textarea
                    name="tip"
                    className="brutal-input min-h-[80px]"
                    placeholder="Share your tip or trick..."
                    required
                  />
                </div>
                <div className="mb-[var(--space-4)]">
                  <label className="block text-[var(--text-xs)] uppercase tracking-widest mb-[var(--space-1)]">
                    Details
                  </label>
                  <textarea
                    name="details"
                    className="brutal-input min-h-[60px]"
                    placeholder="Additional context..."
                  />
                </div>
              </>
            )}

            {type === 'vision' && (
              <>
                <div className="mb-[var(--space-3)]">
                  <label className="block text-[var(--text-xs)] uppercase tracking-widest mb-[var(--space-1)]">
                    Your Goal *
                  </label>
                  <textarea
                    name="goal"
                    className="brutal-input min-h-[80px]"
                    placeholder="What do you want to achieve?"
                    required
                  />
                </div>
                <div className="mb-[var(--space-3)]">
                  <label className="block text-[var(--text-xs)] uppercase tracking-widest mb-[var(--space-1)]">
                    Timeline
                  </label>
                  <input
                    type="text"
                    name="timeline"
                    className="brutal-input"
                    placeholder="e.g., 30 days, Q1 2026"
                  />
                </div>
                <div className="mb-[var(--space-4)]">
                  <label className="block text-[var(--text-xs)] uppercase tracking-widest mb-[var(--space-1)]">
                    Accountability Partner Request
                  </label>
                  <textarea
                    name="accountability"
                    className="brutal-input min-h-[60px]"
                    placeholder="Looking for someone to keep you on track?"
                  />
                </div>
              </>
            )}

            {/* Error */}
            {error && (
              <div className="mb-[var(--space-3)] p-[var(--space-2)] bg-[var(--color-danger)] text-[var(--color-bg)] text-[var(--text-sm)]">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="brutal-btn brutal-btn-primary w-full"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
