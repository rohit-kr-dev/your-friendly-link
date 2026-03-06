import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, string> = {
  active: "bg-stat-green text-primary-foreground",
  paused: "bg-stat-orange text-primary-foreground",
  completed: "bg-muted text-muted-foreground",
};

const MarketingPage = () => {
  const { data } = useWorkspace();

  const totalBudget = data.campaigns.reduce((s, c) => s + c.budget, 0);
  const totalLeads = data.campaigns.reduce((s, c) => s + c.leads, 0);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 px-8 pb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Marketing</h1>
          <p className="text-muted-foreground text-sm mb-6">Plan and track your marketing campaigns.</p>

          <div className="grid grid-cols-3 gap-5 mb-6">
            <div className="bg-card rounded-xl border border-border p-5">
              <p className="text-sm text-muted-foreground">Total Campaigns</p>
              <p className="text-3xl font-bold text-card-foreground mt-1">{data.campaigns.length}</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-5">
              <p className="text-sm text-muted-foreground">Total Budget</p>
              <p className="text-3xl font-bold text-card-foreground mt-1">${totalBudget.toLocaleString()}</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-5">
              <p className="text-sm text-muted-foreground">Total Leads Generated</p>
              <p className="text-3xl font-bold text-card-foreground mt-1">{totalLeads}</p>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Campaigns ({data.campaigns.length})</h3>
            {data.campaigns.length === 0 ? (
              <p className="text-muted-foreground text-sm">No campaigns yet. Add them in the Workspace.</p>
            ) : (
              <div className="space-y-2">
                {data.campaigns.map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div>
                      <p className="font-medium text-foreground">{c.name}</p>
                      <p className="text-sm text-muted-foreground">{c.platform} · ${c.budget.toLocaleString()} budget</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-foreground">{c.leads} leads</p>
                      <Badge className={statusColors[c.status] || ""}>{c.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MarketingPage;
