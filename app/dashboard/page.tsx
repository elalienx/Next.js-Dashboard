// Project files
import { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from "@/app/lib/data";

export default async function Page() {
  // Properties
  /**
   * 🛎️ Warning:
   * This creates a waterfall. latestInvoices can't run until revenue is ready.
   * And cardsData can't run until latestInvoices is ready. See diagram:
   * https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fsequential-parallel-data-fetching.png&w=3840&q=75
   *
   * 🛠️ Fix:
   * By using Promise.all() we can run them concurrently.
   * */
  const getRevenue = fetchRevenue();
  const getLatestInvoices = fetchLatestInvoices();
  const getCards = fetchCardData();

  const data = await Promise.all([getRevenue, getLatestInvoices, getCards]);
  const [revenue, latestInvoices, cards] = data;

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={cards.totalPaidInvoices} type="collected" />
        <Card title="Pending" value={cards.totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={cards.numberOfInvoices} type="invoices" />
        <Card title="Total Customers" value={cards.numberOfCustomers} type="customers" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
