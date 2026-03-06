import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const LeadsCRMPage = () => (
  <div className="flex min-h-screen bg-background">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <TopBar />
      <main className="flex-1 px-8 pb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Leads & CRM</h1>
        <p className="text-muted-foreground text-sm mb-6">Manage your leads and customer relationships.</p>
        <div className="bg-card rounded-xl border border-border p-6">
          <p className="text-muted-foreground text-sm">No leads yet.</p>
        </div>
      </main>
    </div>
  </div>
);

export default LeadsCRMPage;
