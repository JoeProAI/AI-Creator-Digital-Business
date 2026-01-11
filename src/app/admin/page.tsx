import { getFullAnalytics } from '@/lib/analytics';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminPage() {
  const analytics = await getFullAnalytics();

  return <AdminDashboard initialData={analytics} />;
}
