import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, string> = {
  available: "bg-stat-green text-primary-foreground",
  pending: "bg-stat-orange text-primary-foreground",
  sold: "bg-destructive text-destructive-foreground",
};

const PropertiesPage = () => {
  const { data } = useWorkspace();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 px-8 pb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Properties</h1>
          <p className="text-muted-foreground text-sm mb-6">Browse and manage your property listings.</p>

          <div className="grid grid-cols-3 gap-5 mb-6">
            {["available", "pending", "sold"].map((status) => (
              <div key={status} className="bg-card rounded-xl border border-border p-5">
                <p className="text-sm text-muted-foreground capitalize">{status}</p>
                <p className="text-3xl font-bold text-card-foreground mt-1">{data.properties.filter((p) => p.status === status).length}</p>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">All Properties ({data.properties.length})</h3>
            {data.properties.length === 0 ? (
              <p className="text-muted-foreground text-sm">No properties yet. Add them in the Workspace.</p>
            ) : (
              <div className="space-y-2">
                {data.properties.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div>
                      <p className="font-medium text-foreground">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.location} · {p.type}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-foreground">${p.price.toLocaleString()}</p>
                      <Badge className={statusColors[p.status] || ""}>{p.status}</Badge>
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

export default PropertiesPage;
