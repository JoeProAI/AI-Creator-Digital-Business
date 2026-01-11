'use client';

import { useState, useEffect } from 'react';
import { AnalyticsData, exportToCSV } from '@/lib/analytics';

// Simple password - in production, use environment variable
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'CC2026!';

interface Props {
  initialData: AnalyticsData;
}

export default function AdminDashboard({ initialData }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'creators' | 'feedback' | 'tips' | 'vision'>('overview');
  const [data] = useState(initialData);

  // Check for existing session
  useEffect(() => {
    const stored = sessionStorage.getItem('cox_admin_auth');
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('cox_admin_auth', 'true');
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('cox_admin_auth');
  };

  const handleExportCSV = (type: 'creators' | 'feedback' | 'tips' | 'vision') => {
    const csvData = exportToCSV(data);
    const blob = new Blob([csvData[type]], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cox-coop-${type}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-700 p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-2">Facilitator Dashboard</h1>
          <p className="text-zinc-400 mb-6">Enter password to access analytics</p>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-black border border-zinc-600 text-white p-3 mb-4 focus:border-amber-500 focus:outline-none"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-amber-500 text-black font-bold py-3 hover:bg-amber-400 transition-colors"
            >
              ACCESS DASHBOARD
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">COX COOP Facilitator Dashboard</h1>
            <p className="text-zinc-500 text-sm">Analytics & Reports</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-zinc-400 hover:text-white text-sm border border-zinc-700 px-4 py-2"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Active Creators" value={data.stats.creatorCount} color="amber" />
          <StatCard label="Feedback Entries" value={data.stats.feedbackCount} color="blue" />
          <StatCard label="Tips Shared" value={data.stats.tipsCount} color="green" />
          <StatCard label="Vision Entries" value={data.stats.visionCount} color="purple" />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(['overview', 'creators', 'feedback', 'tips', 'vision'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-amber-500 text-black'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Activity Chart */}
            <div className="bg-zinc-900 border border-zinc-800 p-6">
              <h2 className="text-lg font-bold mb-4">Daily Activity</h2>
              {data.trends.dailyActivity.length > 0 ? (
                <div className="flex items-end gap-2 h-40">
                  {data.trends.dailyActivity.map((day, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-amber-500 min-h-[4px]"
                        style={{ height: `${Math.max(day.count * 30, 4)}px` }}
                      />
                      <span className="text-xs text-zinc-500 mt-2 rotate-45 origin-left">
                        {day.date}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500">No activity data yet</p>
              )}
            </div>

            {/* Category Breakdown */}
            <div className="bg-zinc-900 border border-zinc-800 p-6">
              <h2 className="text-lg font-bold mb-4">Category Breakdown</h2>
              <div className="space-y-3">
                {data.trends.categoryBreakdown.map((cat, i) => {
                  const total = data.trends.categoryBreakdown.reduce((a, b) => a + b.count, 0);
                  const pct = total > 0 ? (cat.count / total) * 100 : 0;
                  const colors = ['bg-amber-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500'];
                  return (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{cat.category}</span>
                        <span className="text-zinc-400">{cat.count}</span>
                      </div>
                      <div className="h-2 bg-zinc-800 rounded">
                        <div
                          className={`h-full ${colors[i % colors.length]} rounded`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-zinc-900 border border-zinc-800 p-6">
              <h2 className="text-lg font-bold mb-4">Recent Submissions</h2>
              <div className="space-y-3">
                {[...data.feedback, ...data.tips, ...data.vision]
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .slice(0, 5)
                  .map((sub, i) => (
                    <div key={i} className="border-b border-zinc-800 pb-3">
                      <div className="flex justify-between">
                        <span className="font-medium">{sub.userName || sub.handle || 'Anonymous'}</span>
                        <span className="text-zinc-500 text-sm">{sub.timestamp}</span>
                      </div>
                      <p className="text-zinc-400 text-sm truncate">{sub.content}</p>
                    </div>
                  ))}
                {data.feedback.length + data.tips.length + data.vision.length === 0 && (
                  <p className="text-zinc-500">No submissions yet</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'creators' && (
          <div className="bg-zinc-900 border border-zinc-800 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">All Creators ({data.creators.length})</h2>
              <button
                onClick={() => handleExportCSV('creators')}
                className="bg-zinc-800 text-zinc-300 px-4 py-2 text-sm hover:bg-zinc-700"
              >
                Export CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-700 text-left">
                    <th className="py-3 px-2">User Name</th>
                    <th className="py-3 px-2">Handle</th>
                    <th className="py-3 px-2">Content Type</th>
                    <th className="py-3 px-2">Focus Area</th>
                    <th className="py-3 px-2">Open for Collab</th>
                  </tr>
                </thead>
                <tbody>
                  {data.creators.map((creator, i) => (
                    <tr key={i} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                      <td className="py-3 px-2">{creator.userName}</td>
                      <td className="py-3 px-2 text-amber-500">{creator.handle}</td>
                      <td className="py-3 px-2 text-zinc-400">{creator.contentType || '-'}</td>
                      <td className="py-3 px-2 text-zinc-400">{creator.focusArea || '-'}</td>
                      <td className="py-3 px-2 text-zinc-400">{creator.openForCollab || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.creators.length === 0 && (
                <p className="text-zinc-500 py-4 text-center">No creators registered yet</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'feedback' && (
          <SubmissionTable
            title="Feedback Submissions"
            data={data.feedback}
            onExport={() => handleExportCSV('feedback')}
          />
        )}

        {activeTab === 'tips' && (
          <SubmissionTable
            title="Tips & Tricks"
            data={data.tips}
            onExport={() => handleExportCSV('tips')}
          />
        )}

        {activeTab === 'vision' && (
          <SubmissionTable
            title="Vision & Accountability"
            data={data.vision}
            onExport={() => handleExportCSV('vision')}
          />
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colorClasses: Record<string, string> = {
    amber: 'border-amber-500 text-amber-500',
    blue: 'border-blue-500 text-blue-500',
    green: 'border-green-500 text-green-500',
    purple: 'border-purple-500 text-purple-500',
  };

  return (
    <div className={`bg-zinc-900 border-l-4 ${colorClasses[color]} p-4`}>
      <div className={`text-3xl font-bold ${colorClasses[color].split(' ')[1]}`}>{value}</div>
      <div className="text-zinc-400 text-sm">{label}</div>
    </div>
  );
}

function SubmissionTable({
  title,
  data,
  onExport,
}: {
  title: string;
  data: { timestamp: string; userName: string; handle: string; content: string }[];
  onExport: () => void;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{title} ({data.length})</h2>
        <button
          onClick={onExport}
          className="bg-zinc-800 text-zinc-300 px-4 py-2 text-sm hover:bg-zinc-700"
        >
          Export CSV
        </button>
      </div>
      <div className="space-y-4">
        {data.map((item, i) => (
          <div key={i} className="border-b border-zinc-800 pb-4">
            <div className="flex justify-between mb-2">
              <span className="font-medium">{item.userName || item.handle || 'Anonymous'}</span>
              <span className="text-zinc-500 text-sm">{item.timestamp}</span>
            </div>
            <p className="text-zinc-300">{item.content}</p>
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-zinc-500 text-center py-4">No submissions yet</p>
        )}
      </div>
    </div>
  );
}
