import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const PropertiesPage = () => (
  <div className="flex min-h-screen bg-background">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <TopBar />
      <main className="flex-1 px-8 pb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Properties</h1>
        <p className="text-muted-foreground text-sm mb-6">Browse and manage your property listings.</p>
        <div className="bg-card rounded-xl border border-border p-6">
          <p className="text-muted-foreground text-sm">No properties listed yet.</p>
        </div>
      </main>
    </div>
  </div>
);

export default PropertiesPage;
