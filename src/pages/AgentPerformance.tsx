import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const AgentPerformancePage = () => (
  <div className="flex min-h-screen bg-background">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <TopBar />
      <main className="flex-1 px-8 pb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Agent Performance</h1>
        <p className="text-muted-foreground text-sm mb-6">Monitor and evaluate agent metrics.</p>
        <div className="bg-card rounded-xl border border-border p-6">
          <p className="text-muted-foreground text-sm">No agent data available yet.</p>
        </div>
      </main>
    </div>
  </div>
);

export default AgentPerformancePage;
