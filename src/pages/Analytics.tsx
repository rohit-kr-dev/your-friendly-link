import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const AnalyticsPage = () => (
  <div className="flex min-h-screen bg-background">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <TopBar />
      <main className="flex-1 px-8 pb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Analytics</h1>
        <p className="text-muted-foreground text-sm mb-6">View detailed analytics and reports.</p>
        <div className="bg-card rounded-xl border border-border p-6">
          <p className="text-muted-foreground text-sm">Analytics data will appear here.</p>
        </div>
      </main>
    </div>
  </div>
);

export default AnalyticsPage;
