import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { useWorkspace } from "@/contexts/WorkspaceContext";

const AnalyticsPage = () => {
  const { data } = useWorkspace();

  const totalRevenue = data.transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalLeads = data.leads.length;
  const activeCampaigns = data.campaigns.filter((c) => c.status === "active").length;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 px-8 pb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Analytics</h1>
          <p className="text-muted-foreground text-sm mb-6">View detailed analytics and reports.</p>

          <div className="grid grid-cols-4 gap-5 mb-6">
            <div className="bg-card rounded-xl border border-border p-5">
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold text-card-foreground mt-1">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-5">
              <p className="text-sm text-muted-foreground">Total Leads</p>
              <p className="text-2xl font-bold text-card-foreground mt-1">{totalLeads}</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-5">
              <p className="text-sm text-muted-foreground">Properties</p>
              <p className="text-2xl font-bold text-card-foreground mt-1">{data.properties.length}</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-5">
              <p className="text-sm text-muted-foreground">Active Campaigns</p>
              <p className="text-2xl font-bold text-card-foreground mt-1">{activeCampaigns}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-3">Lead Sources</h3>
              {data.leads.length === 0 ? <p className="text-muted-foreground text-sm">No lead data.</p> : (
                <div className="space-y-2">
                  {Object.entries(data.leads.reduce((acc, l) => { acc[l.source || "Unknown"] = (acc[l.source || "Unknown"] || 0) + 1; return acc; }, {} as Record<string, number>)).map(([source, count]) => (
                    <div key={source} className="flex justify-between p-2 rounded bg-secondary/50">
                      <span className="text-sm text-foreground">{source}</span>
                      <span className="text-sm font-medium text-foreground">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-3">Property Status</h3>
              {data.properties.length === 0 ? <p className="text-muted-foreground text-sm">No property data.</p> : (
                <div className="space-y-2">
                  {["available", "pending", "sold"].map((status) => (
                    <div key={status} className="flex justify-between p-2 rounded bg-secondary/50">
                      <span className="text-sm text-foreground capitalize">{status}</span>
                      <span className="text-sm font-medium text-foreground">{data.properties.filter((p) => p.status === status).length}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsPage;
