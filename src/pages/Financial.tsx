import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { useWorkspace } from "@/contexts/WorkspaceContext";

const FinancialPage = () => {
  const { data } = useWorkspace();

  const totalIncome = data.transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = data.transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const netProfit = totalIncome - totalExpenses;

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
              { label: "Total Income", value: `$${totalIncome.toLocaleString()}`, color: "text-stat-green" },
              { label: "Total Expenses", value: `$${totalExpenses.toLocaleString()}`, color: "text-destructive" },
              { label: "Net Profit", value: `$${netProfit.toLocaleString()}`, color: netProfit >= 0 ? "text-stat-green" : "text-destructive" },
            ].map((item) => (
              <div key={item.label} className="bg-card rounded-xl border border-border p-5">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-3xl font-bold text-card-foreground mt-1">{item.value}</p>
                <p className={`text-sm mt-1 ${item.color}`}>{data.transactions.length} transactions</p>
              </div>
            ))}
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Transactions</h3>
            {data.transactions.length === 0 ? (
              <p className="text-muted-foreground text-sm">No transactions yet. Add them in the Workspace.</p>
            ) : (
              <div className="space-y-2">
                {data.transactions.map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div>
                      <p className="font-medium text-foreground">{t.description}</p>
                      <p className="text-sm text-muted-foreground">{t.category} · {t.date}</p>
                    </div>
                    <p className={`font-semibold ${t.type === "income" ? "text-stat-green" : "text-destructive"}`}>
                      {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString()}
                    </p>
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

export default FinancialPage;
