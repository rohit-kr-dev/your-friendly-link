import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const FinancialPage = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 px-8 pb-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Financial</h1>
            <p className="text-muted-foreground text-sm mt-1">Track your financial performance and transactions.</p>
          </div>
          <div className="grid grid-cols-3 gap-5 mb-6">
            {[
              { label: "Total Income", value: "$184,200", change: "+4.2%" },
              { label: "Total Expenses", value: "$42,800", change: "-1.8%" },
              { label: "Net Profit", value: "$141,400", change: "+6.1%" },
            ].map((item) => (
              <div key={item.label} className="bg-card rounded-xl border border-border p-5">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-3xl font-bold text-card-foreground mt-1">{item.value}</p>
                <p className="text-sm text-stat-green mt-1">{item.change}</p>
              </div>
            ))}
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Transactions</h3>
            <p className="text-muted-foreground text-sm">No transactions yet.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FinancialPage;
