// Analytics data functions for facilitator dashboard
import {
  getCreatorRoster,
  getSheetStats,
  getFeedbackResponses,
  getTipsResponses,
  getVisionResponses,
  Creator,
  SheetStats
} from './sheets';

export interface SubmissionWithTimestamp {
  timestamp: string;
  userName: string;
  handle: string;
  content: string;
  rawRow: string[];
}

export interface AnalyticsData {
  creators: Creator[];
  feedback: SubmissionWithTimestamp[];
  tips: SubmissionWithTimestamp[];
  vision: SubmissionWithTimestamp[];
  stats: SheetStats;
  trends: {
    dailyActivity: { date: string; count: number }[];
    categoryBreakdown: { category: string; count: number }[];
  };
}

function parseSubmissions(data: string[][]): SubmissionWithTimestamp[] {
  if (data.length < 2) return [];

  // Find header row
  const headerIdx = data.findIndex(row =>
    row.some(cell => cell && cell.toLowerCase().includes('timestamp'))
  );

  if (headerIdx === -1) return [];

  const headerRow = data[headerIdx];
  const timestampCol = headerRow.findIndex(c => c?.toLowerCase().includes('timestamp'));
  const userNameCol = headerRow.findIndex(c => c?.toLowerCase().includes('user name'));
  const handleCol = headerRow.findIndex(c => c?.toLowerCase().includes('handle') || c?.toLowerCase().includes('handel'));

  return data
    .slice(headerIdx + 1)
    .filter(row => row.some(cell => cell && cell.trim() !== ''))
    .map(row => ({
      timestamp: timestampCol >= 0 ? row[timestampCol] || '' : '',
      userName: userNameCol >= 0 ? row[userNameCol] || '' : '',
      handle: handleCol >= 0 ? row[handleCol] || '' : '',
      content: row.slice(Math.max(handleCol, userNameCol, timestampCol) + 1).filter(c => c).join(' | '),
      rawRow: row,
    }))
    .filter(sub => sub.timestamp || sub.userName || sub.content);
}

export async function getFullAnalytics(): Promise<AnalyticsData> {
  const [creators, feedbackRaw, tipsRaw, visionRaw, stats] = await Promise.all([
    getCreatorRoster(),
    getFeedbackResponses(),
    getTipsResponses(),
    getVisionResponses(),
    getSheetStats(),
  ]);

  const feedback = parseSubmissions(feedbackRaw);
  const tips = parseSubmissions(tipsRaw);
  const vision = parseSubmissions(visionRaw);

  // Calculate daily activity from all submissions
  const allSubmissions = [...feedback, ...tips, ...vision];
  const dailyMap = new Map<string, number>();

  allSubmissions.forEach(sub => {
    if (sub.timestamp) {
      const datePart = sub.timestamp.split(' ')[0];
      dailyMap.set(datePart, (dailyMap.get(datePart) || 0) + 1);
    }
  });

  const dailyActivity = Array.from(dailyMap.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const categoryBreakdown = [
    { category: 'Creators', count: creators.length },
    { category: 'Feedback', count: feedback.length },
    { category: 'Tips', count: tips.length },
    { category: 'Vision', count: vision.length },
  ];

  return {
    creators,
    feedback,
    tips,
    vision,
    stats,
    trends: {
      dailyActivity,
      categoryBreakdown,
    },
  };
}

// Export data to CSV format
export function exportToCSV(data: AnalyticsData): { creators: string; feedback: string; tips: string; vision: string } {
  const creatorsCsv = [
    ['User Name', 'Handle', 'Content Type', 'Focus Area', 'Open for Collab', 'Specialties'].join(','),
    ...data.creators.map(c => [
      `"${c.userName}"`,
      `"${c.handle}"`,
      `"${c.contentType}"`,
      `"${c.focusArea}"`,
      `"${c.openForCollab}"`,
      `"${c.specialties}"`,
    ].join(','))
  ].join('\n');

  const submissionToCsv = (submissions: SubmissionWithTimestamp[]) => [
    ['Timestamp', 'User Name', 'Handle', 'Content'].join(','),
    ...submissions.map(s => [
      `"${s.timestamp}"`,
      `"${s.userName}"`,
      `"${s.handle}"`,
      `"${s.content.replace(/"/g, '""')}"`,
    ].join(','))
  ].join('\n');

  return {
    creators: creatorsCsv,
    feedback: submissionToCsv(data.feedback),
    tips: submissionToCsv(data.tips),
    vision: submissionToCsv(data.vision),
  };
}
