import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { useWorkspace } from "@/contexts/WorkspaceContext";

const AgentPerformancePage = () => {
  const { data } = useWorkspace();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 px-8 pb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Agent Performance</h1>
          <p className="text-muted-foreground text-sm mb-6">Monitor and evaluate agent metrics.</p>

          <div className="grid grid-cols-3 gap-5 mb-6">
            <div className="bg-card rounded-xl border border-border p-5">
              <p className="text-sm text-muted-foreground">Total Agents</p>
              <p className="text-3xl font-bold text-card-foreground mt-1">{data.agents.length}</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-5">
              <p className="text-sm text-muted-foreground">Total Sales</p>
              <p className="text-3xl font-bold text-card-foreground mt-1">{data.agents.reduce((s, a) => s + a.salesCount, 0)}</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-5">
              <p className="text-sm text-muted-foreground">Avg Rating</p>
              <p className="text-3xl font-bold text-card-foreground mt-1">
                {data.agents.length > 0 ? (data.agents.reduce((s, a) => s + a.rating, 0) / data.agents.length).toFixed(1) : "0"}
              </p>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Agent List</h3>
            {data.agents.length === 0 ? (
              <p className="text-muted-foreground text-sm">No agents yet. Add them in the Workspace.</p>
            ) : (
              <div className="space-y-2">
                {data.agents.map((a) => (
                  <div key={a.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div>
                      <p className="font-medium text-foreground">{a.name}</p>
                      <p className="text-sm text-muted-foreground">{a.email} · {a.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{a.salesCount} sales</p>
                      <p className="text-sm text-muted-foreground">${a.revenue.toLocaleString()} · ⭐ {a.rating}</p>
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

export default AgentPerformancePage;
