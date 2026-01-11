// Google Sheets API Integration for COX Coop

const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || '1V9uYRt5ObBET5T9CkAaG7qbM8qJUlvZeT7zeG_XXs2M';
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;

// Sheet tab names - exact match with emojis as they appear in the sheet
const SHEETS = {
  ROSTER: 'COX COOP Creator Roster🔥',
  FEEDBACK: 'Weekly Feedback & Solutions to X Team 🔥',
  TIPS: 'Tips & Tricks for being a Creator on X 💡',
  VISION: 'Vision, Intentions & Accountability 🌌🎨',
  SCHEDULE: 'Schedule 🗓️',
  AWARDS: 'COX COOP B.U.M.P. vs D.U.M.P. Awards 🏆🗑️',
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

  if (data.length < 5) return []; // Need at least header row (4) + 1 data row

  // Find the header row (contains "User Name" in some column)
  const headerRowIndex = data.findIndex(row =>
    row.some(cell => cell && cell.toLowerCase().includes('user name'))
  );

  if (headerRowIndex === -1) return []; // No header found

  // Find column indices based on header row
  const headerRow = data[headerRowIndex];
  const findCol = (pattern: string) =>
    headerRow.findIndex(cell => cell && cell.toLowerCase().includes(pattern));

  const cols = {
    userName: findCol('user name'),
    handle: findCol('handel') !== -1 ? findCol('handel') : findCol('handle'),
    contentType: findCol('type of content'),
    focusArea: findCol('focus area'),
    openForCollab: findCol('open for collabor'),
    collabExpectations: findCol('describe what type'),
    collabTopics: findCol('what type of collabor'),
    specialties: findCol('specialities') !== -1 ? findCol('specialities') : findCol('specialties'),
    willingToFacilitate: findCol('willing to lead'),
    issue: findCol('issue'),
    proposedSolution: findCol('proposed solution'),
  };

  // Process data rows (everything after header)
  return data
    .slice(headerRowIndex + 1)
    .filter((row) => {
      // Must have actual content in username or handle columns
      const userName = (cols.userName >= 0 ? row[cols.userName] : '') || '';
      const handle = (cols.handle >= 0 ? row[cols.handle] : '') || '';

      // Valid username: not empty and not header text
      const hasValidUserName = userName.trim() !== '' &&
        !userName.toLowerCase().includes('user name') &&
        !userName.toLowerCase().includes('creator roster');

      // Valid handle: not empty and not header text
      const hasValidHandle = handle.trim() !== '' &&
        !handle.toLowerCase().includes('handel') &&
        !handle.toLowerCase().includes('handle');

      // Must have at least one valid identifier (username or handle)
      // The username/handle itself counts as real content
      return hasValidUserName || hasValidHandle;
    })
    .map((row) => ({
      userName: cols.userName >= 0 ? row[cols.userName] || '' : '',
      handle: cols.handle >= 0 ? row[cols.handle] || '' : '',
      contentType: cols.contentType >= 0 ? row[cols.contentType] || '' : '',
      focusArea: cols.focusArea >= 0 ? row[cols.focusArea] || '' : '',
      openForCollab: cols.openForCollab >= 0 ? row[cols.openForCollab] || '' : '',
      collabExpectations: cols.collabExpectations >= 0 ? row[cols.collabExpectations] || '' : '',
      collabTopics: cols.collabTopics >= 0 ? row[cols.collabTopics] || '' : '',
      specialties: cols.specialties >= 0 ? row[cols.specialties] || '' : '',
      willingToFacilitate: cols.willingToFacilitate >= 0 ? row[cols.willingToFacilitate] || '' : '',
      issue: cols.issue >= 0 ? row[cols.issue] || '' : '',
      proposedSolution: cols.proposedSolution >= 0 ? row[cols.proposedSolution] || '' : '',
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

  // Filter out header rows, empty rows, and rows with only FALSE values
  const countValidRows = (data: string[][]) => {
    if (data.length <= 1) return 0;
    // Find header row index
    const headerIdx = data.findIndex(row =>
      row.some(cell => cell && (
        cell.toLowerCase().includes('timestamp') ||
        cell.toLowerCase().includes('user name') ||
        cell.toLowerCase().includes('response')
      ))
    );
    const startIdx = headerIdx >= 0 ? headerIdx + 1 : 1;
    return data.slice(startIdx).filter(row =>
      row.some(cell =>
        cell && cell.trim() !== '' && cell.trim().toUpperCase() !== 'FALSE'
      )
    ).length;
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
