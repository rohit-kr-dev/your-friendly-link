import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, string> = {
  new: "bg-sidebar-primary text-primary-foreground",
  contacted: "bg-stat-orange text-primary-foreground",
  qualified: "bg-stat-green text-primary-foreground",
  lost: "bg-destructive text-destructive-foreground",
};

const LeadsCRMPage = () => {
  const { data } = useWorkspace();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 px-8 pb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Leads & CRM</h1>
          <p className="text-muted-foreground text-sm mb-6">Manage your leads and customer relationships.</p>

          <div className="grid grid-cols-4 gap-5 mb-6">
            {["new", "contacted", "qualified", "lost"].map((status) => (
              <div key={status} className="bg-card rounded-xl border border-border p-5">
                <p className="text-sm text-muted-foreground capitalize">{status}</p>
                <p className="text-3xl font-bold text-card-foreground mt-1">{data.leads.filter((l) => l.status === status).length}</p>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">All Leads ({data.leads.length})</h3>
            {data.leads.length === 0 ? (
              <p className="text-muted-foreground text-sm">No leads yet. Add them in the Workspace.</p>
            ) : (
              <div className="space-y-2">
                {data.leads.map((l) => (
                  <div key={l.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div>
                      <p className="font-medium text-foreground">{l.name}</p>
                      <p className="text-sm text-muted-foreground">{l.email} · {l.phone} · {l.source}</p>
                    </div>
                    <Badge className={statusColors[l.status] || ""}>{l.status}</Badge>
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

export default LeadsCRMPage;
