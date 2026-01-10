// Google Sheets Write API using Service Account
import { google } from 'googleapis';

const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || '1V9uYRt5ObBET5T9CkAaG7qbM8qJUlvZeT7zeG_XXs2M';

// Sheet tab names
const SHEETS = {
  ROSTER: 'Creator Roster 🧑‍🦲📋',
  FEEDBACK: 'Feedback Responses 🔥',
  TIPS: 'Tips Responses 💡',
  VISION: 'Vision Responses 🎨',
} as const;

// Get authenticated Google Sheets client
async function getAuthenticatedClient() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!credentials) {
    throw new Error('Google service account credentials not configured');
  }

  const parsedCredentials = JSON.parse(credentials);

  const auth = new google.auth.GoogleAuth({
    credentials: parsedCredentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

// Append a row to a sheet
async function appendRow(sheetName: string, values: string[]): Promise<boolean> {
  try {
    const sheets = await getAuthenticatedClient();

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${sheetName}!A:Z`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [values],
      },
    });

    return true;
  } catch (error) {
    console.error('Failed to append row:', error);
    return false;
  }
}

// Submit feedback response
export async function submitFeedback(data: {
  userName: string;
  handle: string;
  category: string;
  issue: string;
  solution: string;
}): Promise<boolean> {
  const timestamp = new Date().toISOString();
  const values = [
    timestamp,
    data.userName,
    data.handle,
    data.category,
    data.issue,
    data.solution,
  ];
  return appendRow(SHEETS.FEEDBACK, values);
}

// Submit tip response
export async function submitTip(data: {
  userName: string;
  handle: string;
  category: string;
  tip: string;
  details: string;
}): Promise<boolean> {
  const timestamp = new Date().toISOString();
  const values = [
    timestamp,
    data.userName,
    data.handle,
    data.category,
    data.tip,
    data.details,
  ];
  return appendRow(SHEETS.TIPS, values);
}

// Submit vision response
export async function submitVision(data: {
  userName: string;
  handle: string;
  goal: string;
  timeline: string;
  accountability: string;
}): Promise<boolean> {
  const timestamp = new Date().toISOString();
  const values = [
    timestamp,
    data.userName,
    data.handle,
    data.goal,
    data.timeline,
    data.accountability,
  ];
  return appendRow(SHEETS.VISION, values);
}

// Register as a creator
export async function registerCreator(data: {
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
}): Promise<boolean> {
  const values = [
    data.userName,
    data.handle,
    data.contentType,
    data.focusArea,
    data.openForCollab,
    data.collabExpectations,
    data.collabTopics,
    data.specialties,
    data.willingToFacilitate,
    data.issue,
    data.proposedSolution,
  ];
  return appendRow(SHEETS.ROSTER, values);
}
