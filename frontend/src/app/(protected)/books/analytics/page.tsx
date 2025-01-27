import { fetchAnalytics } from "@/app/lib/fetchAnalytics";

interface Analytics {
  totalBooks: number;
  totalLendings: number;
  activeLendings: number;
  overdueLendings: number;
}
export default async function AnalyticsPage() {
  const response = await fetchAnalytics();
  const analytics: Analytics = response.data;
  console.log(analytics);
  return (
    <div className="flex-1 p-6 overflow-y-auto h-full">
      <h1 className="text-3xl">Analytics</h1>
      <div className="mt-4">
        <h2>Total Books</h2>
        <p>{analytics.totalBooks}</p>
      </div>
      <div className="mt-4">
        <h2>Total Lendings</h2>
        <p>{analytics.totalLendings}</p>
      </div>
      <div className="mt-4">
        <h2>Active Lendings</h2>
        <p>{analytics.activeLendings}</p>
      </div>
      <div className="mt-4">
        <h2>Overdue Lendings</h2>
        <p>{analytics.overdueLendings}</p>
      </div>
    </div>
  );
}
