// Google Sheets API Integration for COX Coop

const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || '1V9uYRt5ObBET5T9CkAaG7qbM8qJUlvZeT7zeG_XXs2M';
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;

// Sheet tab names - exact match with emojis as they appear in the sheet
const SHEETS = {
  ROSTER: 'Creator Roster 🧑‍🦲📋',
  FEEDBACK: 'Feedback Responses 🔥',
  TIPS: 'Tips Responses 💡',
  VISION: 'Vision Responses 🎨',
  SCHEDULE: 'Schedule 🗓️',
  MATCHUP: 'Match Up for Collaborations 🤝',
  DASHBOARD: 'Dashboard 🪐',
  SHEET_FEEDBACK: 'Feedback for this sheet 📣',
} as const;

export interface Creator {
  userName: string;
  handle: string;
  contentType: string;
  focusArea: string;
  openForCollab: string;
  collabExpectations: string;
  collabTopics: string;
  specialties: string;
  willingToFacilitate: string;
  issue: string;
  proposedSolution: string;
}

export interface SheetStats {
  creatorCount: number;
  feedbackCount: number;
  tipsCount: number;
  visionCount: number;
}

async function fetchSheetData(sheetName: string, range: string = 'A:Z'): Promise<string[][]> {
  if (!API_KEY) {
    console.error('Google Sheets API key not configured');
    return [];
  }

  const encodedSheetName = encodeURIComponent(sheetName);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodedSheetName}!${range}?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Google Sheets API error:', error);
      return [];
    }

    const data = await response.json();
    return data.values || [];
  } catch (error) {
    console.error('Failed to fetch sheet data:', error);
    return [];
  }
}

export async function getCreatorRoster(): Promise<Creator[]> {
  const data = await fetchSheetData(SHEETS.ROSTER);

  if (data.length <= 1) return []; // Only header row or empty

  // Skip header row and filter out empty/invalid rows
  return data
    .slice(1)
    .filter((row) => {
      // Must have at least a username or handle with actual content
      const hasUserName = row[0] && row[0].trim() !== '' && !row[0].includes('User Name');
      const hasHandle = row[1] && row[1].trim() !== '' && !row[1].includes('Handel') && !row[1].includes('Handle');
      return hasUserName || hasHandle;
    })
    .map((row) => ({
      userName: row[0] || '',
      handle: row[1] || '',
      contentType: row[2] || '',
      focusArea: row[3] || '',
      openForCollab: row[4] || '',
      collabExpectations: row[5] || '',
      collabTopics: row[6] || '',
      specialties: row[7] || '',
      willingToFacilitate: row[8] || '',
      issue: row[9] || '',
      proposedSolution: row[10] || '',
    }));
}

export async function getSheetStats(): Promise<SheetStats> {
  // Fetch roster to count real creators
  const creators = await getCreatorRoster();

  // Fetch response sheets
  const [feedback, tips, vision] = await Promise.all([
    fetchSheetData(SHEETS.FEEDBACK),
    fetchSheetData(SHEETS.TIPS),
    fetchSheetData(SHEETS.VISION),
  ]);

  // Filter out header rows and empty rows for counts
  const countValidRows = (data: string[][]) => {
    if (data.length <= 1) return 0;
    return data.slice(1).filter(row => row.some(cell => cell && cell.trim() !== '')).length;
  };

  return {
    creatorCount: creators.length,
    feedbackCount: countValidRows(feedback),
    tipsCount: countValidRows(tips),
    visionCount: countValidRows(vision),
  };
}

export async function getFeedbackResponses(): Promise<string[][]> {
  return fetchSheetData(SHEETS.FEEDBACK);
}

export async function getTipsResponses(): Promise<string[][]> {
  return fetchSheetData(SHEETS.TIPS);
}

export async function getVisionResponses(): Promise<string[][]> {
  return fetchSheetData(SHEETS.VISION);
}
