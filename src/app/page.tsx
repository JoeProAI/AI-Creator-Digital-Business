import { getSheetStats } from '@/lib/sheets';
import HomeClient from '@/components/HomeClient';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const stats = await getSheetStats();

  return <HomeClient stats={stats} />;
}
